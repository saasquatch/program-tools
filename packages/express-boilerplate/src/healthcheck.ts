import { Application, Request, Response } from "express";
import { Logger } from "winston";
import { TERMINATION_APP_LOCAL_KEY } from "./shutdown";
import { formatGenericError } from "./error";

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
    // eslint-disable-next-line -- @typescript-eslint/no-unsafe-assignment
    const terminating = app.locals[TERMINATION_APP_LOCAL_KEY];
    if (typeof terminating === "boolean" && terminating) {
      logger.info("App is in TERMINATING state, sending health check failure");
      return res.status(503).json({ status: "TERMINATING" });
    }

    if (customCheck) {
      customCheck()
        .then((result) => {
          const code = result.status === "OK" ? 200 : 503;
          res.status(code).json(result);
        })
        .catch((e) => {
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
      return res.status(200).json({ status: "OK" });
    }
  };
}
