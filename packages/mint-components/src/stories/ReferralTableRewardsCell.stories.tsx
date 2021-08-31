import { h } from "@stencil/core";

export default {
  title: "Referral Table Rewards Cell",
};

const baseReward: Reward = {
  id: "123",
  type: "CREDIT",
  value: 19,
  unit: "POINT",
  name: "test",
  dateGiven: 1627427794891,
  dateScheduledFor: 1628146800000,
  dateExpires: 1629010800000,
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
  dateCancelled: 1626850800000,
};
const expiredReward = {
  statuses: ["EXPIRED", "AVAILABLE"],
  dateExpires: 1626850800000,
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
  { ...baseReward, ...fuelTankReward, ...nullExpiresIn },
  { ...baseReward, ...fuelTankReward, ...expiredReward },
  { ...baseReward, ...pendingReward, ...nullFuelTank },
];

const fiveRewards = [
  { ...baseReward, ...fuelTankReward },
  { ...baseReward, ...integrationReward },
  { ...baseReward, ...pendingReward },
  { ...baseReward, ...cancelledReward, ...nullExpiresIn, ...nullFuelTank },
  { ...baseReward, ...expiredReward, ...nullFuelTank },
];

const eightRewards = [
  { ...baseReward, ...redeemedReward, ...nullFuelTank },
  { ...baseReward, ...availableReward, ...nullExpiresIn },
  { ...baseReward, ...pendingReward },
  { ...baseReward, ...cancelledReward },
  { ...baseReward, ...expiredReward },
  { ...baseReward, ...pendingReward, ...nullExpiresIn, ...nullScheduledFor },
  { ...baseReward, ...cancelledReward },
  { ...baseReward, ...expiredReward },
];

const tenRewards = [
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
  return (
    <sqm-referral-table-rewards-cell
      rewards={twoRewards}
    ></sqm-referral-table-rewards-cell>
  );
};

export const threeRewardsCell = () => {
  return (
    <sqm-referral-table-rewards-cell
      rewards={threeRewards}
    ></sqm-referral-table-rewards-cell>
  );
};

export const fiveRewardsCell = () => {
  return (
    <sqm-referral-table-rewards-cell
      rewards={fiveRewards}
    ></sqm-referral-table-rewards-cell>
  );
};

export const eightRewardsCell = () => {
  return (
    <sqm-referral-table-rewards-cell
      rewards={eightRewards}
    ></sqm-referral-table-rewards-cell>
  );
};

export const tenRewardsCell = () => {
  return (
    <sqm-referral-table-rewards-cell
      rewards={tenRewards}
    ></sqm-referral-table-rewards-cell>
  );
};

export const hideDetailsCell = () => {
  return (
    <sqm-referral-table-rewards-cell
      rewards={[{ ...baseReward, ...availableReward, ...nullExpiresIn }]}
      hide-details={true}
    ></sqm-referral-table-rewards-cell>
  );
};
