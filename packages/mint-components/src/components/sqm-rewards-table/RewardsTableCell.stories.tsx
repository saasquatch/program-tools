import { h } from "@stencil/core";

export default {
  title: "Components/Rewards Table Cell",
};

const rewardsData: Reward = {
  id: "61c100117a82a376d8804166",
  type: "CREDIT",
  value: 19,
  unit: "TESTUNIT",
  name: null,
  dateGiven: 1640038417468,
  dateExpires: null,
  dateCancelled: null,
  dateRedeemed: null,
  dateScheduledFor: null,
  fuelTankCode: null,
  fuelTankType: null,
  currency: null,
  prettyValue: "19 Points",
  prettyValueNumber: "19",
  prettyAvailableNumber: "19",
  prettyRedeemedNumber: "0",
  statuses: ["AVAILABLE"],
  globalRewardKey: null,
  rewardSource: "MANUAL",
  prettyRedeemedCredit: "0 Points",
  prettyAssignedCredit: "19 Points",
  prettyAvailableValue: "19 Points",
  exchangedRewardRedemptionTransaction: null,
  referral: null,
  rewardRedemptionTransactions: {
    data: null,
  },
};

const partial = {
  prettyAvailableValue: "10 Points",
  prettyRedeemedCredit: "9 Points",
  prettyRedeemedNumber: "9",
  dateRedeemed: 1640038417468,
};

const empty = {
  prettyAvailableValue: "0 Points",
  prettyRedeemedCredit: "19 Points",
  prettyRedeemedNumber: "19",
  dateRedeemed: 1640038417468,
};

const exchange = {
  exchangedRewardRedemptionTransaction: {
    id: "61c100117a82a376d88041196",
    creditRedeemed: 1,
    prettyRedeemedCredit: "1 Money",
    unit: "TESTUNIT",
    dateRedeemed: 1640038417173,
    redeemedRewards: null,
    exchangedRewards: null,
  },
};

const referral = {
	
}

export const RewardsCellFull = () => {
  return (
    <sqm-rewards-table-rewards-cell
      reward={{ ...rewardsData }}
    ></sqm-rewards-table-rewards-cell>
  );
};

export const RewardsCellPartial = () => {
  return (
    <sqm-rewards-table-rewards-cell
      reward={{ ...rewardsData, ...partial }}
    ></sqm-rewards-table-rewards-cell>
  );
};

export const RewardsCellEmpty = () => {
  return (
    <sqm-rewards-table-rewards-cell
      reward={{ ...rewardsData, ...empty }}
    ></sqm-rewards-table-rewards-cell>
  );
};

export const SourceCellText = () => {
  return (
    <sqm-rewards-table-source-cell
      reward={rewardsData}
    ></sqm-rewards-table-source-cell>
  );
};

export const SourceCellExchange = () => {
  return (
    <sqm-rewards-table-source-cell
      reward={{ ...rewardsData, ...exchange }}
    ></sqm-rewards-table-source-cell>
  );
};
export const SourceCellReferral = () => {
  return (
    <sqm-rewards-table-source-cell
      reward={{ ...rewardsData, ...exchange }}
    ></sqm-rewards-table-source-cell>
  );
};
export const SourceCellReferred = () => {
  return (
    <sqm-rewards-table-source-cell
      reward={{ ...rewardsData, ...exchange }}
    ></sqm-rewards-table-source-cell>
  );
};
export const StatusCell = () => {
  return (
    <sqm-rewards-table-status-cell
      statusText="Available"
      reward={rewardsData}
    ></sqm-rewards-table-status-cell>
  );
};

export const DateCell = () => {
  return (
    <sqm-rewards-table-date-cell
      date={1640038417468}
    ></sqm-rewards-table-date-cell>
  );
};

export const EmptyCell = () => {
  return <sqm-rewards-table-date-cell></sqm-rewards-table-date-cell>;
};
