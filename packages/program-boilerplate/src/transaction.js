// @ts-check
import {
  rewardEmailQuery,
  nonRewardEmailQueryForReferralPrograms,
  rewardEmailQueryForNonReferralPrograms
} from "./queries";
/**
 * @typedef WebtaskContext
 * @property {Object} body      -  An object containing either application/json or application/x-www-form-urlencoded parsed data.
 * @property {Object} meta      -  An object containing the metadata properties of the task being executed, or an empty object if there are none.
 * @property {Object} storage   - An instance of the storage interface. The context.storage.get and the context.storage.set methods can be used to access or store items.
 * @property {Object} query     -  The parsed query-string. It is parsed using querystring, so it does not support the dot syntax that things like qs support.
 * @property {Object} secrets   - An object containing Webtask secrets (or an empty object, if there are none).
 * @property {Object} headers   - An object containing the unmodified headers from the request received by the Webtask sandbox.
 * @property {Object} data      - An object containing the overlay of query params, Webtask token params (pctx), Webtask secrets, and the body (when the mb claim is 1).
 *
 * @see {@link https://webtask.io/docs/context}
 */

/**
 * @typedef User
 *
 * @property {string} id
 * @property {string} accountId
 * @property {Referral} referredByReferral
 */

/**
 * @typedef Referral
 * @typedef {string} id
 */

export default class Transaction {
  /**
   * @classdesc A Transaction instance takes a context object from webtask, generates mutations and analytics as the program requested.
   * @constructor
   *
   * @param {WebtaskContext} context     - An javascript object passed by webtask.
   * @param {Object[]} mutations  - Mutations to be made on the program.
   * @param {Object[]} analytics  - Analytics of the program.
   */
  constructor(context, mutations = [], analytics = []) {
    this.mutations = mutations;
    this.analytics = analytics;
    this.context = context;
    this.currentUser = null;
    if (context.body.activeTrigger) {
      const activeTrigger = context.body.activeTrigger;
      this.currentUser = activeTrigger.user;
      this.events = activeTrigger.events;
    }
  }

  fireProgramEvalAnalytics(user) {
    const evalAnalytic = {
      eventType: "PROGRAM_EVALUATED",
      data: {
        user: {
          id: user.id,
          accountId: user.accountId
        }
      }
    };
    this.analytics.push(evalAnalytic);
  }

  /**
   * @property {string?} emailKey     - Key of email template (as defined in Contentful).
   * @property {string?} rewardKey    - Key of the reward (as defined in Contentful).
   * @property {User} user            - The user to be given reward to (can be either referrer or referred user).
   * @property {Object?} query        - Queries to obtain information required by the email. See {@link Queries}.
   */

  /**
   * Generates a reward that does not relates to any referral, for the currrent user.
   *
   * @param {string} rewardKey - Key of the reward (as defined in contentful).
   */
  generateSimpleReward(rewardKey) {
    const rewardId = this.context.body.ids.pop();
    const newMutation = {
      type: "CREATE_REWARD",
      data: {
        user: {
          id: this.currentUser.id,
          accountId: this.currentUser.accountId
        },
        key: rewardKey,
        rewardId: rewardId
      }
    };

    this.mutations = [...this.mutations, newMutation];
    return {rewardId}
  }

  /**
   * Generates reward for a user of a referral.
   *
   * @param {string} rewardKey - Key of the reward (as defined in Contentful).
   * @param {User} user - The user to be given reward to (can be either referrer or referred user).
   * @param {string} referralId - id of the referral.
   */
  generateReferralReward({
    rewardKey,
    referralId,
    user,
    userEvent,
    rewardSource,
    status,
    rewardProperties
  }) {
    const rewardId = this.context.body.ids.pop();
    const rewardData = {
      user: {
        id: user.id,
        accountId: user.accountId
      },
      key: rewardKey,
      rewardId: rewardId,
      referralId: referralId
    };
    const validProperties = [{userEvent},{rewardSource},{status},rewardProperties].filter(prop=>prop!==undefined);
    const updatedRewardData = validProperties.reduce((currentData,prop)=> {return {...currentData,...prop}},rewardData);
    const newMutation = {
      type: "CREATE_REWARD",
      data:
        updatedRewardData
    };

    this.mutations = [...this.mutations, newMutation];
    return {rewardId};
  }

  /**
   * Generates an email for the user.
   *
   * @param {string} emailKey - Key of email template (as defined in Contentful).
   * @param {User} user       - The user to be sent a email to.
   * @param {Object} query    - Queries to obtain information required by the email. See {@link Queries}.
   */
  generateSimpleEmail({ emailKey, user, rewardId }) {
    if (!rewardId) {
        throw new Error("rewardId must be provided before email sent.");
    }
    const queryVariables = {
      userId: user.id,
      accountId: user.accountId,
      rewardId: rewardId,
      programId: this.context.body.program.id
    };
    const newMutation = {
      type: "SEND_EMAIL",
      data: {
        user: {
          id: user.id,
          accountId: user.accountId
        },
        key: emailKey,
        queryVariables: queryVariables,
        query: rewardEmailQueryForNonReferralPrograms,
        rewardId: rewardId
      }
    };
    this.mutations = [...this.mutations, newMutation];
  }

  generateReferralEmail({ emailKey, user, referralId, rewardId }) {
    const variables = {
      userId: user.id,
      accountId: user.accountId,
      programId: this.context.body.program.id,
      referralId: referralId,
    };
    const queryVariables = rewardId?{...variables,rewardId}:variables;
    const newMutation = {
      type: "SEND_EMAIL",
      data: {
        user: {
          id: user.id,
          accountId: user.accountId
        },
        key: emailKey,
        queryVariables: queryVariables,
        query: rewardId?rewardEmailQuery:nonRewardEmailQueryForReferralPrograms,
      }
    };
    this.mutations = [...this.mutations, newMutation];
  }

  /**
   * Generates both reward and email.
   */
  generateSimpleRewardAndEmail({ emailKey, rewardKey, user }) {
    const {rewardId} = this.generateSimpleReward(rewardKey);
    this.generateSimpleEmail({ emailKey, user, rewardId });
  }
  /**
   * Generates both reward and email for a referral.
   */
  generateReferralRewardAndEmail({ emailKey, rewardKey, referralId, user }) {
    const {rewardId} =this.generateReferralReward({ rewardKey, user, referralId });
    this.generateReferralEmail({ emailKey, user, referralId, rewardId });
  }

  generateRefunds(){
    const refundEvents = (this.events || []).filter(
      e =>
        e.key === "refund" &&
        e.fields &&
        // we can't do much if there's no order_id
        e.fields.order_id
    );
    refundEvents.forEach(refundEvent => {
      const refundNode = {
        type: "MODERATE_GRAPH_NODES",
        data: {
          graphNodeType: "USER_EVENT",
          filter: {
            key: "purchase",
            fields: {
              order_id_eq: refundEvent.fields.order_id
            }
          },
          moderationInput: {
            action: "DENY",
            maxDepth: 5
          }
        }
      };
      this.mutations = [...this.mutations, refundNode];
      });
  } 

  /**
   * Returns a JSON object required by the callback function of webtask to modifify the program.
   */
  toJson() {
    return {
      mutations: this.mutations,
      programId: this.context.body.program.id,
      analytics: this.analytics
    };
  }
}
