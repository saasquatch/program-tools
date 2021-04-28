import { getLogger } from "./logger";
import Transaction from "./transaction";

import {
  ProgramTriggerResult,
  ProgramTriggerBody,
  ProgramIntrospectionBody,
  ProgramValidationBody,
  ProgramVariableSchemaRequestBody,
  Program,
  TriggerType,
  ValidationResult,
  ProgramTriggerError,
} from "./types/rpc";

/**
 * Triggers the program and returns the result (JSON + HTTP code)
 *
 * @param {Object} body The trigger body
 * @param {Program?} program The program trigger handlers
 * @param {Object?} query The context query
 * @param {Object?} headers The context HTTP headers
 *
 * @return {ProgramTriggerResult} The program trigger result
 *
 * @example
 * Example return object:
 * {
 *   json: { "example": "json" },
 *   code: 200
 * }
 */
export function triggerProgram(
  body:
    | ProgramTriggerBody
    | ProgramIntrospectionBody
    | ProgramValidationBody
    | ProgramVariableSchemaRequestBody,
  program: Program = {}
): ProgramTriggerResult {
  switch (body.messageType || "PROGRAM_TRIGGER") {
    case "PROGRAM_INTROSPECTION":
      body = body as ProgramIntrospectionBody;
      return handleProgramIntrospection(body, program);
    case "PROGRAM_TRIGGER":
      body = body as ProgramTriggerBody;
      return handleProgramTrigger(body, program);
    case "PROGRAM_VALIDATION":
      // Make modifications to template based on rules here if necessary.
      body = body as ProgramValidationBody;
      return handleProgramValidation(body, program);
    case "PROGRAM_TRIGGER_VARIABLES_SCHEMA_REQUEST":
      body = body as ProgramVariableSchemaRequestBody;
      return handleProgramVariableSchemaRequest(body, program);
    default:
      getLogger().warn("UNREACHABLE CODE REACHED!!");
      const error = generateProgramTriggerError({
        error: `Unrecognized messageType`,
        message: `Unrecognized messageType ${body.messageType}`,
      });
      return {
        json: error,
        code: 501,
      };
  }
}

/**
 * Trigger the program for the default cases
 *
 * @param {ProgramTriggerBody} body The JSON body from the backend
 * @param {Program} program The program to trigger
 *
 * @return {ProgramTriggerResult} The result from the program
 */
function handleProgramTrigger(
  body: ProgramTriggerBody,
  program: Program
): ProgramTriggerResult {
  const transaction = new Transaction({ body });

  const triggerType = body.activeTrigger.type as TriggerType;
  const handleTrigger: any = program[triggerType];

  try {
    if (handleTrigger) {
      handleTrigger(transaction);
    }

    return {
      json: transaction.toJson(),
      code: 200,
    };
  } catch (e) {
    const errorMes = generateProgramTriggerError();

    getLogger().error(JSON.stringify(errorMes));

    return {
      json: errorMes,
      code: 500,
    };
  }
}

/**
 * Trigger the program for the introspection case
 *
 * @param {ProgramTriggerBody} body The JSON body from the backend
 * @param {Program} program The program to trigger
 *
 * @return {ProgramTriggerResult} The result from the program
 */
function handleProgramIntrospection(
  body: ProgramIntrospectionBody,
  program: Program
): ProgramTriggerResult {
  const template = body.template;
  const rules = body.program.rules;
  const bodyProgram = body.program;
  const tenant = body.tenant;

  // Make modifications to template based on rules here if necessary.
  const handleIntrospection = program["PROGRAM_INTROSPECTION"];
  try {
    const newTemplate =
      (handleIntrospection &&
        (handleIntrospection(template, rules, bodyProgram, tenant) ||
          handleIntrospection(template, rules))) ||
      template;

    return {
      json: newTemplate,
      code: 200,
    };
  } catch (e) {
    const errorMes = generateProgramTriggerError();

    getLogger().error(JSON.stringify(errorMes));

    return {
      json: errorMes,
      code: 500,
    };
  }
}

/**
 * Trigger the program for the validation case
 *
 * @param {ProgramTriggerBody} body The JSON body from the backend
 * @param {Program} program The program to trigger
 *
 * @return {ProgramTriggerResult} The result from the program
 */
function handleProgramValidation(
  body: ProgramValidationBody,
  program: Program
): ProgramTriggerResult {
  const results: ValidationResult[] = [];

  const validationRequests = body.validationRequests;

  for (const validationRequest of validationRequests) {
    const validationHandlers = program["PROGRAM_VALIDATION"];
    const requirementHandler = validationHandlers
      ? validationHandlers[validationRequest.key]
      : undefined;

    if (!requirementHandler) {
      return {
        json: generateProgramTriggerError({
          message: `Requirement handler for key ${validationRequest.key} not implemented`,
        }),
        code: 501,
      };
    }

    try {
      const result = requirementHandler(
        validationRequest.queryResult,
        body.program,
        body.time
      );
      results.push({
        key: validationRequest.key,
        results: result,
      });
    } catch (e) {
      return {
        json: generateProgramTriggerError({
          message: `Requirement handler for key ${validationRequest.key} failed`,
        }),
        code: 501,
      };
    }
  }

  return {
    json: { validationResults: results },
    code: 200,
  };
}

function handleProgramVariableSchemaRequest(
  body: ProgramVariableSchemaRequestBody,
  program: Program
): ProgramTriggerResult {
  const schema = body.schema;
  const scheduleKey = body.scheduleKey;
  const triggerType = body.triggerType;
  const handleSchemaRequest =
    program["PROGRAM_TRIGGER_VARIABLES_SCHEMA_REQUEST"];
  if (!handleSchemaRequest) {
    // why 204 not error?
    return {
      json: {},
      code: 204,
    };
  } else {
    let newSchema;
    try {
      newSchema = handleSchemaRequest(schema, triggerType, scheduleKey);
    } catch (e) {
      const errorMes = generateProgramTriggerError({
        error:
          "An error occurred in a webtask (PROGRAM_TRIGGER_VARIABLES_SCHEMA_REQUEST)",
      });

      getLogger().error(JSON.stringify(errorMes));
    }
    if (!newSchema) {
      return {
        json: {},
        code: 204,
      };
    }
    return {
      json: {
        schema: newSchema,
      },
      code: 200,
    };
  }
}

function generateProgramTriggerError(info?: {
  error?: string;
  message?: string;
}): ProgramTriggerError {
  return {
    error: "An error occurred in a webtask",
    message: "An unspecified error occurred in the program",
    ...info,
  };
}
