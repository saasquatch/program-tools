import { h } from "@stencil/core";

export default {
  title: "Components/Rewards Table Cell",
};

const rewardsData: Reward = {
  id: "61c100117a82a376d8804166",
  type: "CREDIT",
  value: 5,
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
  prettyValue: "5 Salmons",
  prettyValueNumber: "5",
  prettyAvailableNumber: "5",
  prettyRedeemedNumber: "0",
  statuses: ["AVAILABLE"],
  globalRewardKey: null,
  rewardSource: "MANUAL",
  prettyRedeemedCredit: "0 Salmons",
  prettyAssignedCredit: "5 Salmons",
  prettyAvailableValue: "5 Salmons",
  exchangedRewardRedemptionTransaction: {
    id: "61c100117a82a376d8804156",
    creditRedeemed: 5,
    prettyRedeemedCredit: "5 Points",
    unit: "POINT",
    dateRedeemed: 1640038417173,
    redeemedRewards: null,
    exchangedRewards: null,
  },
  referral: null,
  rewardRedemptionTransactions: {
    data: null,
  },
};

export const RewardsCell = () => {
  return (
    <sqm-rewards-table-rewards-cell
      reward={rewardsData}
    ></sqm-rewards-table-rewards-cell>
  );
};

export const SourceCell = () => {
  return (
    <sqm-rewards-table-source-cell
      reward={rewardsData}
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
