import Transaction from './transaction';

import {
  ProgramTriggerResult,
  ProgramTriggerBody,
  ProgramIntospectionBody,
  ProgramValidationBody,
  Program,
  TriggerType,
  ValidationResult,
} from './types/rpc';

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
 * Example return object:
 * {
 *   json: { "example": "json" },
 *   code: 200
 * }
 */
export function triggerProgram(
  body: ProgramTriggerBody | ProgramIntospectionBody | ProgramValidationBody,
  program: Program = {},
): ProgramTriggerResult {
  switch (body.messageType || 'PROGRAM_TRIGGER') {
    case 'PROGRAM_INTROSPECTION':
      body = body as ProgramIntospectionBody;
      return handleProgramIntrospection(body, program);
    case 'PROGRAM_TRIGGER':
      body = body as ProgramTriggerBody;
      return handleProgramTrigger(body, program);
    case 'PROGRAM_VALIDATION':
      // Make modifications to template based on rules here if necessary.
      body = body as ProgramValidationBody;
      return handleProgramValidation(body, program);
    default:
      console.log('UNREACHABLE CODE REACHED!!');
      return {
        json: {
          message:
            'Expected either PROGRAM_TRIGGER or PROGRAM_INTROSPECTION messageType.',
        },
        code: 400,
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
  program: Program,
): ProgramTriggerResult {
  const transaction = new Transaction({body});

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
    const errorMes = {
      error: 'An error occurred in a webtask',
      message: e.toString(),
    };

    console.log(errorMes);

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
  body: ProgramIntospectionBody,
  program: Program,
): ProgramTriggerResult {
  const template = body.template;
  const rules = body.rules;
  const bodyProgram = body.program;

  // Make modifications to template based on rules here if necessary.
  const handleIntrospection = program['PROGRAM_INTROSPECTION'];
  try {
    const newTemplate =
      (handleIntrospection &&
        (handleIntrospection(template, rules, bodyProgram) ||
          handleIntrospection(template, rules))) ||
      template;

    return {
      json: newTemplate,
      code: 200,
    };
  } catch (e) {
    const errorMes = {
      error: 'An error occurred in a webtask',
      message: e.toString(),
    };

    console.log(errorMes);

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
  program: Program,
): ProgramTriggerResult {
  const results: ValidationResult[] = [];

  body.validationRequests.forEach(r => {
    const validationHandlers = program['PROGRAM_VALIDATION'];
    const prereqHandler = validationHandlers
      ? validationHandlers[r.key]
      : undefined;

    if (!prereqHandler) {
      return {
        json: {
          message: `Prerequisite handler for key ${r.key} not implemented`,
        },
        code: 501,
      };
    } else {
      results.push({
        key: r.key,
        results: prereqHandler(r.queryResult, body.program),
      });
    }
  });

  return {
    json: {validationResults: results},
    code: 200,
  };
}
