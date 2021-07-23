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
  type: "CREDIT",
  value: 19,
  unit: "POINT",
  name: "test",
  dateGiven: 1626989215831,
  dateScheduledFor: 1627162015831,
  dateExpires: 1627162015831,
  dateCancelled: 134400,
  fuelTankCode: "ABC",
  fuelTankType: "Code",
  currency: "null",
  prettyValue: "19 Points",
  statuses: ["AVAILABLE"],
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

const nullExpiresIn = {
  dateExpires: null,
};

const nullScheduledFor = {
  dateScheduledFor: null,
};

const nullFuelTank = {
  fuelTankCode: null,
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
  statuses: ["AVAILABLE", "PENDING"],
};
const cancelledReward = {
  statuses: ["PENDING", "CANCELLED"],
};
const expiredReward = {
  statuses: ["EXPIRED", "AVAILABLE"],
};
const redeemedReward = {
  statuses: ["AVAILABLE", "EXPIRED", "REDEEMED"],
};
const availableReward = {
  statuses: ["AVAILABLE"],
};

const zeroRewards = [];

const oneReward = [{ ...baseReward, ...availableReward }];

const twoRewards = [
  { ...baseReward, ...discountReward, ...pendingReward },
  { ...baseReward, ...creditReward },
];

const threeRewards = [
  { ...baseReward, ...fuelTankReward },
  { ...baseReward, ...fuelTankReward, ...expiredReward, ...nullExpiresIn },
  { ...baseReward, ...pendingReward, ...nullFuelTank },
];

const fiveRewards = [
  { ...baseReward, ...fuelTankReward },
  { ...baseReward, ...integrationReward },
  { ...baseReward, ...pendingReward },
  { ...baseReward, ...cancelledReward, ...nullExpiresIn, ...nullFuelTank },
  { ...baseReward, ...expiredReward, ...nullExpiresIn, ...nullFuelTank },
];

const eightRewards = [
  { ...baseReward, ...redeemedReward, ...nullFuelTank },
  { ...baseReward, ...availableReward },
  { ...baseReward, ...pendingReward },
  { ...baseReward, ...cancelledReward },
  { ...baseReward, ...expiredReward, ...nullExpiresIn },
  { ...baseReward, ...pendingReward },
  { ...baseReward, ...cancelledReward },
  { ...baseReward, ...expiredReward, ...nullExpiresIn },
];

const tenRewards = [
  { ...baseReward, ...integrationReward },
  { ...baseReward, ...redeemedReward },
  { ...baseReward, ...availableReward },
  { ...baseReward, ...cancelledReward, ...nullExpiresIn },
  { ...baseReward, ...expiredReward, ...nullExpiresIn },
  { ...baseReward, ...pendingReward },
  { ...baseReward, ...discountReward },
  { ...baseReward, ...fuelTankReward },
  { ...baseReward, ...cancelledReward, ...nullExpiresIn },
  { ...baseReward, ...creditReward },
];

export const PendingNoUnpend = () => {
  return (
    <sqm-referral-table-rewards-cell
      rewards={[{ ...baseReward, ...pendingReward, ...nullScheduledFor }]}
    ></sqm-referral-table-rewards-cell>
  );
};

export const PendingWithUnpend = () => {
  return (
    <sqm-referral-table-rewards-cell
      rewards={[{ ...baseReward, ...pendingReward }]}
    ></sqm-referral-table-rewards-cell>
  );
};

export const AvailableNoExpiry = () => {
  return (
    <sqm-referral-table-rewards-cell
      rewards={[{ ...baseReward, ...availableReward, ...nullExpiresIn }]}
    ></sqm-referral-table-rewards-cell>
  );
};

export const AvailableWithExpiry = () => {
  return (
    <sqm-referral-table-rewards-cell
      rewards={[{ ...baseReward, ...availableReward }]}
    ></sqm-referral-table-rewards-cell>
  );
};

export const Redeemed = () => {
  return (
    <sqm-referral-table-rewards-cell
      rewards={[{ ...baseReward, ...redeemedReward }]}
    ></sqm-referral-table-rewards-cell>
  );
};

export const Cancelled = () => {
  return (
    <sqm-referral-table-rewards-cell
      rewards={[{ ...baseReward, ...cancelledReward }]}
    ></sqm-referral-table-rewards-cell>
  );
};

export const Expired = () => {
  return (
    <sqm-referral-table-rewards-cell
      rewards={[{ ...baseReward, ...expiredReward }]}
    ></sqm-referral-table-rewards-cell>
  );
};

export const EmptyCell = () => {
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
