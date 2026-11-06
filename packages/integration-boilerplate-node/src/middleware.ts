import { Logger } from "@saasquatch/logger";
import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { Auth } from "./auth.ts";
import type { TenantAlias } from "./types.ts";

export function createSaasquatchRequestMiddleware(auth: Auth, logger: Logger) {
  return async function (req: Request, res: Response, next: NextFunction) {
    // Validate the request came from SaaSquatch
    try {
      await auth.validateSaaSquatchRequest(
        req.rawBody,
        req.header("x-hook-jws-rfc-7797")!,
      );
    } catch (e: any) {
      const error = `Permission denied - JWT validation failed: ${e.message}`;
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
      tenantAlias?: TenantAlias;
      impactBrandId?: string;
    }
  }
}

export function createSaasquatchTokenMiddleware(auth: Auth, logger: Logger) {
  return async function (req: Request, res: Response, next: NextFunction) {
    if (req.tenantAlias !== undefined && req.tenantAlias !== "") {
      next();
      return;
    }

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

    const tenantScopedToken = headerParts[1];

    try {
      await auth.validateSaaSquatchToken(tenantScopedToken);
    } catch (e) {
      logger.error({
        message: "Tenant-scoped token JWT validation failed",
        error: e instanceof Error ? e.message : e,
      });
      res
        .status(403)
        .send({ errorCode: "PERMISSION_DENIED", error: "Permission denied" });
      return;
    }

    const decoded: any = jwt.decode(tenantScopedToken);
    logger.debug({ message: "Decoded tenant-scoped token", decoded });
    req.tenantAlias = decoded.sub.split("@")[0];
    req.impactBrandId = decoded["impactBrandId"];

    next();
  };
}
