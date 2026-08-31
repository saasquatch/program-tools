import express, { type Request, type Response } from "express";

import compression from "compression";
import { getLogger as ssqtLogger } from "@saasquatch/logger";
import {
  meetCustomFieldRules,
  meetEdgeTriggerConditions,
  meetEventTriggerRules,
} from "./conversion.ts";
import { getLogger, setLogLevel } from "./logger.ts";
import { rewardEmailQuery } from "./queries.ts";
import Transaction from "./transaction.ts";
import { triggerProgram } from "./trigger.ts";
import * as types from "./types/index.ts";

import type {
  Program,
  ProgramRequirement,
  ProgramTriggerBody,
  RequirementValidationResult,
  ValidationProgramField,
} from "./types/rpc.ts";

import { safeJsonata, timeboxExpression, timeboxedJsonata } from "./jsonata.ts";

import { httpLogMiddleware } from "@saasquatch/logger";
import { type ProgramType } from "./types/saasquatch.ts";
import {
  getGoalAnalyticTimestamp,
  getRewardUnitsFromJsonata,
  getTriggerSchema,
  getUserCustomFieldsFromJsonata,
  inferType,
  loadStandardWebtaskConfig,
  numToEquality,
  setRewardSchedule,
  type WebtaskConfig,
} from "./utils.ts";

export { types };

export {
  Transaction,
  getGoalAnalyticTimestamp,
  getLogger,
  getRewardUnitsFromJsonata,
  getTriggerSchema,
  getUserCustomFieldsFromJsonata,
  inferType,
  loadStandardWebtaskConfig,
  meetCustomFieldRules,
  meetEdgeTriggerConditions,
  meetEventTriggerRules,
  numToEquality,
  rewardEmailQuery,
  safeJsonata,
  setLogLevel,
  setRewardSchedule,
  timeboxExpression,
  timeboxedJsonata,
  triggerProgram,
  type Program,
  type ProgramRequirement,
  type ProgramTriggerBody,
  type ProgramType,
  type RequirementValidationResult,
  type ValidationProgramField,
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
  const app = express();
  const logger = ssqtLogger("program-boilerplate");

  app.use(express.json({ limit: process.env["MAX_PAYLOAD_SIZE"] || "1mb" }));
  app.use(compression());
  app.use(httpLogMiddleware(logger, { logNonErrorResponses: false }));

  // Enforce HTTPS. The server does not redirect http -> https
  // because OWASP advises not to
  app.use((req, res, next) => {
    if (
      process.env["NODE_ENV"] === "production" &&
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
      return res.status(503).json({ status: "TERMINATING" });
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
  config: WebtaskConfig,
): void {
  const logger = ssqtLogger("program-boilerplate");

  const server = webtask.listen(config.port, () =>
    logger.notice(`${config.webtaskName} running on port ${config.port}`),
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
        "Server is already in TERMINATING state, not starting shutdown procedure again",
      );
      return;
    }

    webtask.locals["terminating"] = true;

    logger.notice(`Received ${signal} signal, starting shutdown procedure`);

    setTimeout(
      () => {
        server.close(() => logger.notice("Server closed"));
      },
      (config.terminationDelaySeconds ?? 1) * 1000,
    );
  };

  process.on("SIGTERM", gracefulShutdown("SIGTERM"));
  process.on("SIGINT", gracefulShutdown("SIGINT"));
}
