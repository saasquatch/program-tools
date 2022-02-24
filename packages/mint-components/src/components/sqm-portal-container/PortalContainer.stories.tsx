import { h } from "@stencil/core";
import scenario from "./sqm-portal-container.feature";

export default {
  title: "Components/Portal Container",
  parameters: {
    scenario,
  },
};

export const TooWideColumn = () => (
  <div style={{ width: "200px", border: "1px dashed grey" }}>
    <sqm-portal-container gap="xxx-large">
      <div style={{ background: "grey", border: "1px solid red" }}>Small</div>
      <div style={{ background: "lightblue", width: "1000px" }}>
        Too wide, content goes off the side of the page for ever and is hidden.
      </div>
    </sqm-portal-container>
  </div>
);

export const TooWideRow = () => (
  <div style={{ width: "500px", border: "1px dashed grey" }}>
    <sqm-portal-container gap="xxx-large" direction="row" min-width="160px">
      <sqm-share-button
        icon="envelope"
        medium="email"
        size="medium"
        class="hydrated"
      >
        Email a friend
      </sqm-share-button>
      <sqm-share-button medium="twitter" size="medium" class="hydrated">
        Tweet about us
      </sqm-share-button>
      <sqm-share-button medium="facebook" size="medium" class="hydrated">
        Share on Facebook
      </sqm-share-button>
    </sqm-portal-container>
  </div>
);

export const TooWideSmallGap = () => (
  <div style={{ width: "500px", border: "1px dashed grey" }}>
    <sqm-portal-container gap="small" direction="row" min-width="160px">
      <sqm-share-button
        icon="envelope"
        medium="email"
        size="medium"
        class="hydrated"
      >
        Email a friend
      </sqm-share-button>
      <sqm-share-button medium="twitter" size="medium" class="hydrated">
        Tweet about us
      </sqm-share-button>
      <sqm-share-button medium="facebook" size="medium" class="hydrated">
        Share on Facebook
      </sqm-share-button>
    </sqm-portal-container>
  </div>
);

export const TooWidePadding = () => (
  <div style={{ width: "500px", border: "1px dashed grey" }}>
    <sqm-portal-container
      padding="xxx-large"
      gap="xxx-large"
      direction="row"
      min-width="160px"
    >
      <sqm-share-button
        icon="envelope"
        medium="email"
        size="medium"
        class="hydrated"
      >
        Email a friend
      </sqm-share-button>
      <sqm-share-button medium="twitter" size="medium" class="hydrated">
        Tweet about us
      </sqm-share-button>
      <sqm-share-button medium="facebook" size="medium" class="hydrated">
        Share on Facebook
      </sqm-share-button>
    </sqm-portal-container>
  </div>
);

export const TooWideDisplayFlex = () => (
  <div style={{ width: "500px", border: "1px dashed grey" }}>
    <sqm-portal-container
      gap="xxx-large"
      direction="row"
      display="flex"
      min-width="160px"
    >
      <sqm-share-button
        icon="envelope"
        medium="email"
        size="medium"
        class="hydrated"
      >
        Email a friend
      </sqm-share-button>
      <sqm-share-button medium="twitter" size="medium" class="hydrated">
        Tweet about us
      </sqm-share-button>
      <sqm-share-button medium="facebook" size="medium" class="hydrated">
        Share on Facebook
      </sqm-share-button>
    </sqm-portal-container>
  </div>
);

export const HalfWidth = () => (
  <div style={{ width: "1000px", border: "1px dashed grey" }}>
    <sqm-portal-container
      gap="xxx-large"
      direction="row"
      minWidth="160px"
      maxWidth="50%"
    >
      <sqm-share-button
        icon="envelope"
        medium="email"
        size="medium"
        class="hydrated"
      >
        Email a friend
      </sqm-share-button>
      <sqm-share-button medium="twitter" size="medium" class="hydrated">
        Tweet about us
      </sqm-share-button>
      <sqm-share-button medium="facebook" size="medium" class="hydrated">
        Share on Facebook
      </sqm-share-button>
    </sqm-portal-container>
  </div>
);

