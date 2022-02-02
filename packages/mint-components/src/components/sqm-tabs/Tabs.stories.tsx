import { h } from "@stencil/core";

export default {
  title: "Components/Tabs",
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

export const ReferralHistory = () => (
  <div
    style={{ maxWidth: "700px", margin: "auto" }}
    innerHTML={`
     <sqm-tabs>
        <sqm-tab header="Referral history">
          <sqm-referral-table></sqm-referral-table>
        </sqm-tab>
      </sqm-tabs>
    `}
  ></div>
);

export const RewardExhange = () => (
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

export const Leaderboard = () => (
  <div
    style={{ maxWidth: "700px", margin: "auto" }}
    innerHTML={`
     <sqm-tabs>
        <sqm-tab header="Leaderboard">
          <sqm-leaderboard></sqm-leaderboard>
        </sqm-tab>
      </sqm-tabs>
    `}
  ></div>
);

export const RewardHistory = () => (
  <div
    style={{ maxWidth: "700px", margin: "auto" }}
    innerHTML={`
     <sqm-tabs>
        <sqm-tab header="Reward history">
          <sqm-rewards-table></sqm-rewards-table>
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
          <sqm-referral-table></sqm-referral-table>
        </sqm-tab>
        <sqm-tab header="Reward history">
          <sqm-rewards-table></sqm-rewards-table>
        </sqm-tab>
      </sqm-tabs>
    `}
  ></div>
);

export const LoyaltyProgram = () => (
  <div
    style={{ maxWidth: "700px", margin: "auto" }}
    innerHTML={`
     <sqm-tabs>
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
          <sqm-referral-table></sqm-referral-table>
        </sqm-tab>
        <sqm-tab header="Reward history">
          <sqm-rewards-table></sqm-rewards-table>
        </sqm-tab>
        <sqm-tab header="Redeem">
          <sqm-reward-exchange-list></sqm-reward-exchange-list>
        </sqm-tab>
      </sqm-tabs>
    `}
  ></div>
);
