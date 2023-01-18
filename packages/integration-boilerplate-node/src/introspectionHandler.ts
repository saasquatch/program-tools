import { Request, Response } from "express";
import { BaseConfig } from "./config";
import {
  errorToString,
  handleError,
  UnhandledIntrospectionError,
} from "./errors";
import { IntegrationService } from "./service";
import { IntrospectionBody } from "./types";
import Ajv from "ajv";
import addFormats from "ajv-formats";
import * as draft6MetaSchema from "ajv/dist/refs/json-schema-draft-06.json";
import * as integrationTemplateSchema_import from "@saasquatch/schema/json/IntegrationConfig.schema.json";

const additionalPropertiesTrue = (input: any): void => {
  Object.entries(input).forEach(([key, val]) => {
    if (key === "additionalProperties") {
      input[key] = true;
    } else if (typeof val === "object") {
      additionalPropertiesTrue(val);
    }
  });
};

const integrationTemplateSchema = { ...integrationTemplateSchema_import };
// @ts-ignore
integrationTemplateSchema["$id"] = "#/definitions/integrationTemplateSchema";

// allow additionalProperties: true throughout the entire schema. this enables
// "at least equivalent" ajv validation for the input
additionalPropertiesTrue(integrationTemplateSchema);

const introspectionBodySchema = {
  $schema: "http://json-schema.org/draft-06/schema#",
  type: "object",
  required: ["tenantAlias", "templateIntegrationConfig"],
  additionalProperties: true,
  properties: {
    tenantAlias: { type: "string" },
    templateIntegrationConfig: {
      $ref: "#/definitions/integrationTemplateSchema",
    },
  },
};

const ajv = new Ajv();
addFormats(ajv);
ajv.addMetaSchema(draft6MetaSchema);
ajv.addSchema(integrationTemplateSchema);
ajv.addSchema(introspectionBodySchema);

const validateIntrospectionBody = ajv.compile(introspectionBodySchema);

export async function introspectionHandler<
  ServiceConfig extends BaseConfig,
  IntegrationConfig,
  FormConfig
>(
  req: Request,
  res: Response,
  service: IntegrationService<ServiceConfig, IntegrationConfig, FormConfig>
) {
  const introspectionBody: IntrospectionBody<IntegrationConfig> = req.body;
  const validationResult = validateIntrospectionBody(introspectionBody);
  if (!validationResult) {
    service.logger.debug({
      message: "Input validation failed",
      errors: validateIntrospectionBody.errors,
    });

    res.status(400).json({ errorCode: "INPUT_VALIDATION_FAILED" });
    return;
  }

  const config = introspectionBody.config;
  const template = introspectionBody.templateIntegrationConfig;
  const tenantAlias = introspectionBody.tenantAlias;

  service.logger.debug({
    message: "SaaSquatch introspection request received:",
    tenantAlias,
    config,
    template,
  });

  try {
    if (service.options?.handlers?.introspectionHandler) {
      try {
        const introspectionResult = await service.options.handlers
          .introspectionHandler!(service, config, template, tenantAlias);
        res.status(200).json(introspectionResult);
      } catch (e) {
        throw new UnhandledIntrospectionError(errorToString(e));
      }
    } else {
      // should be unreachable, the call site for this function has a check for the introspectionHandler
      service.logger.crit(
        "Error: attempted to run introspectionHandler without an introspection handler in the options. This is a logic error"
      );
      res.status(500).json({ errorCode: "INTERNAL_ERROR" });
    }
  } catch (e) {
    handleError(e, service.logger, res);
    return;
  }
}
