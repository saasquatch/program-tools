import { h } from "@stencil/core";

export default {
  title: "Components/Scroll",
};

export const ScrollTag = () => {
  return (
    <div style={{ position: "relative", height: "2000px" }}>
      <sqm-scroll
        scroll-tag-name="sqm-text"
        button-text="Scroll"
        pill
        size="small"
        button-type="warning"
      ></sqm-scroll>
      <div style={{ position: "absolute", bottom: "0" }}>
        <sqm-text slot="label">
          <h3>Earn more rewards</h3>
          <p>
            Get points while using Klip. Use those points to redeem rewards like
            one free month of Klip Enterprise or two plane tickets to anywhere
            in North America
          </p>
        </sqm-text>
      </div>
    </div>
  );
};

export const ScrollId = () => {
  return (
    <div style={{ position: "relative", height: "2000px" }}>
      <sqm-scroll
        scroll-id="my-id"
        button-text="Scroll"
        iconSlot="prefix"
        button-type="primary"
        iconName="facebook"
        size="large"
      ></sqm-scroll>
      <div style={{ position: "absolute", bottom: "0" }}>
        <sqm-text slot="label" id="my-id">
          <h3>Earn more rewards</h3>
          <p>
            Get points while using Klip. Use those points to redeem rewards like
            one free month of Klip Enterprise or two plane tickets to anywhere
            in North America
          </p>
        </sqm-text>
      </div>
    </div>
  );
};

export const ScrollTabGroup = () => {
  return (
    <div style={{ position: "relative", height: "2000px" }}>
      <sqm-scroll
        button-text="Redeem rewards"
        scroll-id="tab-3"
        size="medium"
        button-type="text"
        caret
      ></sqm-scroll>
      <div
        style={{ position: "absolute", bottom: "0" }}
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
              <sqm-tab header="Referral history"
              >
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
    </div>
  );
};
