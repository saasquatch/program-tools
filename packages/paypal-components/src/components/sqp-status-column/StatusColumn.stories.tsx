import { h } from "@stencil/core";
import mockRewardData from "./mockRewardData";
export default {
  title: "Components/Rewards Table Status Column",
  // parameters: {
  //   scenario,
  // },
};

export const RewardsTable = () => (
  <sqm-rewards-table
    per-page="4"
    program-id
    hidden-columns="0"
    more-label="Next"
    prev-label="Prev"
    sm-breakpoint="599"
    md-breakpoint="799"
    demoData={{ mockData: mockRewardData(4) }}
  >
    <sqm-rewards-table-reward-column
      available-text="{availableAmount} remaining"
      column-title="Reward"
      copy-text="Copied!"
      redeemed-text="{redeemedAmount} redeemed"
    ></sqm-rewards-table-reward-column>
    <sqm-rewards-table-source-column
      anonymous-user="Anonymous User"
      column-title="Source"
      deleted-user="Deleted User"
      referral-text="{rewardSource, select, FRIEND_SIGNUP {Referral to} REFERRED {Referred by} other {}}"
      reward-exchange-text="Reward Exchange"
      reward-source-text="{rewardSource, select, MANUAL {Manual} AUTOMATED {{programName}} other {}}"
    ></sqm-rewards-table-source-column>
    <sqp-rewards-table-status-column
      column-title="Status"
      expiry-text="Expires on "
    ></sqp-rewards-table-status-column>
    <sqm-rewards-table-date-column
      column-title="Date received"
      date-shown="dateGiven"
    ></sqm-rewards-table-date-column>
    <sqm-empty
      slot="empty"
      empty-state-image="https://res.cloudinary.com/saasquatch/image/upload/v1644360953/squatch-assets/empty_reward2.png"
      empty-state-header="View your rewards"
      empty-state-text="Refer friends and complete tasks to view the details of your rewards"
    ></sqm-empty>
  </sqm-rewards-table>
);
