import { h } from "@stencil/core";
import column from "./columns/referral-table-column.feature";
import date from "./columns/referral-table-date-column.feature";
import reward from "./columns/referral-table-rewards-column.feature";
import status from "./columns/referral-table-status-column.feature";
import user from "./columns/referral-table-user-column.feature";

const scenario = column + date + reward + status + user;

export default {
  title: "Components/Referral Table Cell",
  parameters: {
    scenario,
  },
};

export const TableCell = () => {
  return (
    <sqm-referral-table-cell innerTemplate="Table Cell Text"></sqm-referral-table-cell>
  );
};

export const TableUserCell = () => {
  return (
    <sqm-referral-table-user-cell name="Table User Cell Text"></sqm-referral-table-user-cell>
  );
};

export const EmptyCell = () => (
  <sqm-sqm-referral-table-cell>-</sqm-sqm-referral-table-cell>
);

export const StatusCell = () => {
  return (
    <div>
      <sqm-referral-table-status-cell
        statusText="Complete"
        converted={true}
      ></sqm-referral-table-status-cell>
      <sqm-referral-table-status-cell
        statusText="In Progress"
        converted={false}
      ></sqm-referral-table-status-cell>
    </div>
  );
};

export const DateCell = () => {
  return (
    <sqm-referral-table-date-cell
      date={800000000000}
    ></sqm-referral-table-date-cell>
  );
};

/* 
  TODO'S: 
  - Add more rewards
  - Empty and Loading states for tables
  - Build rewards for every type of reward
*/

const rewardsData: Reward = {
  id: "123",
  type: "CREDIT",
  value: 19,
  unit: "POINT",
  name: "test",
  dateGiven: 1627427794891,
  dateScheduledFor: 1628146800000,
  dateExpires: 1629010800000,
  dateCancelled: 134400,
  dateRedeemed: 0,
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

const rewards = [rewardsData];

export const RewardsCell = () => {
  return (
    <sqm-referral-table-rewards-cell
      rewards={rewards}
      statusText="{status, select, AVAILABLE {Available} CANCELLED {Cancelled} PENDING {Pending} EXPIRED {Expired} REDEEMED {Redeemed} other {Not available} }"
      statusLongText="{status, select, AVAILABLE {Reward expiring on} CANCELLED {Reward cancelled on} PENDING {Available on} EXPIRED {Reward expired on} REDEEMED {Redeemed} other {Not available} }"
      fuelTankText="Your code is"
      rewardReceivedText="Reward received on"
      expiringText="Expiring in"
      pendingForText="{status} for {date}"
    ></sqm-referral-table-rewards-cell>
  );
};