export const HalfWidthCenter = () => (
  <div style={{ width: "1000px", border: "1px dashed grey" }}>
    <sqm-portal-container
      gap="xxx-large"
      direction="row"
      minWidth="160px"
      maxWidth="50%"
      center
    >
      <sqm-share-button
        icon="envelope"
        medium="email"
        size="medium"
        class="hydrated"
      >
        Email a friend
      </sqm-share-button>
      <sqm-share-button medium="twitter" size="medium" class="hydrated">
        Tweet about us
      </sqm-share-button>
      <sqm-share-button medium="facebook" size="medium" class="hydrated">
        Share on Facebook
      </sqm-share-button>
    </sqm-portal-container>
  </div>
);

export const FullWidth = () => (
  <div style={{ width: "1000px", border: "1px dashed grey" }}>
    <sqm-portal-container gap="xxx-large" direction="row" maxWidth="100%">
      <sqm-share-button
        icon="envelope"
        medium="email"
        size="medium"
        class="hydrated"
      >
        Email a friend
      </sqm-share-button>
      <sqm-share-button medium="twitter" size="medium" class="hydrated">
        Tweet about us
      </sqm-share-button>
      <sqm-share-button medium="facebook" size="medium" class="hydrated">
        Share on Facebook
      </sqm-share-button>
    </sqm-portal-container>
  </div>
);

export const SpaceBetween = () => {
  return (
    <div style={{ width: "1000px", border: "1px dashed grey" }}>
      <sqm-portal-container
        center
        direction="row"
        display="flex"
        justify-content="space-between"
      >
        <sqm-stat-container space="xxx-large" display="flex">
          <sqm-big-stat
            flex-reverse="true"
            alignment="left"
            stat-type="/rewardsRedeemed/CREDIT/global"
          >
            <sqm-text>
              <p>Rewards Redeemed</p>
            </sqm-text>
          </sqm-big-stat>
          <sqm-big-stat
            flex-reverse="true"
            alignment="left"
            stat-type="/rewardBalance/CREDIT/POINT/value/global"
          >
            <sqm-text>
              <p>Points Balance</p>
            </sqm-text>
          </sqm-big-stat>
        </sqm-stat-container>
        <sqm-scroll
          scroll-id="tab-2"
          outline
          button-type="primary"
          button-text="Redeem your rewards"
          mobile
        ></sqm-scroll>
      </sqm-portal-container>
    </div>
  );
};

export const SpaceAround = () => {
  return (
    <div style={{ width: "1000px", border: "1px dashed grey" }}>
      <sqm-portal-container
        center
        direction="row"
        display="flex"
        justify-content="space-around"
      >
        <sqm-stat-container space="xxx-large" display="flex">
          <sqm-big-stat
            flex-reverse="true"
            alignment="left"
            stat-type="/rewardsRedeemed/CREDIT/global"
          >
            <sqm-text>
              <p>Rewards Redeemed</p>
            </sqm-text>
          </sqm-big-stat>
          <sqm-big-stat
            flex-reverse="true"
            alignment="left"
            stat-type="/rewardBalance/CREDIT/POINT/value/global"
          >
            <sqm-text>
              <p>Points Balance</p>
            </sqm-text>
          </sqm-big-stat>
        </sqm-stat-container>
        <sqm-scroll
          scroll-id="tab-2"
          outline
          button-type="primary"
          button-text="Redeem your rewards"
          mobile
        ></sqm-scroll>
      </sqm-portal-container>
    </div>
  );
};

