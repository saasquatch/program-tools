import { Request, Response } from "express";

import * as types from "./types";
import { handleError, errorToString, UnhandledFormError } from "./errors";
import { BaseConfig } from "./config";
import { IntegrationService } from "./service";

export function isFormErrorResponse(
  response: any
): response is types.FormErrorResponse {
  return response.errorCode && response.error;
}

export async function formHandler<
  ServiceConfig extends BaseConfig,
  IntegrationConfig,
  FormConfig
>(
  req: Request,
  res: Response,
  service: IntegrationService<ServiceConfig, IntegrationConfig, FormConfig>,
  graphql: types.TenantScopedGraphQLFn
) {
  service.logger.debug(
    "SaaSquatch form handler request received: [%s] [%s] [%s]",
    req.body.type,
    req.body.tenantAlias,
    req.body.form?.key
  );

  const {
    type,
    tenantAlias,
    form,
    formData,
    formSubmissionRecordId,
    dateSubmitted,
    integrationConfig,
    user,
  } = req.body;

  const context: types.FormRequestContext<IntegrationConfig, FormConfig> = {
    type,
    tenantAlias,
    form,
    formData,
    formSubmissionRecordId,
    dateSubmitted,
    integrationConfig,
    user,
  };

  try {
    let response: types.FormHandlerResponse;

    switch (context.type) {
      case "SUBMIT":
        if (service.options?.handlers?.formSubmitHandler) {
          response = await service.options.handlers.formSubmitHandler(
            service,
            context as types.FormSubmitRequestContext<
              IntegrationConfig,
              FormConfig
            >,
            graphql
          );
        } else {
          const emptySubmissionResponse: types.FormSubmissionResponse = {
            results: [],
          };
          response = emptySubmissionResponse;
        }
        break;
      case "VALIDATE":
        if (service.options?.handlers?.formValidateHandler) {
          response = await service.options.handlers.formValidateHandler(
            service,
            context as types.FormValidateRequestContext<
              IntegrationConfig,
              FormConfig
            >,
            graphql
          );
        } else {
          const emptyValidationResponse: types.FormValidationResponse = {
            valid: true,
            errors: [],
          };
          response = emptyValidationResponse;
        }
        break;
      case "INTROSPECTION":
        if (service.options?.handlers?.formIntrospectionHandler) {
          response = await service.options.handlers.formIntrospectionHandler(
            service,
            context as types.FormIntrospectionRequestContext<
              IntegrationConfig,
              FormConfig
            >,
            graphql
          );
        } else {
          const emptyIntrospectionResponse: types.FormIntrospectionResponse = {
            actions: [],
            inputData: [],
            inputDataSchema: {},
          };
          response = emptyIntrospectionResponse;
        }
        break;
      case "INITIAL_DATA":
        if (service.options?.handlers?.formInitialDataHandler) {
          response = await service.options.handlers.formInitialDataHandler(
            service,
            context as types.FormInitialDataRequestContext<
              IntegrationConfig,
              FormConfig
            >,
            graphql
          );
        } else {
          const emptyInitialDataResponse: types.FormInitialDataResponse = {
            inputData: {},
          };
          response = emptyInitialDataResponse;
        }
        break;
      default:
        throw new Error(`Unknown form handler \`${context.type}\``);
    }

    if (isFormErrorResponse(response)) {
      res.status(400);
    }

    res.send(response);

    service.logger.debug("Form handler returned: %o", response);
  } catch (e) {
    handleError(new UnhandledFormError(errorToString(e)), service.logger, res);
  }
}
