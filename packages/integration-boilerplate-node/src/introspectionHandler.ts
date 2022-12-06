import { Request, Response } from "express";
import { BaseConfig } from "./config";
import {
  errorToString,
  handleError,
  UnhandledIntrospectionError,
} from "./errors";
import { IntegrationService } from "./service";
import { IntrospectionBody, validateIntrospectionBody } from "./types";

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
        const newTemplate = await service.options.handlers
          .introspectionHandler!(service, config, template, tenantAlias);
        res.status(200).json({ templateIntegrationConfig: newTemplate });
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