export const SpaceEvenly = () => {
  return (
    <div style={{ width: "1000px", border: "1px dashed grey" }}>
      <sqm-portal-container
        center
        direction="row"
        display="flex"
        justify-content="space-evenly"
      >
        <sqm-stat-container space="xxx-large" display="flex">
          <sqm-big-stat
            flex-reverse="true"
            alignment="left"
            stat-type="/rewardsRedeemed/CREDIT/global"
          >
            <sqm-text>
              <p>Rewards Redeemed</p>
            </sqm-text>
          </sqm-big-stat>
          <sqm-big-stat
            flex-reverse="true"
            alignment="left"
            stat-type="/rewardBalance/CREDIT/POINT/value/global"
          >
            <sqm-text>
              <p>Points Balance</p>
            </sqm-text>
          </sqm-big-stat>
        </sqm-stat-container>
        <sqm-scroll
          scroll-id="tab-2"
          outline
          button-type="primary"
          button-text="Redeem your rewards"
          mobile
        ></sqm-scroll>
      </sqm-portal-container>
    </div>
  );
};

export const Start = () => {
  return (
    <div style={{ width: "1000px", border: "1px dashed grey" }}>
      <sqm-portal-container
        center
        direction="row"
        display="flex"
        justify-content="start"
      >
        <sqm-stat-container space="xxx-large" display="flex">
          <sqm-big-stat
            flex-reverse="true"
            alignment="left"
            stat-type="/rewardsRedeemed/CREDIT/global"
          >
            <sqm-text>
              <p>Rewards Redeemed</p>
            </sqm-text>
          </sqm-big-stat>
          <sqm-big-stat
            flex-reverse="true"
            alignment="left"
            stat-type="/rewardBalance/CREDIT/POINT/value/global"
          >
            <sqm-text>
              <p>Points Balance</p>
            </sqm-text>
          </sqm-big-stat>
        </sqm-stat-container>
        <sqm-scroll
          scroll-id="tab-2"
          outline
          button-type="primary"
          button-text="Redeem your rewards"
          mobile
        ></sqm-scroll>
      </sqm-portal-container>
    </div>
  );
};

export const Center = () => {
  return (
    <div style={{ width: "1000px", border: "1px dashed grey" }}>
      <sqm-portal-container
        center
        direction="row"
        display="flex"
        justify-content="center"
      >
        <sqm-stat-container space="xxx-large" display="flex">
          <sqm-big-stat
            flex-reverse="true"
            alignment="left"
            stat-type="/rewardsRedeemed/CREDIT/global"
          >
            <sqm-text>
              <p>Rewards Redeemed</p>
            </sqm-text>
          </sqm-big-stat>
          <sqm-big-stat
            flex-reverse="true"
            alignment="left"
            stat-type="/rewardBalance/CREDIT/POINT/value/global"
          >
            <sqm-text>
              <p>Points Balance</p>
            </sqm-text>
          </sqm-big-stat>
        </sqm-stat-container>
        <sqm-scroll
          scroll-id="tab-2"
          outline
          button-type="primary"
          button-text="Redeem your rewards"
          mobile
        ></sqm-scroll>
      </sqm-portal-container>
    </div>
  );
};

export const End = () => {
  return (
    <div style={{ width: "1000px", border: "1px dashed grey" }}>
      <sqm-portal-container
        center
        direction="row"
        display="flex"
        justify-content="end"
      >
        <sqm-stat-container space="xxx-large" display="flex">
          <sqm-big-stat
            flex-reverse="true"
            alignment="left"
            stat-type="/rewardsRedeemed/CREDIT/global"
          >
            <sqm-text>
              <p>Rewards Redeemed</p>
            </sqm-text>
          </sqm-big-stat>
          <sqm-big-stat
            flex-reverse="true"
            alignment="left"
            stat-type="/rewardBalance/CREDIT/POINT/value/global"
          >
            <sqm-text>
              <p>Points Balance</p>
            </sqm-text>
          </sqm-big-stat>
        </sqm-stat-container>
        <sqm-scroll
          scroll-id="tab-2"
          outline
          button-type="primary"
          button-text="Redeem your rewards"
          mobile
        ></sqm-scroll>
      </sqm-portal-container>
    </div>
  );
};
