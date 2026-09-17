import * as assert from "node:assert";
import { beforeEach, describe, test } from "node:test";
import type { RewardData } from "@saasquatch/schema/types/ProgramTransaction/index.d.ts";
import {
  nonRewardEmailQueryForNonReferralPrograms,
  nonRewardEmailQueryForReferralPrograms,
  rewardEmailQuery,
  rewardEmailQueryForNonReferralPrograms,
} from "../src/queries.ts";
import Transaction from "../src/transaction.ts";
import type { Referral } from "../src/types/saasquatch.ts";

// oxlint-disable typescript/no-floating-promises

describe("Transaction class", () => {
  const messageType = "PROGRAM_TRIGGER" as const;
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
          timeZone: "America/Vancouver",
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
          localization: {},
          segments: [],
          fraudFlags: [],
          rewards: {
            totalCount: 0,
            data: [],
          },
          referrals: {
            totalCount: 0,
          },
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
    rewards: {
      totalCount: 0,
      data: [],
    },
    referrals: {
      totalCount: 0,
    },
    localization: {},
    segments: [],
    fraudFlags: [],
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
        referrals: {
          totalCount: 0,
        },
        localization: {},
        segments: [],
        fraudFlags: [],
      },
      rewards: [],
    } satisfies Referral,
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
        rewardSource: "FRIEND_SIGNUP",
        status: undefined,
        overrideProperties: { dateExpires: ts },
        dynamicProperties: {
          type: "CREDIT",
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
              type: "CREDIT",
              assignedCredit: 2000,
              unit: "CAD",
            },
            userEvent: { key: "userEventValue" },
            rewardSource: "FRIEND_SIGNUP",
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
      // oxlint-disable-next-line typescript/no-unsafe-type-assertion
      const mut = rewardMutation.data as RewardData;

      assert.deepStrictEqual(rewardMutation.type, "CREATE_REWARD");
      assert.deepStrictEqual(mut.user, {
        id: "referrerID",
        accountId: "referrerACCOUNTID",
      });
      assert.deepStrictEqual(mut.key, rewardKey);
      assert.deepStrictEqual(mut.user, {
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
          rewardId: mut.rewardId,
          queryVariables: {
            userId: "referrerID",
            accountId: "referrerACCOUNTID",
            rewardId: mut.rewardId,
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
          type: "CREDIT",
          assignedCredit: 2000,
          unit: "CAD",
        },
      });

      assert.deepStrictEqual(transaction.mutations.length, 2);

      const [rewardMutation, emailMutation] = transaction.mutations;
      // oxlint-disable-next-line typescript/no-unsafe-type-assertion
      const mut = rewardMutation.data as RewardData;

      assert.deepStrictEqual(rewardMutation.type, "CREATE_REWARD");
      assert.deepStrictEqual(mut.user, {
        id: "referrerID",
        accountId: "referrerACCOUNTID",
      });
      assert.deepStrictEqual(mut.key, rewardKey);
      assert.deepStrictEqual(mut.referralId, referralId);
      assert.deepStrictEqual(mut.status, undefined);
      assert.deepStrictEqual(mut.rewardSource, undefined);
      assert.deepStrictEqual(mut.userEvent, undefined);
      assert.deepStrictEqual(mut.overrideProperties, {
        dateExpires: ts,
      });
      assert.deepStrictEqual(mut.dynamicProperties, {
        type: "CREDIT",
        assignedCredit: 2000,
        unit: "CAD",
      });
      assert.deepStrictEqual(mut.user, {
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
          rewardId: mut.rewardId,
          referralId: undefined,
          queryVariables: {
            eventId: undefined,
            fetchEvent: false,
            userId: "referrerID",
            accountId: "referrerACCOUNTID",
            referralId: referralId,
            programId: "testProgramId",
            rewardId: mut.rewardId,
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
          id: "1",
          isModification: false,
          key: "refund",
          fields: {
            order_id: "orderId123",
          },
        },
        {
          id: "2",
          isModification: false,
          key: "purchase",
          fields: {
            order_id: "orderId125",
          },
        },
        {
          id: "3",
          isModification: false,
          key: "refund",
          fields: {
            key: "value",
          },
        },
        {
          id: "4",
          isModification: false,
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
