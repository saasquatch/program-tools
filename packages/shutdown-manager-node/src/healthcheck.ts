import { Application, Request, Response } from "express";
import { Logger } from "winston";
import { TERMINATION_APP_LOCAL_KEY } from "./shutdown";

/**
 * Return a request handler that can be used in Express
 * to respond to health checks in the application. The
 * health check will return HTTP code 503 if the app
 * is in a TERMINATING state.
 */
export function healthCheck(
  app: Application,
  logger: Logger,
): (req: Request, res: Response) => void {
  return (_req, res) => {
    const terminating = app.locals[TERMINATION_APP_LOCAL_KEY];
    if (typeof terminating === "boolean" && terminating) {
      logger.info("App is in TERMINATING state, sending health check failure");
      return res.status(503).json({ status: "TERMINATING" });
    }

    return res.status(200).json({ status: "OK" });
  };
}
