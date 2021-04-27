import {
  nonRewardEmailQueryForReferralPrograms,
  rewardEmailQuery,
  rewardEmailQueryForNonReferralPrograms,
} from "../src/queries";
import Transaction from "../src/transaction";

describe("Transaction class", () => {
  const messageType: "PROGRAM_TRIGGER" = "PROGRAM_TRIGGER";
  const testContext = {
    body: {
      messageType,
      program: {
        id: "testProgramId",
      },
      ids: ["123", "345", "456"],
      tenant: {
        settings: {
          suspectedFraudModerationState: "OK",
        },
      },
      activeTrigger: {
        type: "AFTER_USER_EVENT_PROCESSED",
        time: 1619483037813,
        user: {
          id: "reffererID",
          accountId: "reffererACCOUNTID",
          customFields: {
            test: 123,
          },
        },
        events: [
          {
            key: "subscription",
            id: 1,
            dateTriggered: 1619483037800,
            fields: {
              key: "value1",
            },
          },
        ],
      },
    },
  };
  const testUser = {
    id: "reffererID",
    accountId: "reffererACCOUNTID",
    referredByReferral: {
      id: "referralID",
    },
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
              id: "reffererID",
              accountId: "reffererACCOUNTID",
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
              id: "reffererID",
              accountId: "reffererACCOUNTID",
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
              id: "reffererID",
              accountId: "reffererACCOUNTID",
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
      expect(transaction.mutations).toStrictEqual([
        {
          type: "CREATE_REWARD",
          data: {
            user: {
              id: "reffererID",
              accountId: "reffererACCOUNTID",
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
    test("sendEmail mutation is pushed to mutations", () => {
      transaction.generateSimpleEmail({ emailKey, user: testUser, rewardId });
      expect(transaction.mutations).toStrictEqual([
        {
          type: "SEND_EMAIL",
          data: {
            user: {
              id: "reffererID",
              accountId: "reffererACCOUNTID",
            },
            key: emailKey,
            rewardId: rewardId,
            queryVariables: {
              userId: "reffererID",
              accountId: "reffererACCOUNTID",
              rewardId: rewardId,
              programId: "testProgramId",
            },
            query: rewardEmailQueryForNonReferralPrograms,
          },
        },
      ]);
    });

    test("throws if no rewardId", () => {
      expect(() => {
        transaction.generateSimpleEmail({
          emailKey,
          user: testUser,
          rewardId: undefined,
        });
      }).toThrow("rewardId must be provided before email sent.");
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
              id: "reffererID",
              accountId: "reffererACCOUNTID",
            },
            key: emailKey,
            rewardId: rewardId,
            queryVariables: {
              userId: "reffererID",
              accountId: "reffererACCOUNTID",
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
              id: "reffererID",
              accountId: "reffererACCOUNTID",
            },
            key: emailKey,
            rewardId: undefined,
            queryVariables: {
              userId: "reffererID",
              accountId: "reffererACCOUNTID",
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
      expect(rewardMutation.data.user).toStrictEqual({
        id: "reffererID",
        accountId: "reffererACCOUNTID",
      });
      expect(rewardMutation.data.key).toBe(rewardKey);
      expect(rewardMutation.data.user).toStrictEqual({
        id: "reffererID",
        accountId: "reffererACCOUNTID",
      });
      expect(emailMutation).toStrictEqual({
        type: "SEND_EMAIL",
        data: {
          user: {
            id: "reffererID",
            accountId: "reffererACCOUNTID",
          },
          key: emailKey,
          rewardId: rewardMutation.data.rewardId,
          queryVariables: {
            userId: "reffererID",
            accountId: "reffererACCOUNTID",
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

      expect(transaction.mutations.length).toBe(2);

      const [rewardMutation, emailMutation] = transaction.mutations;
      expect(rewardMutation.type).toBe("CREATE_REWARD");
      expect(rewardMutation.data.user).toStrictEqual({
        id: "reffererID",
        accountId: "reffererACCOUNTID",
      });
      expect(rewardMutation.data.key).toBe(rewardKey);
      expect(rewardMutation.data.referralId).toBe(referralId);
      expect(rewardMutation.data.status).toBe(undefined);
      expect(rewardMutation.data.rewardSource).toBe(undefined);
      expect(rewardMutation.data.userEvent).toBe(undefined);
      expect(rewardMutation.data.overrideProperties).toStrictEqual({
        dateExpires: ts,
      });
      expect(rewardMutation.data.dynamicProperties).toStrictEqual({
        type: "testReward",
        assignedCredit: 2000,
        unit: "CAD",
      });
      expect(rewardMutation.data.user).toStrictEqual({
        id: "reffererID",
        accountId: "reffererACCOUNTID",
      });

      expect(emailMutation).toStrictEqual({
        type: "SEND_EMAIL",
        data: {
          user: {
            id: "reffererID",
            accountId: "reffererACCOUNTID",
          },
          key: emailKey,
          rewardId: rewardMutation.data.rewardId,
          queryVariables: {
            userId: "reffererID",
            accountId: "reffererACCOUNTID",
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
              id: "reffererID",
              accountId: "reffererACCOUNTID",
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
                id: "reffererID",
                accountId: "reffererACCOUNTID",
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
