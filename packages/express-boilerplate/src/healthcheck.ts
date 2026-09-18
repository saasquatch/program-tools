import type { Logger } from "@saasquatch/logger";
import type { Application, Request, Response } from "express";
import { formatGenericError } from "./error.ts";
import { TERMINATION_APP_LOCAL_KEY } from "./shutdown.ts";

export type HealthCheckResult<T, E> =
  | {
      status: "OK";
      info?: T;
    }
  | {
      status: "ERROR";
      error?: E;
    };

/**
 * Return a request handler that can be used in Express
 * to respond to health checks in the application. The
 * health check will return HTTP code 503 if the app
 * is in a TERMINATING state.
 */
export function healthCheck<T = undefined, E = undefined>(
  app: Application,
  logger: Logger,
  customCheck?: () => Promise<HealthCheckResult<T, E>>,
): (req: Request, res: Response) => void {
  return (_req, res) => {
    const terminating = app.locals[TERMINATION_APP_LOCAL_KEY];
    if (typeof terminating === "boolean" && terminating) {
      logger.info("App is in TERMINATING state, sending health check failure");
      res.status(503).json({ status: "TERMINATING" });
      return;
    }

    if (customCheck) {
      customCheck()
        .then((result) => {
          const code = result.status === "OK" ? 200 : 503;
          res.status(code).json(result);
        })
        .catch((e: unknown) => {
          const code = 503;
          const error = formatGenericError(e);

          logger.error({
            message: "Custom health check callback failed",
            ...error,
          });

          res.status(code).json({ status: "ERROR", error });
        });
      return;
    } else {
      res.status(200).json({ status: "OK" });
      return;
    }
  };
}
