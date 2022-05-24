import { CustomError } from "ts-custom-error";
import { Response } from "express";
import { Logger } from "winston";

export class PermissionDeniedError extends CustomError {}
export class UnhandledWebhookError extends CustomError {}
export class UnhandledFormError extends CustomError {}
export class IntegrationConfigError extends CustomError {}
export class GraphQLError extends CustomError {}

export function handleError(e: Error, logger: Logger, res: Response) {
  let status = 500;
  let errorCode = "UNKNOWN_ERROR";

  if (e instanceof PermissionDeniedError) {
    status = 403;
    errorCode = "PERMISSION_DENIED";
  }

  if (e instanceof UnhandledWebhookError) {
    errorCode = "UNHANDLED_WEBHOOK_ERROR";
  }

  if (e instanceof UnhandledFormError) {
    errorCode = "UNHANDLED_FORM_ERROR";
  }

  if (e instanceof IntegrationConfigError) {
    errorCode = "INTEGRATION_CONFIG_ERROR";
  }

  if (e instanceof GraphQLError) {
    errorCode = "GRAPHQL_ERROR";
  }

  const error = { errorCode, error: e.message };
  logger.error("%o", error);

  res.status(status).send(error);
}

export function errorToString(error: any) {
  if (error instanceof Error) {
    // Normal Error object, we can get the message
    return error.message;
  } else if (!(typeof error === "string")) {
    // If it's anything other than a string, stringify it
    return JSON.stringify(error, null, 2);
  }
  return error;
}
