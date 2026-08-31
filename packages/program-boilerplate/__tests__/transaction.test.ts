import * as assert from "node:assert";
import { beforeEach, describe, test } from "node:test";
import {
  nonRewardEmailQueryForNonReferralPrograms,
  nonRewardEmailQueryForReferralPrograms,
  rewardEmailQuery,
  rewardEmailQueryForNonReferralPrograms,
} from "../src/queries.ts";
import Transaction from "../src/transaction.ts";
import type { Referral } from "../src/types/saasquatch.ts";

describe("Transaction class", () => {
  const messageType: "PROGRAM_TRIGGER" = "PROGRAM_TRIGGER";
  const testContext = {
    body: {
      messageType,
      program: {
        id: "testProgramId",
        rules: {},
        templateId: "",
      },
      ids: ["123", "345", "456"],
      tenant: {
        impactBrandId: null,
        settings: {
          suspectedFraudModerationState: "OK",
        },
      },
      activeTrigger: {
        type: "AFTER_USER_EVENT_PROCESSED" as const,
        time: 1619483037813,
        user: {
          id: "referrerID",
          accountId: "referrerACCOUNTID",
          customFields: {
            test: 123,
          },
          programGoals: [],
        },
        events: [
          {
            key: "subscription",
            id: "1",
            dateTriggered: 1619483037800,
            isModification: false,
            fields: {
              key: "value1",
            },
          },
        ],
      },
    },
  };
  const testUser = {
    id: "referrerID",
    accountId: "referrerACCOUNTID",
    programGoals: [],
    referredByReferral: {
      id: "referralID",
      fraudFlags: [],
      isFraudExempt: false,
      referrerUser: {
        id: "referredID",
        accountId: "referredACCOUNTID",
        programGoals: [],
        rewards: {
          totalCount: 0,
          data: [],
        },
      },
      rewards: [],
    } as Referral,
  };

  let transaction = new Transaction(testContext);
  beforeEach(() => {
    transaction = new Transaction(testContext);
  });

  describe("#fireProgramEvalAnalytics", () => {
    test("evalAnalytic is pushed to analytics", () => {
      transaction.fireProgramEvalAnalytics(testUser, "ACQUISITION");
      assert.deepStrictEqual(transaction.analytics, [
        {
          eventType: "PROGRAM_EVALUATED",
          data: {
            user: {
              id: "referrerID",
              accountId: "referrerACCOUNTID",
            },
            programType: "ACQUISITION",
          },
        },
      ]);
    });
  });

  describe("#fireProgramGoalAnalytics", () => {
    test("goalAnalytic pushed to analytics", () => {
      const now = Date.now();
      transaction.fireProgramGoalAnalytics(
        testUser,
        "LOYALTY",
        "testAnalyticsKey",
        "testDedupKey",
        now,
        false,
      );

      assert.deepStrictEqual(transaction.analytics, [
        {
          eventType: "PROGRAM_GOAL",
          data: {
            programType: "LOYALTY",
            timestamp: now,
            analyticsKey: "testAnalyticsKey",
            analyticsDedupeId: "testDedupKey",
            user: {
              id: "referrerID",
              accountId: "referrerACCOUNTID",
            },
            isConversion: false,
          },
        },
      ]);
    });
  });

  describe("#generateSimpleReward", () => {
    const rewardKey = "testRewardKey123";
    test("createReward mutation is pushed to mutations", () => {
      const { rewardId } = transaction.generateSimpleReward(rewardKey);
      assert.deepStrictEqual(transaction.mutations, [
        {
          type: "CREATE_REWARD",
          data: {
            user: {
              id: "referrerID",
              accountId: "referrerACCOUNTID",
            },
            key: rewardKey,
            rewardId: rewardId,
          },
        },
      ]);
    });
  });

  describe("#generateReferralReward", () => {
    test("createReferralReward mutation is pushed to mutations", () => {
      const rewardKey = "testRewardKey4";
      const referralId = "testReferralId";
      const ts = Date.now() + 100000;

      const { rewardId } = transaction.generateReferralReward({
        rewardKey,
        user: testUser,
        referralId,
        userEvent: { key: "userEventValue" },
        rewardSource: "testSource",
        status: undefined,
        overrideProperties: { dateExpires: ts },
        dynamicProperties: {
          type: "testReward",
          assignedCredit: 2000,
          unit: "CAD",
        },
      });
      assert.deepStrictEqual(transaction.mutations, [
        {
          type: "CREATE_REWARD",
          data: {
            user: {
              id: "referrerID",
              accountId: "referrerACCOUNTID",
            },
            key: rewardKey,
            rewardId: rewardId,
            referralId: referralId,
            status: undefined,
            overrideProperties: { dateExpires: ts },
            dynamicProperties: {
              type: "testReward",
              assignedCredit: 2000,
              unit: "CAD",
            },
            userEvent: { key: "userEventValue" },
            rewardSource: "testSource",
          },
        },
      ]);
    });
  });

  describe("#generateSimpleEmail", () => {
    const rewardId = "testRewardKey523";
    const emailKey = "testEmailKey2344";
    test("sendEmail mutation is pushed to mutations (with reward)", () => {
      transaction.generateSimpleEmail({ emailKey, user: testUser, rewardId });
      assert.deepStrictEqual(transaction.mutations, [
        {
          type: "SEND_EMAIL",
          data: {
            user: {
              id: "referrerID",
              accountId: "referrerACCOUNTID",
            },
            key: emailKey,
            rewardId: rewardId,
            queryVariables: {
              userId: "referrerID",
              accountId: "referrerACCOUNTID",
              rewardId: rewardId,
              programId: "testProgramId",
            },
            query: rewardEmailQueryForNonReferralPrograms,
          },
        },
      ]);
    });

    test("sendEmail mutation is pushed to mutations (without reward)", () => {
      transaction.generateSimpleEmail({ emailKey, user: testUser });
      assert.deepStrictEqual(transaction.mutations, [
        {
          type: "SEND_EMAIL",
          data: {
            user: {
              id: "referrerID",
              accountId: "referrerACCOUNTID",
            },
            key: emailKey,
            rewardId: undefined,
            queryVariables: {
              userId: "referrerID",
              accountId: "referrerACCOUNTID",
              programId: "testProgramId",
            },
            query: nonRewardEmailQueryForNonReferralPrograms,
          },
        },
      ]);
    });
  });

  describe("#generateReferralEmail", () => {
    const rewardId = "testRewardKey523";
    const emailKey = "testEmailKey2344";
    const referralId = "testReferralId";
    test("sendEmail mutation is pushed to mutations with reward query", () => {
      transaction.generateReferralEmail({
        emailKey,
        user: testUser,
        referralId,
        rewardId,
      });
      assert.deepStrictEqual(transaction.mutations, [
        {
          type: "SEND_EMAIL",
          data: {
            user: {
              id: "referrerID",
              accountId: "referrerACCOUNTID",
            },
            key: emailKey,
            rewardId: rewardId,
            referralId: undefined,
            queryVariables: {
              eventId: undefined,
              fetchEvent: false,
              userId: "referrerID",
              accountId: "referrerACCOUNTID",
              referralId: referralId,
              programId: "testProgramId",
              rewardId: rewardId,
            },
            query: rewardEmailQuery,
          },
        },
      ]);
    });

    test("sendEmail mutation is pushed to mutations with non reward query", () => {
      transaction.generateReferralEmail({
        emailKey,
        user: testUser,
        referralId,
      });
      assert.deepStrictEqual(transaction.mutations, [
        {
          type: "SEND_EMAIL",
          data: {
            user: {
              id: "referrerID",
              accountId: "referrerACCOUNTID",
            },
            key: emailKey,
            rewardId: undefined,
            referralId,
            queryVariables: {
              eventId: undefined,
              fetchEvent: false,
              userId: "referrerID",
              accountId: "referrerACCOUNTID",
              referralId: referralId,
              programId: "testProgramId",
            },
            query: nonRewardEmailQueryForReferralPrograms,
          },
        },
      ]);
    });
  });

  describe("#generateSimpleRewardAndEmail", () => {
    const rewardKey = "testRewardKey53";
    const emailKey = "testEmailKey24";
    test("createReward and sendEmail mutations are pushed to mutations", () => {
      transaction.generateSimpleRewardAndEmail({
        emailKey,
        rewardKey,
        user: testUser,
      });

      assert.deepStrictEqual(transaction.mutations.length, 2);

      const [rewardMutation, emailMutation] = transaction.mutations;
      assert.deepStrictEqual(rewardMutation.type, "CREATE_REWARD");
      assert.deepStrictEqual(rewardMutation.data.user, {
        id: "referrerID",
        accountId: "referrerACCOUNTID",
      });
      assert.deepStrictEqual(rewardMutation.data.key, rewardKey);
      assert.deepStrictEqual(rewardMutation.data.user, {
        id: "referrerID",
        accountId: "referrerACCOUNTID",
      });
      assert.deepStrictEqual(emailMutation, {
        type: "SEND_EMAIL",
        data: {
          user: {
            id: "referrerID",
            accountId: "referrerACCOUNTID",
          },
          key: emailKey,
          rewardId: rewardMutation.data.rewardId,
          queryVariables: {
            userId: "referrerID",
            accountId: "referrerACCOUNTID",
            rewardId: rewardMutation.data.rewardId,
            programId: "testProgramId",
          },
          query: rewardEmailQueryForNonReferralPrograms,
        },
      });
    });
  });

  describe("#generateReferralRewardAndEmail", () => {
    test("createReferralReward and sendEmail mutations are pushed to mutations", () => {
      const rewardKey = "testRewardKey";
      const referralId = "testReferralId";
      const emailKey = "testEmailKey";
      const ts = Date.now() + 100000;

      transaction.generateReferralRewardAndEmail({
        rewardKey,
        emailKey,
        user: testUser,
        referralId,
        status: undefined,
        overrideProperties: { dateExpires: ts },
        dynamicProperties: {
          type: "testReward",
          assignedCredit: 2000,
          unit: "CAD",
        },
      });

      assert.deepStrictEqual(transaction.mutations.length, 2);

      const [rewardMutation, emailMutation] = transaction.mutations;
      assert.deepStrictEqual(rewardMutation.type, "CREATE_REWARD");
      assert.deepStrictEqual(rewardMutation.data.user, {
        id: "referrerID",
        accountId: "referrerACCOUNTID",
      });
      assert.deepStrictEqual(rewardMutation.data.key, rewardKey);
      assert.deepStrictEqual(rewardMutation.data.referralId, referralId);
      assert.deepStrictEqual(rewardMutation.data.status, undefined);
      assert.deepStrictEqual(rewardMutation.data.rewardSource, undefined);
      assert.deepStrictEqual(rewardMutation.data.userEvent, undefined);
      assert.deepStrictEqual(rewardMutation.data.overrideProperties, {
        dateExpires: ts,
      });
      assert.deepStrictEqual(rewardMutation.data.dynamicProperties, {
        type: "testReward",
        assignedCredit: 2000,
        unit: "CAD",
      });
      assert.deepStrictEqual(rewardMutation.data.user, {
        id: "referrerID",
        accountId: "referrerACCOUNTID",
      });

      assert.deepStrictEqual(emailMutation, {
        type: "SEND_EMAIL",
        data: {
          user: {
            id: "referrerID",
            accountId: "referrerACCOUNTID",
          },
          key: emailKey,
          rewardId: rewardMutation.data.rewardId,
          referralId: undefined,
          queryVariables: {
            eventId: undefined,
            fetchEvent: false,
            userId: "referrerID",
            accountId: "referrerACCOUNTID",
            referralId: referralId,
            programId: "testProgramId",
            rewardId: rewardMutation.data.rewardId,
          },
          query: rewardEmailQuery,
        },
      });
    });
  });

  describe("#generateRefunds", () => {
    test("refund mutatations are pushed to the mutations", () => {
      transaction.events = [
        {
          key: "refund",
          fields: {
            order_id: "orderId123",
          },
        },
        {
          key: "purchase",
          fields: {
            order_id: "orderId125",
          },
        },
        {
          key: "refund",
          fields: {
            key: "value",
          },
        },
        {
          key: "refund",
          fields: {
            order_id: "orderId125",
          },
        },
      ];

      transaction.generateRefunds();
      assert.deepStrictEqual(transaction.mutations, [
        {
          type: "MODERATE_GRAPH_NODES",
          data: {
            graphNodeType: "USER_EVENT",
            filter: {
              key: "purchase",
              fields: {
                order_id_eq: "orderId123",
              },
            },
            moderationInput: {
              action: "DENY",
              maxDepth: 5,
            },
          },
        },
        {
          type: "MODERATE_GRAPH_NODES",
          data: {
            graphNodeType: "USER_EVENT",
            filter: {
              key: "purchase",
              fields: {
                order_id_eq: "orderId125",
              },
            },
            moderationInput: {
              action: "DENY",
              maxDepth: 5,
            },
          },
        },
      ]);
    });
  });

  describe("#toJson", () => {
    test("output is formatted correctly", () => {
      transaction.mutations = [
        {
          type: "MODERATE_GRAPH_NODES",
          data: {
            graphNodeType: "USER_EVENT",
            filter: {
              key: "purchase",
              fields: {
                order_id_eq: "orderId125",
              },
            },
            moderationInput: {
              action: "DENY",
              maxDepth: 5,
            },
          },
        },
      ];
      const now = Date.now();
      transaction.analytics = [
        {
          eventType: "PROGRAM_GOAL",
          data: {
            programType: "LOYALTY",
            timestamp: now,
            analyticsKey: "testAnalyticsKey",
            analyticsDedupeId: "testDedupKey",
            user: {
              id: "referrerID",
              accountId: "referrerACCOUNTID",
            },
            isConversion: false,
          },
        },
      ];

      assert.deepStrictEqual(transaction.toJson(), {
        mutations: [
          {
            type: "MODERATE_GRAPH_NODES",
            data: {
              graphNodeType: "USER_EVENT",
              filter: {
                key: "purchase",
                fields: {
                  order_id_eq: "orderId125",
                },
              },
              moderationInput: {
                action: "DENY",
                maxDepth: 5,
              },
            },
          },
        ],
        analytics: [
          {
            eventType: "PROGRAM_GOAL",
            data: {
              programType: "LOYALTY",
              timestamp: now,
              analyticsKey: "testAnalyticsKey",
              analyticsDedupeId: "testDedupKey",
              user: {
                id: "referrerID",
                accountId: "referrerACCOUNTID",
              },
              isConversion: false,
            },
          },
        ],
        programId: "testProgramId",
      });
    });
  });
});
