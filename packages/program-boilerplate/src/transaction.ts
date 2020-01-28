// @ts-check
import {
  rewardEmailQuery,
  nonRewardEmailQueryForReferralPrograms,
  rewardEmailQueryForNonReferralPrograms,
} from './queries';

import {ProgramTriggerBody} from './types/rpc';
import {ProgramType, User} from './types/saasquatch';
const ObjectID = require('bson-objectid');

type TransactionContext = {
  body: ProgramTriggerBody;
};

type ReferralRewardInput = {
  rewardKey: string;
  user: User;
  referralId: string;
  userEvent?: any;
  rewardSource?: string;
  status?: string;
  rewardProperties?: any;
};

export default class Transaction {
  mutations: any[];
  analytics: any[];
  context: TransactionContext;
  currentUser: User;
  events?: any[];

  /**
   * @classdesc A Transaction instance takes a context object from Express, generates mutations and analytics as the program requested.
   * @constructor
   *
   * @param {TransactionContext} context   A javascript object passed by webtask.
   * @param {Object[]}           mutations Mutations to be made on the program.
   * @param {Object[]}           analytics Analytics of the program.
   */
  constructor(
    context: TransactionContext,
    mutations: any = [],
    analytics: any = [],
  ) {
    this.mutations = mutations;
    this.analytics = analytics;
    this.context = context;

    const activeTrigger = context.body.activeTrigger;

    this.currentUser = activeTrigger.user;
    this.events = activeTrigger.events;
  }

  /**
   * Generates a PROGRAM_EVALUATED analytic and pushes it
   * to the list of analytics.
   *
   * @param {User}        user The user to associate the analytic with
   * @param {ProgramType} type The type of program
   */
  fireProgramEvalAnalytics(user: User, type: ProgramType) {
    const evalAnalytic = {
      eventType: 'PROGRAM_EVALUATED',
      data: {
        user: {
          id: user.id,
          accountId: user.accountId,
        },
        programType: type,
      },
    };

    this.analytics.push(evalAnalytic);
  }

  /**
   * Generates a PROGRAM_GOAL analytic and pushs it
   * to the list of analytics.
   *
   * @param {object} user              user who achieved the program goal
   * @param {string} programType       type of program
   * @param {string} analyticsKey      type of goal achieved
   * @param {string} analyticsDedupeId dedupe id of the analytic event
   * @param {number} timestamp         timestamp of the event
   */
  fireProgramGoalAnalytics(
    user: User,
    programType: ProgramType,
    analyticsKey: string,
    analyticsDedupeId: string,
    timestamp: number,
  ) {
    const goalAnalytic = {
      eventType: 'PROGRAM_GOAL',
      data: {
        programType,
        timestamp,
        analyticsKey,
        analyticsDedupeId,
        user: {
          id: user.id,
          accountId: user.accountId,
        },
      },
    };

    this.analytics.push(goalAnalytic);
  }

  /**
   * Generates a reward that does not relates to any referral, for the currrent user.
   *
   * @param {string} rewardKey - Key of the reward (as defined in contentful).
   */
  generateSimpleReward(rewardKey: string) {
    const rewardId = ObjectID();
    const newMutation = {
      type: 'CREATE_REWARD',
      data: {
        user: {
          id: this.currentUser.id,
          accountId: this.currentUser.accountId,
        },
        key: rewardKey,
        rewardId: rewardId,
      },
    };

    this.mutations = [...this.mutations, newMutation];
    return {rewardId};
  }

