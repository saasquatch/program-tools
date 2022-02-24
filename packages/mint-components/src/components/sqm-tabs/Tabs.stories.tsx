import { h } from "@stencil/core";
import scenario from "./tabs.feature";
export default {
  title: "Components/Tabs",
  parameters: {
    scenario,
  },
};

export const SimpleTabs = () => (
  <div
    style={{ maxWidth: "700px", margin: "auto" }}
    innerHTML={`
     <sqm-tabs>
        <sqm-tab header="General">This is the general tab</sqm-tab>
        <sqm-tab header="Custom">This is the custom tab</sqm-tab>
        <sqm-tab header="Advanced">This is the advanced tab</sqm-tab>
      </sqm-tabs>
    `}
  ></div>
);

export const ManyTabs = () => (
  <div
    style={{ maxWidth: "700px", margin: "auto" }}
    innerHTML={`
     <sqm-tabs>
        <sqm-tab header="General">This is the general tab</sqm-tab>
        <sqm-tab header="Custom">This is the custom tab</sqm-tab>
        <sqm-tab header="Advanced">This is the advanced tab</sqm-tab>        <sqm-tab header="General">This is the general tab</sqm-tab>
        <sqm-tab header="Custom">This is the custom tab</sqm-tab>
        <sqm-tab header="Advanced">This is the advanced tab</sqm-tab>
        <sqm-tab header="General">This is the general tab</sqm-tab>
        <sqm-tab header="Custom">This is the custom tab</sqm-tab>
        <sqm-tab header="Advanced">This is the advanced tab</sqm-tab>
        <sqm-tab header="General">This is the general tab</sqm-tab>
        <sqm-tab header="Custom">This is the custom tab</sqm-tab>
        <sqm-tab header="Advanced">This is the advanced tab</sqm-tab>
      </sqm-tabs>
    `}
  ></div>
);

export const SingleTab = () => (
  <div
    style={{ maxWidth: "700px", margin: "auto" }}
    innerHTML={`
     <sqm-tabs>
        <sqm-tab header="Redeem">
          <sqm-reward-exchange-list></sqm-reward-exchange-list>
        </sqm-tab>
      </sqm-tabs>
    `}
  ></div>
);

export const ReferralProgram = () => (
  <div
    style={{ maxWidth: "700px", margin: "auto" }}
    innerHTML={`
    <sqm-tabs>
    <sqm-tab header="Leaderboard">
      <sqm-leaderboard></sqm-leaderboard>
    </sqm-tab>
    <sqm-tab header="Referral history">
      <sqm-referral-table>
        <sqm-referral-table-user-column
          column-title="User"
          anonymous-user="Anonymous User"
          deleted-user="Deleted User"
        >
        </sqm-referral-table-user-column>
        <sqm-referral-table-status-column
          column-title="Referral status"
          converted-status-text="Converted"
          in-progress-status-text="In Progress"
        >
        </sqm-referral-table-status-column>
        <sqm-referral-table-rewards-column
          column-title="Rewards"
          expiring-text="Expiring in"
          fuel-tank-text="Your code is"
          pending-for-text="{status} for {date}"
          reward-received-text="Reward received on"
          status-long-text="{status, select, AVAILABLE {Reward expiring on} CANCELLED {Reward cancelled on} PENDING {Available on} EXPIRED {Reward expired on} other {Not available} }"
          status-text="{status, select, AVAILABLE {Available} CANCELLED {Cancelled} PENDING {Pending} EXPIRED {Expired} REDEEMED {Redeemed} other {Not available} }"
        >
        </sqm-referral-table-rewards-column>
        <sqm-referral-table-date-column
          column-title="Date referred"
          date-shown="dateReferralStarted"
        >
        </sqm-referral-table-date-column>
        <sqm-empty
          empty-state-image="https://res.cloudinary.com/saasquatch/image/upload/v1644000223/squatch-assets/empty_referral2.png"
          empty-state-header="View your referral details"
          empty-state-text="Refer a friend to view the status of your referrals and rewards earned"
        >
        </sqm-empty
      ></sqm-referral-table>
    </sqm-tab>
    <sqm-tab header="Reward history">
      <sqm-rewards-table
        ><sqm-rewards-table-reward-column
          available-text="{availableAmount} remaining"
          column-title="Reward"
          copy-text="Copied!"
          redeemed-text="{redeemedAmount} redeemed"
        >
        </sqm-rewards-table-reward-column>
        <sqm-rewards-table-source-column
          anonymous-user="Anonymous User"
          column-title="Source"
          deleted-user="Deleted User"
          referral-text="{rewardSource, select, FRIEND_SIGNUP {Referral to} REFERRED {Referred by} other {}}"
          reward-exchange-text="Reward Exchange"
          reward-source-text="{rewardSource, select, MANUAL {Manual} AUTOMATED {{programName}} other {}}"
        >
        </sqm-rewards-table-source-column>
        <sqm-rewards-table-status-column
          column-title="Status"
          expiry-text="Expires on "
          status-text="{status, select, AVAILABLE {Available} CANCELLED {Cancelled} PENDING {Pending} EXPIRED {Expired} REDEEMED {Redeemed} other {Not available} }"
        >
        </sqm-rewards-table-status-column>
        <sqm-rewards-table-date-column
          column-title="Date received"
          date-shown="dateGiven"
        >
        </sqm-rewards-table-date-column>
        <sqm-empty
          empty-state-image="https://res.cloudinary.com/saasquatch/image/upload/v1644360953/squatch-assets/empty_reward2.png"
          empty-state-header="View your rewards"
          empty-state-text="Refer friends and complete tasks to view the details of your rewards"
        >
        </sqm-empty
      ></sqm-rewards-table>
    </sqm-tab>
  </sqm-tabs>  
    `}
  ></div>
);

