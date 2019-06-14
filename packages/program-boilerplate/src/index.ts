// @ts-check
import Transaction, { ProgramType } from './transaction';
import {rewardEmailQuery} from './queries';
import {meetCustomFieldRules, meetEventTriggerRules} from './conversion';
import {setRewardSchedule, getGoalAnalyticTimestamp} from './utils';
import {getTriggerBody, getIntrospectionBody} from './testing';

import {
  Logger,
  format,
  createLogger,
  transports,
} from 'winston';

import * as express from 'express';

export {
  Transaction,
  meetEventTriggerRules,
  meetCustomFieldRules,
  rewardEmailQuery,
  setRewardSchedule,
  getGoalAnalyticTimestamp,
  getTriggerBody,
  getIntrospectionBody,
  ProgramType
}

export type Program = {
  AFTER_USER_CREATED_OR_UPDATED?: (transaction: Transaction) => void
  AFTER_USER_EVENT_PROCESSED?:  (transaction: Transaction) => void
  REFERRAL?: (transaction: Transaction) => void
  PROGRAM_INTROSPECTION?: (template: any, rules: any, program?: any) => any
  SCHEDULED?: (transaction: Transaction) => void
  REWARD_SCHEDULED?: (transaction: Transaction) => void
};

type WebtaskContext = {
  body?: WebtaskContextBody
};

type WebtaskContextBody = {
  activeTrigger?: any
  program?: any
};

/**
 * The result of a program being triggered
 */
type ProgramTriggerResult = {
  json: any
  code: number
}

/**
 * Triggers the program and returns the result (JSON + HTTP code)
 *
 * @param {Object} body The trigger body
 * @param {Program?} handlers The program trigger handlers
 * @param {Object?} query The context query
 * @param {Object?} headers The context HTTP headers
 *
 * @return {ProgramTriggerResult} The program trigger result
 *
 * Example return object:
 * {
 *   json: { "example": "json" },
 *   code: 200
 * }
 */
export function triggerProgram(
  body: any,
  handlers: Program = {},
  query: any = {},
  headers: any = {}
): ProgramTriggerResult {

  switch (body.messageType || "PROGRAM_TRIGGER") {
    case "PROGRAM_INTROSPECTION":
      const template = body.template;
      const rules = body.rules;
      const program = body.program;
      // Make modifications to template based on rules here if necessary.
      // ...
      const handleIntrospection = handlers["PROGRAM_INTROSPECTION"];
      try {
        const newTemplate =
          handleIntrospection && (handleIntrospection(template,rules,program)
          || handleIntrospection(template,rules))
          || template;

        return {
          json: newTemplate,
          code: 200
        };
      } catch (e) {
        const errorMes = {
          error: "An error occurred in a webtask",
          message: e.toString(),
        };

        console.log(errorMes);

        return {
          json: errorMes,
          code: 500
        };
      }
    case "PROGRAM_TRIGGER":
      const transaction = new Transaction({
        body: body,
        meta: undefined,
        storage: undefined,
        query: query,
        secrets: undefined,
        headers: headers,
        data: undefined,
      });

      const triggerType = body.activeTrigger.type;
      const handleTrigger = handlers[triggerType];

      try {
        if (handleTrigger) {
          handleTrigger(transaction);
        }

        return {
          json: transaction.toJson(),
          code: 200
        };
      } catch (e) {
        const errorMes = {
          error: "An error occurred in a webtask",
          message: e.toString(),
        };

        console.log(errorMes);

        return {
          json: errorMes,
          code: 500
        };
      }
    default:
      console.log('UNREACHABLE CODE REACHED!!');
      return {
        json: { message: 'Expected either PROGRAM_TRIGGER or PROGRAM_INTROSPECTION messageType.' },
        code: 400
      };
  }
}

/**
 * Returns an express server that serves the provided handlers
 * as a program
 *
 * @param {Program} handlers The program trigger handlers to use
 *
 * @return {Object} The express server
 */
export function webtask(handlers: Program = {}): express.Application {
  const bodyParser = require('body-parser');
  const compression = require('compression');

  const app = express();

  app.use(bodyParser.json());
  app.use(compression());

  // Enforce HTTPS. The server does not redirect http -> https
  // because OWASP advises not to
  app.use((req, res, next) => {
    if (req.header('X-Forwarded-Proto') !== 'https') {
      return res.status(403).send({message: 'SSL required'});
    }

    // allow the request to continue if https is used
    next();
  });

  app.post('/*', (context, res) => {
    const { json, code } = triggerProgram(context.body, handlers, context.query, context.headers);

    res.status(code).json(json);
  });

  return app;
}

/**
 * Returns a logger for the programs to use instead of
 * console.log
 *
 * @param {string} logLevel The log level
 *
 * @return {Logger} The winston logger
 */
export function getLogger(logLevel: string): Logger {
  const logFormat = format.printf(({ level, message }) => {
    return `[${level.toUpperCase()}] ${message}`;
  });

  const logger = createLogger({
    level: logLevel,
    format: format.combine(
      logFormat
    ),
    transports: [new transports.Console()]
  });

  return logger;
}
