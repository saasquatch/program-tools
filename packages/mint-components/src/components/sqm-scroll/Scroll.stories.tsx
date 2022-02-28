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
        scroll-animation="smooth"
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
        button-text="Scroll"
        scroll-id="my-id"
        scroll-animation="smooth"
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

export const ScrollAutoAnimation = () => {
  return (
    <div style={{ position: "relative", height: "2000px" }}>
      <sqm-scroll
        button-text="Scroll"
        scroll-id="my-id"
        scroll-animation="auto"
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
        scroll-animation="smooth"
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

export const ScrollTabGroupInner = () => {
  return (
    <div style={{ position: "relative", height: "2000px" }}>
      <sqm-scroll
        button-text="Redeem rewards"
        scroll-tag-name="sqm-reward-exchange-list"
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

export const ShoelaceProps = () => {
  return (
    <div>
      <div style={{ display: "flex", gap: "60px" }}>
        <div style={{ textAlign: "center" }}>
          <h3>Type:</h3>
          <sqm-scroll button-type="primary">Primary</sqm-scroll>
          <br />
          <sqm-scroll button-type="success">Success</sqm-scroll>
          <br />
          <sqm-scroll button-type="neutral">Neutral</sqm-scroll>
          <br />
          <sqm-scroll button-type="warning">Warning</sqm-scroll>
          <br />
          <sqm-scroll button-type="danger">Danger</sqm-scroll>
        </div>
        <div style={{ textAlign: "center" }}>
          <h3>Outline:</h3>
          <sqm-scroll outline button-type="primary">
            Primary
          </sqm-scroll>
          <br />
          <sqm-scroll outline button-type="success">
            Success
          </sqm-scroll>
          <br />
          <sqm-scroll outline button-type="neutral">
            Neutral
          </sqm-scroll>
          <br />
          <sqm-scroll outline button-type="warning">
            Warning
          </sqm-scroll>
          <br />
          <sqm-scroll outline button-type="danger">
            Danger
          </sqm-scroll>
        </div>
      </div>
      <br /> <hr />
      <h3>Text:</h3>
      <sqm-scroll button-type="text">Text</sqm-scroll>
      <br /> <hr />
      <h3>Size:</h3>
      <sqm-scroll size="small">Small</sqm-scroll>
      <br />
      <sqm-scroll size="medium">Medium</sqm-scroll>
      <br />
      <sqm-scroll size="large">Large</sqm-scroll>
      <br /> <hr />
      <h3>Pill:</h3>
      <sqm-scroll pill>Button</sqm-scroll>
      <br /> <hr />
      <h3>Icon:</h3>
      <sqm-scroll button-type="primary" iconName="facebook">
        Icon Name
      </sqm-scroll>
      <br />
      <sqm-scroll iconName="gear" iconSlot="prefix">
        Icon Slot Prefix
      </sqm-scroll>
      <br />
      <sqm-scroll iconName="gear" iconSlot="suffix">
        Icon Slot Suffix
      </sqm-scroll>
      <br /> <hr />
      <h3>Circle:</h3>
      <sqm-scroll circle>X</sqm-scroll>
      <br /> <hr />
      <h3>Mobile Friendly:</h3>
      <sqm-scroll mobile>Button</sqm-scroll>
      <br /> <hr />
    </div>
  );
};
