// @ts-check

import Transaction from './transaction';
import {rewardEmailQuery} from './queries';
import {meetCustomFieldRules, meetEventTriggerRules} from './conversion';
import {setRewardSchedule} from './utils';

export {
  Transaction,
  meetEventTriggerRules,
  meetCustomFieldRules,
  rewardEmailQuery,
  setRewardSchedule
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
 * @description A list of valid programTriggerTypes
 */

const ProgramTriggerTypes = [
    "AFTER_USER_CREATED_OR_UPDATED",
    "REFERRAL",
    "AFTER_USER_EVENT_PROCESSED",
    "SCHEDULED",
    "REWARD_SCHEDULED"];

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
    /**
     * A function that fits in the webtask programming model. 
     * If the messageType of context is 
     * (a) "PROGRAM_INTROSPECTION":
     * The handler must take the current template and rules as parameter, and returns the modified template.
     * (b) "PROGRAM_TRIGGER":
     * It creates a Transaction instance and passes it to a program handler.
     * The handler will operate on the transaction instance to generate mutations analytics, which, together with programId are passed as 
     * the result parameter of the callback function.
     * 
     * @param {WebtaskContext} context - A webtask context with several properties.
     * @param {requestCallback} cb - A callback function.To indicate completion, the function must call the callback with two arguments: an error, and the result.
     */
    return function (context, cb) {
        switch (context.body.messageType || "PROGRAM_TRIGGER") {
            case "PROGRAM_INTROSPECTION":
                const template = context.body.template;
                const rules = context.body.rules;
                // Make modifications to template based on rules here if necessary.
                // ...
                const handleIntrospection = handlers["PROGRAM_INTROSPECTION"];
                const newTemplate = handleIntrospection && handleIntrospection(template,rules) || template;
                cb(null, newTemplate);
                break;
            case "PROGRAM_TRIGGER": 
                let transaction = new Transaction(context);
                const triggerType = context.body.activeTrigger.type;
                const handleTrigger = handlers[triggerType];
                if (handleTrigger) {
                    handleTrigger(transaction);
                }  
                cb(null, transaction.toJson());
                break;
            default:
                cb(null, {});
                break;
        }
    }

}