export const LoyaltyProgram = () => (
  <div
    style={{ maxWidth: "700px", margin: "auto" }}
    innerHTML={`
    <sqm-tabs placement="top">
    <sqm-tab header="Leaderboard">
      <sqm-hero-image
        image-url="https://i.imgur.com/MVgOJn7.png"
        description="Be one of the top 3 referrers at the end of the year and receive Klip free for 1 year!"
        layout="columns"
        image-percentage="33%"
        padding-image="large"
        padding-text="large"
        background-color=""
      ></sqm-hero-image>
      <sqm-leaderboard></sqm-leaderboard>
    </sqm-tab>
    <sqm-tab header="Referral history">
      <sqm-referral-table>
        <sqm-referral-table-user-column
          column-title="User"
          anonymous-user="Anonymous User"
          deleted-user="Deleted User"
        >
        </sqm-referral-table-user-column>
        <sqm-referral-table-status-column
          column-title="Referral status"
          converted-status-text="Converted"
          in-progress-status-text="In Progress"
        >
        </sqm-referral-table-status-column>
        <sqm-referral-table-rewards-column
          column-title="Rewards"
          expiring-text="Expiring in"
          fuel-tank-text="Your code is"
          pending-for-text="{status} for {date}"
          reward-received-text="Reward received on"
          status-long-text="{status, select, AVAILABLE {Reward expiring on} CANCELLED {Reward cancelled on} PENDING {Available on} EXPIRED {Reward expired on} other {Not available} }"
          status-text="{status, select, AVAILABLE {Available} CANCELLED {Cancelled} PENDING {Pending} EXPIRED {Expired} REDEEMED {Redeemed} other {Not available} }"
        >
        </sqm-referral-table-rewards-column>
        <sqm-referral-table-date-column
          column-title="Date referred"
          date-shown="dateReferralStarted"
        >
        </sqm-referral-table-date-column>
        <sqm-empty
          empty-state-image="https://res.cloudinary.com/saasquatch/image/upload/v1644000223/squatch-assets/empty_referral2.png"
          empty-state-header="View your referral details"
          empty-state-text="Refer a friend to view the status of your referrals and rewards earned"
        >
        </sqm-empty
      ></sqm-referral-table>
    </sqm-tab>
    <sqm-tab header="Reward history">
      <sqm-rewards-table
        ><sqm-rewards-table-reward-column
          available-text="{availableAmount} remaining"
          column-title="Reward"
          copy-text="Copied!"
          redeemed-text="{redeemedAmount} redeemed"
        >
        </sqm-rewards-table-reward-column>
        <sqm-rewards-table-source-column
          anonymous-user="Anonymous User"
          column-title="Source"
          deleted-user="Deleted User"
          referral-text="{rewardSource, select, FRIEND_SIGNUP {Referral to} REFERRED {Referred by} other {}}"
          reward-exchange-text="Reward Exchange"
          reward-source-text="{rewardSource, select, MANUAL {Manual} AUTOMATED {{programName}} other {}}"
        >
        </sqm-rewards-table-source-column>
        <sqm-rewards-table-status-column
          column-title="Status"
          expiry-text="Expires on "
          status-text="{status, select, AVAILABLE {Available} CANCELLED {Cancelled} PENDING {Pending} EXPIRED {Expired} REDEEMED {Redeemed} other {Not available} }"
        >
        </sqm-rewards-table-status-column>
        <sqm-rewards-table-date-column
          column-title="Date received"
          date-shown="dateGiven"
        >
        </sqm-rewards-table-date-column>
        <sqm-empty
          empty-state-image="https://res.cloudinary.com/saasquatch/image/upload/v1644360953/squatch-assets/empty_reward2.png"
          empty-state-header="View your rewards"
          empty-state-text="Refer friends and complete tasks to view the details of your rewards"
        >
        </sqm-empty
      ></sqm-rewards-table>
    </sqm-tab>
    <sqm-tab header="Redeem">
      <sqm-reward-exchange-list></sqm-reward-exchange-list>
    </sqm-tab>
  </sqm-tabs>  
    `}
  ></div>
);

