import { DateTime } from "luxon";

export default (count = 4) => {
  const data = [...Array(count)].map(() => getMockData());
  return {
    totalCount: 6,
    count,
    referredByReferral: {
      dateConverted: null,
      dateReferralStarted: 1643912659850,
      referrerUser: {
        firstName: "John",
        lastName: "Snow",
        rewards: [],
      },
    },
    data,
  };
};

const statuses = [
  ["AVAILABLE"],
  ["PENDING"],
  ["CANCELLED"],
  ["EXPIRED"],
  ["REDEEMED"],
];

const paypalStatuses = [
  "FAILED",
  "UNCLAIMED",
  "ONHOLD",
  "REFUNDED",
  "RETURNED",
  "REVERSED",
  "BLOCKED",
];

const firstNames = [
  "Rajesh",
  "Pierre",
  "Ji-Ho",
  "Chinua",
  "Charleston",
  "Sally",
  "Gael",
  "Jill",
  "Jane",
  "Khadija",
];
const lastNames = [
  "Smith",
  "Parker",
  "Kent",
  "Chew",
  "Stark",
  "Banner",
  "Jones",
  "Odinson",
  "Pym",
  "Rogers",
];

function getPaypalStatus(datePaidOut) {
  if (datePaidOut) return "SUCCESS";

  const randomIndex = Math.floor(Math.random() * 6);

  const randomStatus = paypalStatuses.find(
    (_status, index) => index === randomIndex
  );

  return randomStatus;
}

const getPaypalMeta = () => {
  const datePaidOut = Math.floor(Math.random() * 10) >= 5 ? 123456789 : null;
  const dateLastAttempted =
    Math.floor(Math.random() * 10) >= 5 ? 123456789 : null;

  const status = !!datePaidOut
    ? "SUCCESS"
    : Math.floor(Math.random() * 10) >= 8
    ? "ERROR"
    : "SUCCESS";

  const paypalStatus = getPaypalStatus(datePaidOut);

  return {
    status,
    customMeta: {
      datePaidOut,
      dateLastAttempted,
      dateFirstAttempted: dateLastAttempted,
      rawPayPalInfo: {
        transaction_status: paypalStatus,
      },
    },
  };
};

const inProgressMeta = {
  status: "IN_PROGRESS",
  integration: {
    name: "PayPal Payouts Integration",
  },
  message: null,
  customMeta: {
    dateFirstAttempted: 1668108111653,
    dateLastUpdated: 1668108111653,
    dateLastAttempted: 1668108111653,
    errorReason: null,
    rawPayPalInfo: null,
    attempts: 1,
  },
};

const unclaimedMeta = {
  status: "WARN",
  integration: null,
  message: null,
  customMeta: {
    dateFirstAttempted: 1667932903241,
    dateLastUpdated: 1667932919027,
    dateLastAttempted: 1667932903241,
    rawPayPalInfo: {
      transaction_status: "UNCLAIMED",
    },
    attempts: 1,
  },
};

const getMockData = () => {
  return {
    id: "5cae6b0fcc540e209db45b53",
    referredUser: {
      id: "5cae6b0ce4b0d81c67b78e82",
      accountId: "SPX1MZBIPTFL3E1H",
      firstName: firstNames[Math.floor(Math.random() * firstNames.length)],
      lastName: lastNames[Math.floor(Math.random() * lastNames.length)],
      email: "example.uexwltgh@mailosaur.io",
      programGoals: [],
    },
    shareLinkUsed: null,
    referralCodeUsed: "JIMBONEUTRON2",
    moderationStatus: "PENDING",
    dateConverted:
      Math.floor(Math.random() * 10) >= 5
        ? DateTime.now().minus({ days: 6 }).toMillis()
        : null,
    dateFraudChecksCompleted: null,
    dateModerated: 1558730033306,
    dateModified: 1554934543447,
    dateReferralEnded: null,
    dateReferralPaid: null,
    dateReferralStarted: DateTime.now().minus({ days: 8 }).toMillis(),
    dateUserModified: null,
    programId: "sam-partner-test-2",
    program: {
      id: "sam-partner-test-2",
      name: "Partner Program 2.0",
    },
    rewards:
      Math.floor(Math.random() * 10) >= 5
        ? [
            {
              id: "5cae6b16cc540e209db45cfa",
              type: "CREDIT",
              value: 1,
              unit: "POINT",
              name: "Partner Reward",
              dateGiven: 1554934550726,
              dateExpires: null,
              dateCancelled: null,
              dateRedeemed: 1637004373582,
              dateScheduledFor: null,
              fuelTankCode: null,
              fuelTankType: null,
              currency: null,
              prettyValue: "1 Point",
              statuses: statuses[Math.floor(Math.random() * statuses.length)],
              globalRewardKey: null,
              programRewardKey: "partnerReward",
              meta: {
                ...getPaypalMeta(),
              },
              rewardRedemptionTransactions: {
                data: [
                  {
                    exchangedRewards: {
                      data: [
                        {
                          prettyValue: "CAD10.00 Visa* Prepaid Card CAD",
                          type: "INTEGRATION",
                          fuelTankCode: null,
                          globalRewardKey: "gc1",
                        },
                      ],
                    },
                  },
                ],
              },
            },
          ]
        : [],
    childNodes: {
      data: [
        {
          data: {
            id: "5cae6b16cc540e209db45cb3",
            statuses: statuses[Math.floor(Math.random() * statuses.length)],
            type: "PCT_DISCOUNT",
            value: 50,
          },
          depth: 1,
        },
        {
          data: {
            id: "5cae6b16cc540e209db45cfa",
            statuses: statuses[Math.floor(Math.random() * statuses.length)],
            type: "CREDIT",
            value: 1,
          },
          depth: 1,
        },
      ],
    },
  };
};
