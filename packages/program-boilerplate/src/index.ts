import express, { Response, Request } from "express";

import {
  meetCustomFieldRules,
  meetEventTriggerRules,
  meetEdgeTriggerConditions,
} from "./conversion";
import { rewardEmailQuery } from "./queries";
import Transaction from "./transaction";
import { triggerProgram } from "./trigger";
import { getLogger, setLogLevel } from "./logger";
import { getLogger as ssqtLogger } from "@saasquatch/logger";
import * as types from "./types";

import {
  Program,
  ProgramRequirement,
  RequirementValidationResult,
  ValidationProgramField,
  ProgramTriggerBody,
} from "./types/rpc";

import { timeboxExpression, timeboxedJsonata, safeJsonata } from "./jsonata";

import { ProgramType } from "./types/saasquatch";
import {
  inferType,
  getGoalAnalyticTimestamp,
  setRewardSchedule,
  numToEquality,
  getTriggerSchema,
  getUserCustomFieldsFromJsonata,
  getRewardUnitsFromJsonata,
  loadStandardWebtaskConfig,
  WebtaskConfig,
} from "./utils";
import { httpLogMiddleware } from "@saasquatch/logger";

export { types };

export {
  Transaction,
  ProgramTriggerBody,
  Program,
  ProgramType,
  RequirementValidationResult,
  ProgramRequirement,
  ValidationProgramField,
  meetEventTriggerRules,
  meetCustomFieldRules,
  meetEdgeTriggerConditions,
  rewardEmailQuery,
  setRewardSchedule,
  getGoalAnalyticTimestamp,
  triggerProgram,
  inferType,
  numToEquality,
  getTriggerSchema,
  getUserCustomFieldsFromJsonata,
  getRewardUnitsFromJsonata,
  timeboxExpression,
  timeboxedJsonata,
  safeJsonata,
  getLogger,
  setLogLevel,
  loadStandardWebtaskConfig,
};

/**
 * Returns an express server that serves the provided handlers
 * as a program
 *
 * @param {Program} program The program trigger handlers to use
 *
 * @return {Object} The express server
 */
export function webtask(program: Program = {}): express.Application {
  const compression = require("compression");

  const app = express();
  const logger = ssqtLogger("program-boilerplate");

  app.use(express.json({ limit: process.env.MAX_PAYLOAD_SIZE || "1mb" }));
  app.use(compression());
  app.use(httpLogMiddleware(logger, { logNonErrorResponses: false }));

  // Enforce HTTPS. The server does not redirect http -> https
  // because OWASP advises not to
  app.use((req, res, next) => {
    if (
      process.env.NODE_ENV === "production" &&
      req.header("X-Forwarded-Proto") !== "https" &&
      !["/healthz", "/livez", "/readyz"].includes(req.path)
    ) {
      return res.status(403).send({ message: "SSL required" });
    }

    // allow the request to continue if https is used
    next();
  });

  const healthCheck = (_req: Request, res: Response) => {
    const terminating = app.locals["terminating"];
    if (typeof terminating === "boolean" && terminating) {
      logger.info("App is in TERMINATING state, sending health check failure");
      return res.status(500).json({ status: "TERMINATING" });
    }

    return res.status(200).json({ status: "OK" });
  };

  app.get("/healthz", healthCheck);
  app.get("/livez", healthCheck);
  app.get("/readyz", healthCheck);

  app.post("/*", (req, res) => {
    const { json, code } = triggerProgram(req.body, program);
    return res.status(code).json(json);
  });

  return app;
}

export function runWebtask(
  webtask: express.Application,
  config: WebtaskConfig
): void {
  const logger = ssqtLogger("program-boilerplate");

  const server = webtask.listen(config.port, () =>
    logger.notice(`${config.webtaskName} running on port ${config.port}`)
  );

  if (config.keepAliveTimeoutSeconds !== undefined) {
    // https://cloud.google.com/load-balancing/docs/https/https-logging-monitoring#failure-messages
    // (see the section on backend_connection_closed_before_data_sent_to_client)
    server.keepAliveTimeout = config.keepAliveTimeoutSeconds * 1000;
    server.headersTimeout = (config.keepAliveTimeoutSeconds + 1) * 1000;
  }

  const gracefulShutdown = (signal: string) => () => {
    const isTerminating = webtask.locals["terminating"];

    if (typeof isTerminating === "boolean" && isTerminating) {
      logger.warn(
        "Server is already in TERMINATING state, not starting shutdown procedure again"
      );
      return;
    }

    webtask.locals["terminating"] = true;

    logger.notice(`Received ${signal} signal, starting shutdown procedure`);

    setTimeout(() => {
      server.close(() => logger.notice("Server closed"));
    }, (config.terminationDelaySeconds ?? 1) * 1000);
  };

  process.on("SIGTERM", gracefulShutdown("SIGTERM"));
  process.on("SIGINT", gracefulShutdown("SIGINT"));
}
