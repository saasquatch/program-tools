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
    dateConverted: Math.floor(Math.random() * 10) >= 5 ? 1554934550726 : null,
    dateFraudChecksCompleted: null,
    dateModerated: 1558730033306,
    dateModified: 1554934543447,
    dateReferralEnded: null,
    dateReferralPaid: null,
    dateReferralStarted: 1554934543447,
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
