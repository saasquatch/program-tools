import { RewardData } from "@saasquatch/schema/types/ProgramTransaction";
import {
  nonRewardEmailQueryForNonReferralPrograms,
  nonRewardEmailQueryForReferralPrograms,
  rewardEmailQuery,
  rewardEmailQueryForNonReferralPrograms,
} from "../src/queries";
import Transaction from "../src/transaction";
import { Referral } from "../src/types/saasquatch";

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
      expect(transaction.analytics).toStrictEqual([
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
        false
      );

      expect(transaction.analytics).toStrictEqual([
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
      expect(transaction.mutations).toStrictEqual([
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
      expect(transaction.mutations).toStrictEqual([
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
      expect(transaction.mutations).toStrictEqual([
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
      expect(transaction.mutations).toStrictEqual([
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
      expect(transaction.mutations).toStrictEqual([
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
      expect(transaction.mutations).toStrictEqual([
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

      expect(transaction.mutations.length).toBe(2);

      const [rewardMutation, emailMutation] = transaction.mutations;
      expect(rewardMutation.type).toBe("CREATE_REWARD");

      const mut = rewardMutation.data as RewardData;

      expect(mut.user).toStrictEqual({
        id: "referrerID",
        accountId: "referrerACCOUNTID",
      });
      expect(mut.key).toBe(rewardKey);
      expect(mut.user).toStrictEqual({
        id: "referrerID",
        accountId: "referrerACCOUNTID",
      });
      expect(emailMutation).toStrictEqual({
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

      expect(transaction.mutations.length).toBe(2);

      const [rewardMutation, emailMutation] = transaction.mutations;
      expect(rewardMutation.type).toBe("CREATE_REWARD");

      const mut = rewardMutation.data as RewardData;

      expect(mut.user).toStrictEqual({
        id: "referrerID",
        accountId: "referrerACCOUNTID",
      });
      expect(mut.key).toBe(rewardKey);
      expect(mut.referralId).toBe(referralId);
      expect(mut.status).toBe(undefined);
      expect(mut.rewardSource).toBe(undefined);
      expect(mut.userEvent).toBe(undefined);
      expect(mut.overrideProperties).toStrictEqual({
        dateExpires: ts,
      });
      expect(mut.dynamicProperties).toStrictEqual({
        type: "CREDIT",
        assignedCredit: 2000,
        unit: "CAD",
      });
      expect(mut.user).toStrictEqual({
        id: "referrerID",
        accountId: "referrerACCOUNTID",
      });

      expect(emailMutation).toStrictEqual({
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
      expect(transaction.mutations).toStrictEqual([
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

      expect(transaction.toJson()).toStrictEqual({
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
