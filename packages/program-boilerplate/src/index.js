// @ts-check

import * as Queries from './queries';
import * as Conversion from './conversion';
import * as FraudCheck from './fraudCheck';
import * as Transaction from './transaction';

const rewardEmailQuery = Queries.rewardEmailQuery;

export {
  Queries,
  Conversion,
  rewardEmailQuery
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


export function webtask(handler) {
    return function (context, cb) {
        switch (context.body.messageType || "PROGRAM_TRIGGER") {
            case "PROGRAM_INTROSPECTION":
                var template = context.body.template;
                var rules = context.body.rules;
                // Make modifications to template based on rules here if necessary.
                // ...
                return cb(null, template);
            case "PROGRAM_TRIGGER":  
                let transaction = new Transaction(context);

                const triggerType = context.body.activeTrigger.type;
                switch(triggerType) {
                    case "AFTER_USER_CREATED_OR_UPDATED":
                        //console.log("AFTER_USER_CREATED_OR_UPDATED");
                        handler(transaction);
                        break;
                    case "REFERRAL":
                        //console.log(context.body.activeTrigger.referralEventType);
                        handler(transaction);
                        break;
                    case "AFTER_USER_EVENT_PROCESSED":
                        //console.log("EVENT_TRIGGERD");
                        handler(transaction);
                        break;
                    case "SCHEDULED":
                        //handleScheduledTrigger(context, mutations, analytics);
                        break;
                    default:
                        break;
                }
                cb(null, {
                    "mutations": this.mutations,
                    "programId": this.context.body.program.id,
                    "analytics": this.analytics
                  });
        }
    }

}