  /**
   * Generates reward for a user of a referral.
   *
   * @param {string} rewardKey  Key of the reward (as defined in Contentful).
   * @param {User}   user       The user to be given reward to (can be either referrer or referred user).
   * @param {string} referralId id of the referral.
   */
  generateReferralReward(input: ReferralRewardInput) {
    const {
      rewardKey,
      user,
      referralId,
      userEvent,
      rewardSource,
      status,
      rewardProperties,
    } = input;

    const rewardId = this.context.body.ids.pop();
    const rewardData = {
      user: {
        id: user.id,
        accountId: user.accountId,
      },
      key: rewardKey,
      rewardId: rewardId,
      referralId: referralId,
    };

    const validProperties = [
      {userEvent},
      {rewardSource},
      {status},
      rewardProperties,
    ].filter(prop => prop !== undefined);
    const updatedRewardData = validProperties.reduce((currentData, prop) => {
      return {...currentData, ...prop};
    }, rewardData);
    const newMutation = {
      type: 'CREATE_REWARD',
      data: updatedRewardData,
    };

    this.mutations = [...this.mutations, newMutation];
    return {rewardId};
  }

  /**
   * Generates an email for the user.
   *
   * @param {string} emailKey Key of email template (as defined in Contentful).
   * @param {User}   user     The user to be sent a email to
   * @param {string} rewardId The reward id
   */
  generateSimpleEmail({
    emailKey,
    user,
    rewardId,
  }: {
    emailKey: string;
    user: User;
    rewardId: any;
  }) {
    if (!rewardId) {
      throw new Error('rewardId must be provided before email sent.');
    }

    const queryVariables = {
      userId: user.id,
      accountId: user.accountId,
      rewardId: rewardId,
      programId: this.context.body.program.id,
    };

    const newMutation = {
      type: 'SEND_EMAIL',
      data: {
        user: {
          id: user.id,
          accountId: user.accountId,
        },
        key: emailKey,
        queryVariables: queryVariables,
        query: rewardEmailQueryForNonReferralPrograms,
        rewardId: rewardId,
      },
    };

    this.mutations = [...this.mutations, newMutation];
  }

  generateReferralEmail({
    emailKey,
    user,
    referralId,
    rewardId,
  }: {
    emailKey: string;
    user: User;
    referralId: string;
    rewardId?: string;
  }) {
    const variables = {
      userId: user.id,
      accountId: user.accountId,
      programId: this.context.body.program.id,
      referralId: referralId,
    };

    const queryVariables = rewardId ? {...variables, rewardId} : variables;
    const newMutation = {
      type: 'SEND_EMAIL',
      data: {
        user: {
          id: user.id,
          accountId: user.accountId,
        },
        key: emailKey,
        queryVariables: queryVariables,
        query: rewardId
          ? rewardEmailQuery
          : nonRewardEmailQueryForReferralPrograms,
      },
    };
    this.mutations = [...this.mutations, newMutation];
  }

  /**
   * Generates both reward and email.
   */
  generateSimpleRewardAndEmail({
    emailKey,
    rewardKey,
    user,
  }: {
    emailKey: string;
    rewardKey: string;
    user: User;
  }) {
    const {rewardId} = this.generateSimpleReward(rewardKey);
    this.generateSimpleEmail({emailKey, user, rewardId});
  }

  /**
   * Generates both reward and email for a referral.
   */
  generateReferralRewardAndEmail({
    emailKey,
    rewardKey,
    referralId,
    user,
  }: {
    emailKey: string;
    rewardKey: string;
    referralId: string;
    user: User;
  }) {
    const {rewardId} = this.generateReferralReward({
      rewardKey,
      referralId,
      user,
      userEvent: undefined,
      rewardSource: undefined,
      status: undefined,
      rewardProperties: undefined,
    });

    this.generateReferralEmail({emailKey, user, referralId, rewardId});
  }

  generateRefunds() {
    const refundEvents = (this.events || []).filter(
      e =>
        e.key === 'refund' &&
        e.fields &&
        // we can't do much if there's no order_id
        e.fields.order_id,
    );
    refundEvents.forEach(refundEvent => {
      const refundNode = {
        type: 'MODERATE_GRAPH_NODES',
        data: {
          graphNodeType: 'USER_EVENT',
          filter: {
            key: 'purchase',
            fields: {
              order_id_eq: refundEvent.fields.order_id,
            },
          },
          moderationInput: {
            action: 'DENY',
            maxDepth: 5,
          },
        },
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
      analytics: this.analytics,
    };
  }
}
