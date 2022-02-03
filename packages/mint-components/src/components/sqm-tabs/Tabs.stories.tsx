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
