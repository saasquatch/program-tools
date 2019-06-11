// @ts-check
import Transaction from './transaction';
import {rewardEmailQuery} from './queries';
import {meetCustomFieldRules, meetEventTriggerRules} from './conversion';
import {setRewardSchedule, getGoalAnalyticTimestamp} from './utils';
import {getTriggerBody, getIntrospectionBody} from './testing';

export {
  Transaction,
  meetEventTriggerRules,
  meetCustomFieldRules,
  rewardEmailQuery,
  setRewardSchedule,
  getGoalAnalyticTimestamp,
  getTriggerBody,
  getIntrospectionBody
}

/**
 * @typedef {Object} WebtaskContext
 * @property {WebtaskContextBody?} body
 */
/**
 * @typedef {Object} WebtaskContextBody
 * @property {Object?} activeTrigger
 * @property {Object?} program
 */

/**
 * Triggers the program and returns the result (JSON + HTTP code)
 *
 * @param {Object} body The trigger body
 * @param {Object?} handlers The program trigger handlers
 * @param {Object?} query The context query
 * @param {Object?} headers The context HTTP headers
 *
 * @return {Object} The program trigger result
 *
 * Example return object:
 * {
 *   json: { "example": "json" },
 *   code: 200
 * }
 */
export function triggerProgram(body, handlers = {}, query = {}, headers = {}) {
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
* A webtask that accepts handlers and returns a function fitting the webtask programming model.
*
* @example webtask ({
*          "AFTER_USER_CREATED_OR_UPDATED" : handleUserUpsert,
*          "AFTER_USER_EVENT_PROCESSED": handleUserEvent,
*          "REFERRAL": handleReferralTrigger,
*          "PROGRAM_INTROSPECTION": handleIntrospection
*           })
* @param {Object} handlers - Key-value pairs, where key is a ProgramTriggerType (see {@link ProgramTriggerTypes}) or "PROGRAM_INTROSPECTION";
* ProgramTrigger handlers must accept a transaction instance as parameter.
* Program-Introspection must accept a template as parameter and returns a new template.
* @returns {function} - A function that fits in the webtask programming model. See {@link https://webtask.io/docs/model}.
*
*
*/
export function webtask(handlers = {}) {
  const express = require('express')();
  const bodyParser = require('body-parser');
  const compression = require('compression');

  express.use(bodyParser.json());
  express.use(compression());

  // Enforce HTTPS. The server does not redirect http -> https
  // because OWASP advises not to
  express.use((req, res, next) => {
    if (req.header('X-Forwarded-Proto') !== 'https') {
      return res.status(403).send({message: 'SSL required'});
    }

    // allow the request to continue if https is used
    next();
  });

  express.post('/*', (context, res) => {
    const { json, code } = triggerProgram(context.body, handlers, context.query, context.headers);

    res.status(code).json(json);
  });

  return express;
}

// Returns a logger for the programs to use instead of
// console.log
export function getLogger(logLevel) {
  const winston = require('winston');

  const logFormat = winston.format.printf(({ level, message }) => {
    return `[${level.toUpperCase()}] ${message}`;
  });

  const logger = winston.createLogger({
    level: logLevel,
    format: winston.format.combine(
      logFormat
    ),
    transports: [new winston.transports.Console()]
  });

  return logger;
}
