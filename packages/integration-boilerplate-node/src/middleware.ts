import { Request, Response, NextFunction } from "express";
import { Logger } from "winston";
import jwt from "jsonwebtoken";

import { Auth } from "./auth";

export function createSaasquatchRequestMiddleware(auth: Auth, logger: Logger) {
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

declare global {
  namespace Express {
    interface Request {
      tenantAlias?: string;
    }
  }
}

export function createSaasquatchTokenMiddleware(auth: Auth, logger: Logger) {
  return async function (req: Request, res: Response, next: NextFunction) {
    const header = req.header("Authorization");
    if (!header) {
      logger.error("No Authorization header");
      res
        .status(403)
        .send({ errorCode: "PERMISSION_DENIED", error: "Permission denied" });
      return;
    }

    const headerParts = header.split(" ");
    if (headerParts.length !== 2 || headerParts[0] !== "Bearer") {
      logger.error("Bad Authorization header");
      res
        .status(403)
        .send({ errorCode: "PERMISSION_DENIED", error: "Permission denied" });
      return;
    }

    const tenantScopedToken = headerParts[1]!;

    try {
      await auth.validateSaaSquatchToken(tenantScopedToken);
    } catch (e) {
      logger.error("JWT validation failed");
      res
        .status(403)
        .send({ errorCode: "PERMISSION_DENIED", error: "Permission denied" });
      return;
    }

    const decoded: any = jwt.decode(tenantScopedToken);
    logger.debug("%o", decoded);
    req.tenantAlias = decoded.sub.split("@")[0];

    next();
  };
}
