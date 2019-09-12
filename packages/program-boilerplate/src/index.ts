import * as express from 'express';
import {createLogger, format, Logger, transports} from 'winston';

import {meetCustomFieldRules, meetEventTriggerRules} from './conversion';
import {rewardEmailQuery} from './queries';
import Transaction from './transaction';
import {triggerProgram} from './trigger';
import * as types from './types';

import {
  Program,
  ProgramRequirement,
  RequirementValidationResult,
  ValidationProgramField,
} from './types/rpc';

import {ProgramType} from './types/saasquatch';
import {
  inferType,
  getGoalAnalyticTimestamp,
  setRewardSchedule,
  numToEquality,
} from './utils';

export {types};

export {
  Transaction,
  meetEventTriggerRules,
  meetCustomFieldRules,
  rewardEmailQuery,
  setRewardSchedule,
  getGoalAnalyticTimestamp,
  triggerProgram,
  Program,
  ProgramType,
  RequirementValidationResult,
  ProgramRequirement,
  ValidationProgramField,
  inferType,
  numToEquality,
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
  const bodyParser = require('body-parser');
  const compression = require('compression');

  const app = express();

  app.use(bodyParser.json());
  app.use(compression());

  // Enforce HTTPS. The server does not redirect http -> https
  // because OWASP advises not to
  app.use((req, res, next) => {
    if (
      process.env.NODE_ENV === 'production' &&
      req.header('X-Forwarded-Proto') !== 'https'
    ) {
      return res.status(403).send({message: 'SSL required'});
    }

    // allow the request to continue if https is used
    next();
  });

  app.post('/*', (context, res) => {
    const {json, code} = triggerProgram(context.body, program);

    res.status(code).json(json);
  });

  return app;
}

// Lazily initialized logger instance
let _logger: Logger;

/**
 * Returns a logger for the programs to use instead of
 * console.log
 *
 * @param {string} logLevel The log level
 *
 * @return {Logger} The winston logger
 */
export function getLogger(logLevel: string): Logger {
  if (_logger) {
    return _logger;
  }

  const logFormat = format.printf(({level, message}) => {
    return `[${level.toUpperCase()}] ${message}`;
  });

  _logger = createLogger({
    level: logLevel,
    format: format.combine(logFormat),
    transports: [new transports.Console()],
  });

  return _logger;
}
