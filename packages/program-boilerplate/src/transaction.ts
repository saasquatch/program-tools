// @ts-check
import {
  rewardEmailQuery,
  nonRewardEmailQueryForReferralPrograms,
  rewardEmailQueryForNonReferralPrograms,
} from './queries';

export type WebtaskContext = {
  body: any;
  meta: any;
  storage: any;
  query: any;
  secrets: any;
  headers: any;
  data: any;
};

export type Referral = {
  id: string;
};

export type User = {
  id: string;
  accountId: string;
  referredByReferral: Referral;
};

export type ProgramType = 'ACQUISITION' | 'LOYALTY' | 'RETENTION';

export default class Transaction {
  mutations: any[];
  analytics: any[];
  context: WebtaskContext;
  currentUser: User;
  events: any[];

  /**
   * @classdesc A Transaction instance takes a context object from webtask, generates mutations and analytics as the program requested.
   * @constructor
   *
   * @param {WebtaskContext} context     - An javascript object passed by webtask.
   * @param {Object[]} mutations  - Mutations to be made on the program.
   * @param {Object[]} analytics  - Analytics of the program.
   */
  constructor(context: WebtaskContext, mutations: any = [], analytics: any = []) {
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

  fireProgramEvalAnalytics(user: User, type: ProgramType) {
    const evalAnalytic = {
      eventType: 'PROGRAM_EVALUATED',
      data: {
        user: {
          id: user.id,
          accountId: user.accountId,
        },
        programType: undefined,
      },
    };

    if (type !== undefined) {
      evalAnalytic.data.programType = type;
    }

    this.analytics.push(evalAnalytic);
  }

  /**
   * @param {object} user              - user who achieved the program goal
   * @param {string} programType       - type of program
   * @param {string} analyticsKey      - type of goal achieved
   * @param {string} analyticsDedupeId - unique id of the analytic event
   * @param {number} timestamp         - timestamp of the event
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
  generateSimpleReward(rewardKey: string) {
    const rewardId = this.context.body.ids.pop();
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
    rewardProperties,
  }) {
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
   * @param {string} emailKey - Key of email template (as defined in Contentful).
   * @param {User} user       - The user to be sent a email to.
   * @param {Object} query    - Queries to obtain information required by the email. See {@link Queries}.
   */
  generateSimpleEmail({emailKey, user, rewardId}) {
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

  generateReferralEmail({emailKey, user, referralId, rewardId}) {
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
  generateSimpleRewardAndEmail({emailKey, rewardKey, user}) {
    const {rewardId} = this.generateSimpleReward(rewardKey);
    this.generateSimpleEmail({emailKey, user, rewardId});
  }

  /**
   * Generates both reward and email for a referral.
   */
  generateReferralRewardAndEmail({emailKey, rewardKey, referralId, user}) {
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
