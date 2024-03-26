import { NextFunction, Request, Response } from "express";
import { Logger } from "winston";
import { nanoid } from "./nanoid";

/**
 * Generate a requestId and derived child logger
 * for each request
 */
export function requestIdAndLogger(
  baseLogger: Logger,
): (req: Request, res: Response, next: NextFunction) => void {
  return (_req, res, next) => {
    if (typeof res.locals.requestId !== "string") {
      // the requestId really doesn't need to be longer than 12 characters,
      // it's only used for debugging
      const requestId = nanoid(12);
      res.locals.requestId = requestId;
      res.locals.logger = baseLogger.child({ requestId });
    }
    next();
  };
}
