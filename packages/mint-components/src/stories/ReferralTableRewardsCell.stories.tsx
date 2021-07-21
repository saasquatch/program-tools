import { h } from "@stencil/core";

export default {
  title: "Referral Table Rewards Cell",
};

/* 
  TODO'S: 
  - Add more rewards
  - Empty and Loading states for tables
  - Build rewards for every type of reward
*/

const baseReward: Reward = {
  id: "123",
  type: "reward",
  value: 100,
  unit: "test",
  name: "test",
  dateGiven: 100000,
  dateExpires: 10000000,
  dateCancelled: 134400,
  fuelTankCode: "ABC",
  fuelTankType: "Code",
  currency: "CAD",
  prettyValue: "$200",
  statuses: ["Status1"],
  globalRewardKey: "Key",
  rewardRedemptionTransactions: {
    data: [
      {
        exchangedRewards: {
          data: [
            {
              prettyValue: "$100",
              type: "Code",
              fuelTankCode: "ABC",
              globalRewardKey: "Key",
            },
          ],
        },
      },
    ],
  },
};

// Reward Type Cases
const discountReward = {
  type: "PCT_DISCOUNT",
};

const creditReward = {
  type: "CREDIT",
};

const fuelTankReward = {
  type: "FUELTANK",
};

const integrationReward = {
  type: "INTEGRATION",
};

// Reward Status Cases
const pendingReward = {
  statuses: ["PENDING"],
};
const cancelledReward = {
  statuses: ["CANCELLED"],
};
const expiredReward = {
  statuses: ["EXPIRED"],
};
const redeemedReward = {
  statuses: ["REDEEMED"],
};
const availableReward = {
  statuses: ["AVAILABLE"],
};

const zeroRewards = [];

const oneReward = [{ ...baseReward, ...availableReward }];

const twoRewards = [
  { ...baseReward, ...discountReward },
  { ...baseReward, ...creditReward },
];

const threeRewards = [
  { ...baseReward, ...fuelTankReward },
  { ...baseReward, ...fuelTankReward },
  { ...baseReward, ...pendingReward },
];

const fiveRewards = [
  { ...baseReward, ...fuelTankReward },
  { ...baseReward, ...integrationReward },
  { ...baseReward, ...pendingReward },
  { ...baseReward, ...cancelledReward },
  { ...baseReward, ...expiredReward },
];

const eightRewards = [
  { ...baseReward, ...redeemedReward },
  { ...baseReward, ...availableReward },
  { ...baseReward, ...pendingReward },
  { ...baseReward, ...cancelledReward },
  { ...baseReward, ...expiredReward },
  { ...baseReward, ...pendingReward },
  { ...baseReward, ...cancelledReward },
  { ...baseReward, ...expiredReward },
];

const tenRewards = [
  { ...baseReward, ...integrationReward },
  { ...baseReward, ...redeemedReward },
  { ...baseReward, ...availableReward },
  { ...baseReward, ...cancelledReward },
  { ...baseReward, ...expiredReward },
  { ...baseReward, ...pendingReward },
  { ...baseReward, ...discountReward },
  { ...baseReward, ...fuelTankReward },
  { ...baseReward, ...cancelledReward },
  { ...baseReward, ...creditReward },
];

export const zeroRewardsCell = () => {
  return (
    <sqm-referral-table-rewards-cell
      rewards={zeroRewards}
    ></sqm-referral-table-rewards-cell>
  );
};

export const oneRewardCell = () => {
  return (
    <sqm-referral-table-rewards-cell
      rewards={oneReward}
    ></sqm-referral-table-rewards-cell>
  );
};

export const twoRewardsCell = () => {
  console.log(twoRewards);
  return (
    <sqm-referral-table-rewards-cell
      rewards={twoRewards}
    ></sqm-referral-table-rewards-cell>
  );
};

export const threeRewardsCell = () => {
  console.log(threeRewards);
  return (
    <sqm-referral-table-rewards-cell
      rewards={threeRewards}
    ></sqm-referral-table-rewards-cell>
  );
};

export const fiveRewardsCell = () => {
  console.log(fiveRewards);
  return (
    <sqm-referral-table-rewards-cell
      rewards={fiveRewards}
    ></sqm-referral-table-rewards-cell>
  );
};

export const eightRewardsCell = () => {
  console.log(eightRewards);
  return (
    <sqm-referral-table-rewards-cell
      rewards={eightRewards}
    ></sqm-referral-table-rewards-cell>
  );
};

export const tenRewardsCell = () => {
  console.log(tenRewards);
  return (
    <sqm-referral-table-rewards-cell
      rewards={tenRewards}
    ></sqm-referral-table-rewards-cell>
  );
};