export const BottomTabs = () => (
  <div
    style={{ maxWidth: "700px", margin: "auto" }}
    innerHTML={`
    <sqm-tabs placement="bottom">
    <sqm-tab header="Leaderboard">
      <sqm-hero-image
        image-url="https://i.imgur.com/MVgOJn7.png"
        description="Be one of the top 3 referrers at the end of the year and receive Klip free for 1 year!"
        layout="columns"
        image-percentage="33%"
        padding-image="large"
        padding-text="large"
        background-color=""
      ></sqm-hero-image>
      <sqm-leaderboard></sqm-leaderboard>
    </sqm-tab>
    <sqm-tab header="Referral history">
      <sqm-referral-table
        ><sqm-referral-table-user-column
          column-title="User"
          anonymous-user="Anonymous User"
          deleted-user="Deleted User"
        >
        </sqm-referral-table-user-column>
        <sqm-referral-table-status-column
          column-title="Referral status"
          converted-status-text="Converted"
          in-progress-status-text="In Progress"
        >
        </sqm-referral-table-status-column>
        <sqm-referral-table-rewards-column
          column-title="Rewards"
          expiring-text="Expiring in"
          fuel-tank-text="Your code is"
          pending-for-text="{status} for {date}"
          reward-received-text="Reward received on"
          status-long-text="{status, select, AVAILABLE {Reward expiring on} CANCELLED {Reward cancelled on} PENDING {Available on} EXPIRED {Reward expired on} other {Not available} }"
          status-text="{status, select, AVAILABLE {Available} CANCELLED {Cancelled} PENDING {Pending} EXPIRED {Expired} REDEEMED {Redeemed} other {Not available} }"
        >
        </sqm-referral-table-rewards-column>
        <sqm-referral-table-date-column
          column-title="Date referred"
          date-shown="dateReferralStarted"
        >
        </sqm-referral-table-date-column>
        <sqm-empty
          empty-state-image="https://res.cloudinary.com/saasquatch/image/upload/v1644000223/squatch-assets/empty_referral2.png"
          empty-state-header="View your referral details"
          empty-state-text="Refer a friend to view the status of your referrals and rewards earned"
        >
        </sqm-empty
      ></sqm-referral-table>
    </sqm-tab>
    <sqm-tab header="Reward history">
      <sqm-rewards-table
        ><sqm-rewards-table-reward-column
          available-text="{availableAmount} remaining"
          column-title="Reward"
          copy-text="Copied!"
          redeemed-text="{redeemedAmount} redeemed"
        >
        </sqm-rewards-table-reward-column>
        <sqm-rewards-table-source-column
          anonymous-user="Anonymous User"
          column-title="Source"
          deleted-user="Deleted User"
          referral-text="{rewardSource, select, FRIEND_SIGNUP {Referral to} REFERRED {Referred by} other {}}"
          reward-exchange-text="Reward Exchange"
          reward-source-text="{rewardSource, select, MANUAL {Manual} AUTOMATED {{programName}} other {}}"
        >
        </sqm-rewards-table-source-column>
        <sqm-rewards-table-status-column
          column-title="Status"
          expiry-text="Expires on "
          status-text="{status, select, AVAILABLE {Available} CANCELLED {Cancelled} PENDING {Pending} EXPIRED {Expired} REDEEMED {Redeemed} other {Not available} }"
        >
        </sqm-rewards-table-status-column>
        <sqm-rewards-table-date-column
          column-title="Date received"
          date-shown="dateGiven"
        >
        </sqm-rewards-table-date-column>
        <sqm-empty
          empty-state-image="https://res.cloudinary.com/saasquatch/image/upload/v1644360953/squatch-assets/empty_reward2.png"
          empty-state-header="View your rewards"
          empty-state-text="Refer friends and complete tasks to view the details of your rewards"
        >
        </sqm-empty
      ></sqm-rewards-table>
    </sqm-tab>
    <sqm-tab header="Redeem">
      <sqm-reward-exchange-list></sqm-reward-exchange-list>
    </sqm-tab>
  </sqm-tabs>  
    `}
  ></div>
);

