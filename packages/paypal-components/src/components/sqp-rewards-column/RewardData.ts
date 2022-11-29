import { DateTime } from "luxon";

const getPaypalMeta = () => {
  const datePaidOut = Math.floor(Math.random() * 10) >= 5 ? 123456789 : null;
  const dateLastAttempted =
    Math.floor(Math.random() * 10) >= 5 ? 123456789 : null;

  const status = !!datePaidOut
    ? "SUCCESS"
    : Math.floor(Math.random() * 10) >= 8
    ? "ERROR"
    : "SUCCESS";

  return {
    status,
    customMeta: {
      datePaidOut,
      dateLastAttempted,
      dateFirstAttempted: dateLastAttempted,
    },
  };
};

export const baseReward: Reward = {
  id: "123",
  type: "CREDIT",
  value: 19,
  unit: "POINT",
  name: "test",
  dateGiven: 1627427794891,
  dateScheduledFor: getDays(),
  dateExpires: 0,
  dateCancelled: 0,
  dateRedeemed: 0,
  fuelTankCode: "ABC",
  fuelTankType: "Code",
  currency: "null",
  prettyValue: "19 Points",
  statuses: ["AVAILABLE"],
  meta: {
    integration: {
      name: "PayPal",
    },
    status: "SUCCESS",
    customMeta: {
      datePaidOut: null,
      dateLastAttempted: null,
      dateFirstAttempted: null,
    },
  },
  globalRewardKey: "Key",
  rewardRedemptionTransactions: {
    data: [
      {
        exchangedRewards: {
          data: [
            {
              prettyValue: "19 Points",
              type: "CREDIT",
              fuelTankCode: "ABC",
              globalRewardKey: "Key",
            },
          ],
        },
      },
    ],
  },
};

export const nullExpiresIn = {
  dateExpires: null,
};

export const nullScheduledFor = {
  dateScheduledFor: null,
};

export const nullFuelTank = {
  fuelTankCode: null,
};

// Reward Type Cases
export const discountReward = {
  type: "PCT_DISCOUNT",
};

export const creditReward = {
  type: "CREDIT",
};

export const fuelTankReward = {
  type: "FUELTANK",
};

export const integrationReward = {
  type: "INTEGRATION",
};

// Reward Status Cases
export const pendingReward = {
  statuses: ["AVAILABLE", "PENDING"],
};
export const cancelledReward = {
  statuses: ["PENDING", "CANCELLED"],
  dateCancelled: 1626850800000,
};
export const expiredReward = {
  statuses: ["EXPIRED", "AVAILABLE"],
  dateExpires: 1626850800000,
};
export const redeemedReward = {
  statuses: ["AVAILABLE", "EXPIRED", "REDEEMED"],
};
export const availableReward = {
  statuses: ["AVAILABLE"],
};

export const transferredReward = {
  statuses: ["REDEEMED"],
  meta: {
    status: "SUCCESS",
    customMeta: {
      datePaidOut: 1627427794891,
      dateLastAttempted: 1627427794891,
      dateFirstAttempted: 1627427794891,
    },
  },
};
export const failedPaypal = {
  meta: {
    status: "ERROR",
    customMeta: {
      datePaidOut: null,
      dateLastAttempted: 1627427794891,
      dateFirstAttempted: 1627427794891,
    },
  },
};

export const inProgressPaypal = {
  meta: {
    customMeta: {
      datePaidOut: null,
      dateLastAttempted: 1627427794891,
      dateFirstAttempted: 1627427794891,
    },
  },
};
export const zeroRewards = [];

export const oneReward = [{ ...baseReward, ...availableReward }];

export const twoRewards = [
  { ...baseReward, ...discountReward, ...pendingReward },
  { ...baseReward, ...creditReward },
];

export const threeRewards = [
  { ...baseReward, ...fuelTankReward, ...nullExpiresIn },
  { ...baseReward, ...fuelTankReward, ...expiredReward },
  { ...baseReward, ...pendingReward, ...nullFuelTank },
];

export const fiveRewards = [
  { ...baseReward, ...fuelTankReward },
  { ...baseReward, ...integrationReward },
  { ...baseReward, ...pendingReward },
  { ...baseReward, ...cancelledReward, ...nullExpiresIn, ...nullFuelTank },
  { ...baseReward, ...expiredReward, ...nullFuelTank },
];

export const eightRewards = [
  { ...baseReward, ...redeemedReward, ...nullFuelTank },
  { ...baseReward, ...availableReward, ...nullExpiresIn },
  { ...baseReward, ...pendingReward },
  { ...baseReward, ...cancelledReward },
  { ...baseReward, ...expiredReward },
  { ...baseReward, ...pendingReward, ...nullExpiresIn, ...nullScheduledFor },
  { ...baseReward, ...cancelledReward },
  { ...baseReward, ...expiredReward },
];

export const tenRewards = [
  { ...baseReward, ...integrationReward },
  { ...baseReward, ...redeemedReward },
  { ...baseReward, ...availableReward },
  { ...baseReward, ...cancelledReward, ...nullExpiresIn },
  { ...baseReward, ...expiredReward },
  { ...baseReward, ...pendingReward },
  { ...baseReward, ...discountReward },
  { ...baseReward, ...fuelTankReward },
  { ...baseReward, ...cancelledReward, ...nullExpiresIn },
  { ...baseReward, ...creditReward },
];

// Helper Functions
function getSeconds() {
  return DateTime.now().toMillis() + 10000;
}

function getMinutes() {
  return DateTime.now().toMillis() + 400000;
}

function getHours() {
  return DateTime.now().toMillis() + 9000000;
}

function getDays() {
  return DateTime.now().toMillis() + 600000000;
}

function getMonths() {
  return DateTime.now().toMillis() + 10000000000;
}

function getYears() {
  return DateTime.now().toMillis() + 200000000000;
}
