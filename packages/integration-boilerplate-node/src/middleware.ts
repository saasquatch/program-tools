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
