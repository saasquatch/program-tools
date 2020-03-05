import * as express from 'express';

import {meetCustomFieldRules, meetEventTriggerRules} from './conversion';
import {rewardEmailQuery} from './queries';
import Transaction from './transaction';
import {triggerProgram} from './trigger';
import {getLogger} from './logger';
import * as types from './types';

import {
  Program,
  ProgramRequirement,
  RequirementValidationResult,
  ValidationProgramField,
  ProgramTriggerBody,
} from './types/rpc';

import {timeboxExpression, safeJsonata} from './jsonata';

import {ProgramType} from './types/saasquatch';
import {
  inferType,
  getGoalAnalyticTimestamp,
  setRewardSchedule,
  numToEquality,
  getTriggerSchema,
} from './utils';

export {types};

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
  rewardEmailQuery,
  setRewardSchedule,
  getGoalAnalyticTimestamp,
  triggerProgram,
  inferType,
  numToEquality,
  getTriggerSchema,
  timeboxExpression,
  safeJsonata,
  getLogger,
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
