import { NextFunction, Request, Response } from "express";
import { nanoid } from "./nanoid";
import { Logger } from "winston";

/**
 * Generate a requestId and derived child logger
 * for each request
 */
export function requestIdAndLogger(
  baseLogger: Logger,
): (req: Request, res: Response, next: NextFunction) => void {
  return (_req, res, next) => {
    if (typeof res.locals.requestId !== "string") {
      const requestId = nanoid();
      res.locals.requestId = requestId;
      res.locals.logger = baseLogger.child({ requestId });
    }
    next();
  };
}
