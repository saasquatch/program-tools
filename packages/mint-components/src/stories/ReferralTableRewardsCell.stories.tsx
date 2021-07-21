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

// const pendingReward = {
//   statuses: ["PENDING"],
// };
// const cancelledReward = {
//   statuses: ["CANCELLED"],
// };
// const expiredReward = {
//   statuses: ["EXPIRED"],
// };
// const redeemedReward = {
//   statuses: ["REDEEMED"],
// };
const availableReward = {
  statuses: ["AVAILABLE"],
};

// redeemed > cancelled > expired > pending > available

const discountPrettyValue={
  prettyValue:"20%"
}

const rewards = [{ ...baseReward, ...availableReward }];

export const RewardsCell = () => {
  console.log(rewards);
  return (
    <sqm-referral-table-rewards-cell
      rewards={rewards}
    ></sqm-referral-table-rewards-cell>
  );
};
