import { h } from "@stencil/core";
import mockReferralData from "./mockReferralData";
import {
  baseReward,
  availableReward,
  nullExpiresIn,
  transferredReward,
  cancelledReward,
  failedPaypal,
  pendingReward,
  nullScheduledFor,
  nullFuelTank,
} from "./RewardData";
export default {
  title: "Components/Referral Reward Column",
  // parameters: {
  //   scenario,
  // },
};

export const AvailableNoExpiry = () => {
  return (
    <sqp-rewards-cell
      rewards={[{ ...baseReward }]}
      statusText="{status, select, INPROGRESS {In Progress} TRANSFERRED {Transferred} FAILED {Failed} AVAILABLE {Available} CANCELLED {Cancelled} PENDING {Pending} EXPIRED {Expired} REDEEMED {Redeemed} other {Not available} }"
      statusLongText="{status, select, INPROGRESS {In Progress} TRANSFERRED {Transferred} FAILED {Failed} AVAILABLE {Reward expiring on} CANCELLED {Reward cancelled on} PENDING {Available on} EXPIRED {Reward expired on} other {Not available} }"
      fuelTankText="Your code is"
      rewardReceivedText="Reward received on"
      expiringText="Expiring in"
      pendingForText="{status} for {date}"
    ></sqp-rewards-cell>
  );
};

export const Transferred = () => {
  return (
    <sqp-rewards-cell
      rewards={[
        {
          ...baseReward,
          ...transferredReward,
          ...nullExpiresIn,
          ...nullScheduledFor,
          ...nullFuelTank,
        },
      ]}
      statusText="{status, select, INPROGRESS {In Progress} TRANSFERRED {Transferred} FAILED {Failed} AVAILABLE {Available} CANCELLED {Cancelled} PENDING {Pending} EXPIRED {Expired} REDEEMED {Redeemed} other {Not available} }"
      statusLongText="{status, select, INPROGRESS {In Progress} TRANSFERRED {Transferred} FAILED {Failed} AVAILABLE {Reward expiring on} CANCELLED {Reward cancelled on} PENDING {Available on} EXPIRED {Reward expired on} other {Not available} }"
      fuelTankText="Your code is"
      rewardReceivedText="Reward received on"
      expiringText="Expiring in"
      pendingForText="{status} for {date}"
    ></sqp-rewards-cell>
  );
};

export const Failed = () => {
  return (
    <sqp-rewards-cell
      rewards={[
        {
          id: "5cae6b16cc540e209db45cfa",
          type: "CREDIT",
          value: 1,
          unit: "POINT",
          name: "Partner Reward",
          dateGiven: 1554934550726,
          dateExpires: null,
          dateCancelled: null,
          dateRedeemed: 1637004373582,
          dateScheduledFor: null,
          fuelTankCode: null,
          fuelTankType: null,
          currency: null,
          prettyValue: "1 Point",
          statuses: ["REDEEMED"],
          globalRewardKey: null,
          meta: {
            integration: {
              name: "PayPal",
            },
            status: "ERROR",
            customMeta: {
              datePaidOut: null,
              dateLastAttempted: null,
              dateFirstAttempted: null,
            },
          },
          rewardRedemptionTransactions: {
            data: [
              {
                exchangedRewards: {
                  data: [
                    {
                      prettyValue: "CAD10.00 Visa* Prepaid Card CAD",
                      type: "INTEGRATION",
                      fuelTankCode: null,
                      globalRewardKey: "gc1",
                    },
                  ],
                },
              },
            ],
          },
        },
      ]}
      statusText="{status, select, INPROGRESS {In Progress} TRANSFERRED {Transferred} FAILED {Failed} AVAILABLE {Available} CANCELLED {Cancelled} PENDING {Pending} EXPIRED {Expired} REDEEMED {Redeemed} other {Not available} }"
      statusLongText="{status, select, INPROGRESS {In Progress} TRANSFERRED {Transferred} FAILED {Failed} AVAILABLE {Reward expiring on} CANCELLED {Reward cancelled on} PENDING {Available on} EXPIRED {Reward expired on} other {Not available} }"
      fuelTankText="Your code is"
      rewardReceivedText="Reward received on"
      expiringText="Expiring in"
      pendingForText="{status} for {date}"
    ></sqp-rewards-cell>
  );
};

export const FullReferralTable = () => (
  <sqm-referral-table
    per-page="4"
    hidden-columns="2"
    more-label="Next"
    prev-label="Prev"
    sm-breakpoint="599"
    md-breakpoint="799"
    demoData={{ mockData: mockReferralData(4) }}
  >
    <sqm-referral-table-user-column
      column-title="User"
      anonymous-user="Anonymous User"
      deleted-user="Deleted User"
    ></sqm-referral-table-user-column>
    <sqm-referral-table-status-column
      column-title="Referral status"
      converted-status-text="Converted"
      in-progress-status-text="In Progress"
    ></sqm-referral-table-status-column>
    <sqp-rewards-column
      column-title="Rewards"
      expiring-text="Expiring in"
      fuel-tank-text="Your code is"
      pending-for-text="{status} for {date}"
      reward-received-text="Reward received on"
    ></sqp-rewards-column>
    <sqm-referral-table-date-column
      column-title="Date referred"
      date-shown="dateReferralStarted"
    ></sqm-referral-table-date-column>
    <sqm-empty
      slot="empty"
      empty-state-image="https://res.cloudinary.com/saasquatch/image/upload/v1644000223/squatch-assets/empty_referral2.png"
      empty-state-header="View your referral details"
      empty-state-text="Refer a friend to view the status of your referrals and rewards earned"
    ></sqm-empty>
  </sqm-referral-table>
);
