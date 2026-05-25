import type { Request, Response } from "express";
import winston from "winston";
import type { LogLevel } from "./config";
import { LOG_TYPE_MARKER } from "./logger";
import { URL } from "node:url";

export type HttpLogMiddlewareOptions = {
  nonErrorLogLevel?: LogLevel;
  logNonErrorResponses?: boolean;
  logHealthchecks?: boolean;
};

const HEALTHCHECK_ENDPOINTS = ["/healthz", "/livez", "/readyz"];

// the URLs from express don't come with an origin
// but it's necessary for `new URL()` to be able to parse
// the path and query parameters
const PHONY_ORIGIN = "http://localhost";

const STRIP_PARAMS = [
  "itoken",
  "token",
  "jwt",
  "auth",
  "password",
  "bearer",
  "key",
];

/**
 * A simple Express.js middleware which logs the URL, method, response code,
 * and response time of all HTTP requests.
 *
 * @param {winston.Logger} logger - The logger to use
 */
export function httpLogMiddleware(
  logger: winston.Logger,
  opts?: HttpLogMiddlewareOptions,
) {
  return (
    req: Request,
    res: Response & { locals?: Record<string, any> },
    next: () => void,
  ) => {
    const startTimeNs = process.hrtime.bigint();

    res.on("finish", () => {
      const status = res.statusCode;
      if (status < 400 && opts?.logNonErrorResponses === false) {
        return;
      }

      const rawUrl = new URL(`${PHONY_ORIGIN}${req.originalUrl}`);
      STRIP_PARAMS.forEach((p) => rawUrl.searchParams.delete(p));
      const cleanUrl = rawUrl.toString().replace(PHONY_ORIGIN, "");

      const isHealthcheck = HEALTHCHECK_ENDPOINTS.includes(cleanUrl ?? "");
      if (isHealthcheck && opts?.logHealthchecks === false) {
        return;
      }

      // a 503 from a health check endpoint is not an error condition,
      // it just means the service isn't ready for whatever reason.
      if (isHealthcheck && status === 503) {
        return;
      }

      const endTimeNs = process.hrtime.bigint();
      const time = (endTimeNs - startTimeNs) / BigInt(1000);
      const method = req.method;
      const requestId = res.locals?.requestId;

      const extraData = res.locals?.extraData as
        | Record<string, any>
        | undefined;

      const level =
        status >= 500
          ? "error"
          : status >= 400
          ? "warn"
          : isHealthcheck
          ? "debug"
          : opts?.nonErrorLogLevel ?? "info";

      const message = { method, status, time, url: cleanUrl, requestId };
      logger.log(level, { [LOG_TYPE_MARKER]: "HTTP", message, extraData });
    });

    next();
  };
}
