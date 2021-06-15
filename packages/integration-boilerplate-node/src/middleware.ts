import { Request, Response, NextFunction } from "express";
import { Logger } from "winston";

import { Auth } from "./auth";

export function createSaasquatchTokenMiddleware(auth: Auth, logger: Logger) {
  return async function (req: Request, res: Response, next: NextFunction) {
    // Validate the request came from SaaSquatch
    try {
      await auth.validateSaaSquatchRequest(
        req.rawBody,
        req.header("x-hook-jws-rfc-7797")!
      );
    } catch (e) {
      const error = "Permission denied - JWT validation failed.";
      logger.error(error);
      res.status(403).send({ errorCode: "PERMISSION_DENIED", error });
      return;
    }

    next();
  };
}

// import { validate } from "jsonschema";
// import webhookSchema from "@saasquatch/schema/json/webhooks/Webhook.schema.json";
// export async function validateSaasquatchWebhook(
//   req: Request,
//   _res: Response,
//   next: NextFunction
// ) {
//   // Test webhooks are not in our schema
//   if (req.body.type === "test") {
//     next();
//     return;
//   }

//   // FIXME: This doesn't work, and I don't know why

//   // const validationResult = validate(req.body, webhookSchema);
//   // if (!validationResult.valid) {
//   //   getService().logger.error(`Invalid webhook: ${validationResult.errors}`);
//   //   res.status(403).send({
//   //     errorCode: "INVALID_WEBHOOK",
//   //     error: validationResult.errors,
//   //   });
//   //   return;
//   // }

//   next();
// }

// export async function validateSaasquatchFormHandler(
//   req: Request,
//   _res: Response,
//   next: NextFunction
// ) {
//   // const validationResult = validate(req.body, webhookSchema);
//   // if (!validationResult.valid) {
//   //   getService().logger.error(`Invalid webhook: ${validationResult.errors}`);
//   //   res.status(403).send({
//   //     errorCode: "INVALID_WEBHOOK",
//   //     error: validationResult.errors,
//   //   });
//   //   return;
//   // }

//   next();
// }
