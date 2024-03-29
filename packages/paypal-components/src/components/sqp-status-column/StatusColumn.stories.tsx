import { setUserIdentity } from "@saasquatch/component-boilerplate";
import { useState } from "@saasquatch/universal-hooks";
import { h } from "@stencil/core";
import {
  baseReward,
  failedPaypal,
  inProgressPaypal,
  nullExpiresIn,
  nullFuelTank,
  nullScheduledFor,
  transferredReward,
} from "../sqp-rewards-column/RewardData";
import mockRewardData from "./mockRewardData";
export default {
  title: "Components/Rewards Table Status Column",
  // parameters: {
  //   scenario,
  // },
};

export const Available = () => {
  return (
    <sqp-status-cell
      reward={{ ...baseReward }}
      column-title="Status"
      expiry-text="Expires on "
      status-text="{status, select, INPROGRESS {In Progress} TRANSFERRED {Transferred} FAILED {Payout Failed} AVAILABLE {Available} CANCELLED {Cancelled} PENDING {Pending} EXPIRED {Expired} REDEEMED {Redeemed} other {Not available} }"
      rewardPaidOutText="Sent via PayPal on"
      rewardPayoutInProgressText="PayPal payout processing started on"
      rewardPayoutFailedText="Payout last attempted on"
    ></sqp-status-cell>
  );
};

export const Transferred = () => {
  return (
    <sqp-status-cell
      reward={{
        ...baseReward,
        ...transferredReward,
        ...nullExpiresIn,
        ...nullScheduledFor,
        ...nullFuelTank,
      }}
      column-title="Status"
      expiry-text="Expires on "
      status-text="{status, select, INPROGRESS {In Progress} TRANSFERRED {Transferred} FAILED {Payout Failed} AVAILABLE {Available} CANCELLED {Cancelled} PENDING {Pending} EXPIRED {Expired} REDEEMED {Redeemed} other {Not available} }"
      rewardPaidOutText="Sent via PayPal on"
      rewardPayoutInProgressText="PayPal payout processing started on"
      rewardPayoutFailedText="Payout last attempted on"
    ></sqp-status-cell>
  );
};

export const InProgress = () => {
  return (
    <sqp-status-cell
      reward={{
        ...baseReward,
        meta: {
          status: "IN_PROGRESS",
          customMeta: {
            dateFirstAttempted: 1668559450249,
            dateLastUpdated: 1668559467180,
            dateLastAttempted: 1668559450249,
            rawPayPalInfo: {
              transaction_status: "PENDING",
            },
          },
        },
      }}
      column-title="Status"
      expiry-text="Expires on "
      status-text="{status, select, AVAILABLE {Available} CANCELLED {Cancelled} EXPIRED {Expired} REDEEMED {Redeemed} PENDING {Pending} SUCCESS {Paid out} FAILED {Failed} PAYPAL_PENDING {In progress} UNCLAIMED {Unclaimed} ONHOLD {In progress} REFUNDED {Refunded} RETURNED {Returned} REVERSED {Reversed} BLOCKED {Blocked} DENIED {Denied} other {Not available}  }"
      rewardPaidOutText="Sent via PayPal on"
      rewardPayoutInProgressText="PayPal payout processing started on"
      rewardPayoutFailedText="Payout last attempted on"
    ></sqp-status-cell>
  );
};

export const Failed = () => {
  return (
    <sqp-status-cell
      reward={{
        ...baseReward,
        ...failedPaypal,
      }}
      column-title="Status"
      expiry-text="Expires on "
      status-text="{status, select, INPROGRESS {In Progress} TRANSFERRED {Transferred} FAILED {Payout Failed} AVAILABLE {Available} CANCELLED {Cancelled} PENDING {Pending} EXPIRED {Expired} REDEEMED {Redeemed} other {Not available} }"
      rewardPaidOutText="Sent via PayPal on"
      rewardPayoutInProgressText="PayPal payout processing started on"
      rewardPayoutFailedText="Payout last attempted on"
    ></sqp-status-cell>
  );
};

export const FullRewardsTable = () => (
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
    <sqp-status-column
      column-title="Status"
      expiry-text="Expires on "
    ></sqp-status-column>
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

export const MockDataTable = () => {
  const [show, setShow] = useState(true);

  setUserIdentity(undefined);
  window.SquatchPortal = undefined;

  async function refreshTable() {
    setShow(false);
    await new Promise((resolve) => setTimeout(resolve, 100));
    setShow(true);
  }
  return (
    <div>
      <button onClick={refreshTable}>refresh</button>
      {show ? (
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
          <sqp-status-column
            column-title="Status"
            expiry-text="Expires on "
          ></sqp-status-column>
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
      ) : (
        ""
      )}
    </div>
  );
};
