import { IncomingMessage, ServerResponse } from "http";
import winston from "winston";
import { LOG_TYPE_MARKER } from "./logger";

/**
 * A simple Express.js middleware which logs the URL, method, response code,
 * and response time of all HTTP requests.
 *
 * @param {winston.Logger} logger - The logger to use
 */
export function httpLogMiddleware(logger: winston.Logger) {
  return (req: IncomingMessage, res: ServerResponse, next: () => void) => {
    const startTimeNs = process.hrtime.bigint();

    res.on("finish", () => {
      const endTimeNs = process.hrtime.bigint();
      const time = (endTimeNs - startTimeNs) / BigInt(1000);
      const { method, url } = req;
      const status = res.statusCode;

      const level =
        res.statusCode >= 500
          ? "error"
          : res.statusCode >= 400
          ? "warn"
          : "info";
      const message = { method, status, time, url };

      logger.log(level, {
        [LOG_TYPE_MARKER]: "HTTP",
        message,
      });
    });

    next();
  };
}
