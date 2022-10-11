import { h } from "@stencil/core";
import mockReferralData from "./mockReferralData";
export default {
  title: "Components/PayPal Account Reward Column",
  // parameters: {
  //   scenario,
  // },
};

export const ReferralTable = () => (
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
    <sqm-referral-table-rewards-column
      column-title="Rewards"
      expiring-text="Expiring in"
      fuel-tank-text="Your code is"
      pending-for-text="{status} for {date}"
      reward-received-text="Reward received on"
      status-long-text="{status, select, AVAILABLE {Reward expiring on} CANCELLED {Reward cancelled on} PENDING {Available on} EXPIRED {Reward expired on} other {Not available} }"
      status-text="{status, select, AVAILABLE {Available} CANCELLED {Cancelled} PENDING {Pending} EXPIRED {Expired} REDEEMED {Redeemed} other {Not available} }"
    ></sqm-referral-table-rewards-column>
    <sqm-referral-table-date-column
      column-title="Date referred"
      date-shown="dateReferralStarted"
    ></sqm-referral-table-date-column>
    <sqp-reward-column column-title="PayPal"></sqp-reward-column>
    <sqm-empty
      slot="empty"
      empty-state-image="https://res.cloudinary.com/saasquatch/image/upload/v1644000223/squatch-assets/empty_referral2.png"
      empty-state-header="View your referral details"
      empty-state-text="Refer a friend to view the status of your referrals and rewards earned"
    ></sqm-empty>
  </sqm-referral-table>
);
