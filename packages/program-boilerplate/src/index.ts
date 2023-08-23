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
  app.use(httpLogMiddleware(logger));

  const healthCheck = (_req: Request, res: Response) => {
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
