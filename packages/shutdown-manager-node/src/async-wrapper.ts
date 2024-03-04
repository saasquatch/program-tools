import { Request, Response } from "express";
import { formatGenericError } from "./error";
import { Logger } from "winston";
import { nanoid } from "./nanoid";

export function asyncHandlerWrapper<T>(
  handler: (req: Request, res: Response) => Promise<T>,
  renderErrorPage?: (
    status: number,
    message: string,
    debugId: string,
  ) => Promise<string>,
): (req: Request, res: Response) => void {
  return (req, res) => {
    handler(req, res).catch((e) => {
      const logger = res.locals.logger as Logger | undefined;
      const requestId = res.locals.requestId as string | undefined;

      const debugId = nanoid(8);

      const error = {
        debugId,
        requestId,
        ...formatGenericError(e),
      };

      logger?.error({ message: "Fatal error occurred!!", error });

      const status = 500;
      const message =
        e instanceof Error ? e.message : "An internal error occurred";

      // cannot send any response if the headers have already been sent
      if (res.headersSent) {
        return;
      }

      // if the client accepts HTML and the error page render function was
      // provided, we will render the error page and return the HTML
      if (
        (req.header("accept") ?? "").includes("text/html") &&
        renderErrorPage
      ) {
        renderErrorPage(status, message, debugId)
          .then((html) => {
            res.status(status).contentType("text/html;charset=utf8").send(html);
          })
          .catch((e) => {
            logger?.error({
              message: "Error occurred while rendering error page!",
              ...formatGenericError(e),
            });

            res
              .status(status)
              .contentType("application/json")
              .send(JSON.stringify({ message, ...error }, null, 2));
          });
      } else {
        res
          .status(status)
          .contentType("application/json")
          .send(JSON.stringify({ message, ...error }, null, 2));
      }
    });
  };
}