export const LeftTabs = () => (
  <div
    style={{ maxWidth: "900px", margin: "auto" }}
    innerHTML={`
    <sqm-tabs placement="left">
    <sqm-tab header="Leaderboard">
      <sqm-hero-image
        image-url="https://i.imgur.com/MVgOJn7.png"
        description="Be one of the top 3 referrers at the end of the year and receive Klip free for 1 year!"
        layout="columns"
        image-percentage="33%"
        padding-image="large"
        padding-text="large"
        background-color=""
      ></sqm-hero-image>
      <sqm-leaderboard></sqm-leaderboard>
    </sqm-tab>
    <sqm-tab header="Referral history">
      <sqm-referral-table
        ><sqm-referral-table-user-column
          column-title="User"
          anonymous-user="Anonymous User"
          deleted-user="Deleted User"
        >
        </sqm-referral-table-user-column>
        <sqm-referral-table-status-column
          column-title="Referral status"
          converted-status-text="Converted"
          in-progress-status-text="In Progress"
        >
        </sqm-referral-table-status-column>
        <sqm-referral-table-rewards-column
          column-title="Rewards"
          expiring-text="Expiring in"
          fuel-tank-text="Your code is"
          pending-for-text="{status} for {date}"
          reward-received-text="Reward received on"
          status-long-text="{status, select, AVAILABLE {Reward expiring on} CANCELLED {Reward cancelled on} PENDING {Available on} EXPIRED {Reward expired on} other {Not available} }"
          status-text="{status, select, AVAILABLE {Available} CANCELLED {Cancelled} PENDING {Pending} EXPIRED {Expired} REDEEMED {Redeemed} other {Not available} }"
        >
        </sqm-referral-table-rewards-column>
        <sqm-referral-table-date-column
          column-title="Date referred"
          date-shown="dateReferralStarted"
        >
        </sqm-referral-table-date-column>
        <sqm-empty
          empty-state-image="https://res.cloudinary.com/saasquatch/image/upload/v1644000223/squatch-assets/empty_referral2.png"
          empty-state-header="View your referral details"
          empty-state-text="Refer a friend to view the status of your referrals and rewards earned"
        >
        </sqm-empty
      ></sqm-referral-table>
    </sqm-tab>
    <sqm-tab header="Reward history">
      <sqm-rewards-table
        ><sqm-rewards-table-reward-column
          available-text="{availableAmount} remaining"
          column-title="Reward"
          copy-text="Copied!"
          redeemed-text="{redeemedAmount} redeemed"
        >
        </sqm-rewards-table-reward-column>
        <sqm-rewards-table-source-column
          anonymous-user="Anonymous User"
          column-title="Source"
          deleted-user="Deleted User"
          referral-text="{rewardSource, select, FRIEND_SIGNUP {Referral to} REFERRED {Referred by} other {}}"
          reward-exchange-text="Reward Exchange"
          reward-source-text="{rewardSource, select, MANUAL {Manual} AUTOMATED {{programName}} other {}}"
        >
        </sqm-rewards-table-source-column>
        <sqm-rewards-table-status-column
          column-title="Status"
          expiry-text="Expires on "
          status-text="{status, select, AVAILABLE {Available} CANCELLED {Cancelled} PENDING {Pending} EXPIRED {Expired} REDEEMED {Redeemed} other {Not available} }"
        >
        </sqm-rewards-table-status-column>
        <sqm-rewards-table-date-column
          column-title="Date received"
          date-shown="dateGiven"
        >
        </sqm-rewards-table-date-column>
        <sqm-empty
          empty-state-image="https://res.cloudinary.com/saasquatch/image/upload/v1644360953/squatch-assets/empty_reward2.png"
          empty-state-header="View your rewards"
          empty-state-text="Refer friends and complete tasks to view the details of your rewards"
        >
        </sqm-empty
      ></sqm-rewards-table>
    </sqm-tab>
    <sqm-tab header="Redeem">
      <sqm-reward-exchange-list></sqm-reward-exchange-list>
    </sqm-tab>
  </sqm-tabs>  
    `}
  ></div>
);

export const RightTabs = () => (
  <div
    style={{ maxWidth: "900px", margin: "auto" }}
    innerHTML={`
    <sqm-tabs placement="right">
    <sqm-tab header="Leaderboard">
      <sqm-hero-image
        image-url="https://i.imgur.com/MVgOJn7.png"
        description="Be one of the top 3 referrers at the end of the year and receive Klip free for 1 year!"
        layout="columns"
        image-percentage="33%"
        padding-image="large"
        padding-text="large"
        background-color=""
      ></sqm-hero-image>
      <sqm-leaderboard></sqm-leaderboard>
    </sqm-tab>
    <sqm-tab header="Referral history">
      <sqm-referral-table
        ><sqm-referral-table-user-column
          column-title="User"
          anonymous-user="Anonymous User"
          deleted-user="Deleted User"
        >
        </sqm-referral-table-user-column>
        <sqm-referral-table-status-column
          column-title="Referral status"
          converted-status-text="Converted"
          in-progress-status-text="In Progress"
        >
        </sqm-referral-table-status-column>
        <sqm-referral-table-rewards-column
          column-title="Rewards"
          expiring-text="Expiring in"
          fuel-tank-text="Your code is"
          pending-for-text="{status} for {date}"
          reward-received-text="Reward received on"
          status-long-text="{status, select, AVAILABLE {Reward expiring on} CANCELLED {Reward cancelled on} PENDING {Available on} EXPIRED {Reward expired on} other {Not available} }"
          status-text="{status, select, AVAILABLE {Available} CANCELLED {Cancelled} PENDING {Pending} EXPIRED {Expired} REDEEMED {Redeemed} other {Not available} }"
        >
        </sqm-referral-table-rewards-column>
        <sqm-referral-table-date-column
          column-title="Date referred"
          date-shown="dateReferralStarted"
        >
        </sqm-referral-table-date-column>
        <sqm-empty
          empty-state-image="https://res.cloudinary.com/saasquatch/image/upload/v1644000223/squatch-assets/empty_referral2.png"
          empty-state-header="View your referral details"
          empty-state-text="Refer a friend to view the status of your referrals and rewards earned"
        >
        </sqm-empty
      ></sqm-referral-table>
    </sqm-tab>
    <sqm-tab header="Reward history">
      <sqm-rewards-table
        ><sqm-rewards-table-reward-column
          available-text="{availableAmount} remaining"
          column-title="Reward"
          copy-text="Copied!"
          redeemed-text="{redeemedAmount} redeemed"
        >
        </sqm-rewards-table-reward-column>
        <sqm-rewards-table-source-column
          anonymous-user="Anonymous User"
          column-title="Source"
          deleted-user="Deleted User"
          referral-text="{rewardSource, select, FRIEND_SIGNUP {Referral to} REFERRED {Referred by} other {}}"
          reward-exchange-text="Reward Exchange"
          reward-source-text="{rewardSource, select, MANUAL {Manual} AUTOMATED {{programName}} other {}}"
        >
        </sqm-rewards-table-source-column>
        <sqm-rewards-table-status-column
          column-title="Status"
          expiry-text="Expires on "
          status-text="{status, select, AVAILABLE {Available} CANCELLED {Cancelled} PENDING {Pending} EXPIRED {Expired} REDEEMED {Redeemed} other {Not available} }"
        >
        </sqm-rewards-table-status-column>
        <sqm-rewards-table-date-column
          column-title="Date received"
          date-shown="dateGiven"
        >
        </sqm-rewards-table-date-column>
        <sqm-empty
          empty-state-image="https://res.cloudinary.com/saasquatch/image/upload/v1644360953/squatch-assets/empty_reward2.png"
          empty-state-header="View your rewards"
          empty-state-text="Refer friends and complete tasks to view the details of your rewards"
        >
        </sqm-empty
      ></sqm-rewards-table>
    </sqm-tab>
    <sqm-tab header="Redeem">
      <sqm-reward-exchange-list></sqm-reward-exchange-list>
    </sqm-tab>
  </sqm-tabs>  
    `}
  ></div>
);
