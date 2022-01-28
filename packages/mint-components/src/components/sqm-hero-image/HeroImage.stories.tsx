import { h } from "@stencil/core";

export default {
  title: "Components/Hero Image",
};

export const OverlayHeader = () => {
  return (
    <sqm-hero-image
      image-url="https://i.imgur.com/bTwu1Um.png"
      header="Klip Rewards"
      layout="overlay"
    />
  );
};

export const OverlayDescription = () => {
  return (
    <sqm-hero-image
      image-url="https://i.imgur.com/bTwu1Um.png"
      header="Klip Rewards"
      description="Refer friends or complete tasks while using Klip to earn rewards"
      layout="overlay"
    />
  );
};

export const OverlayButton = () => {
  return (
    <sqm-hero-image
      image-url="https://i.imgur.com/bTwu1Um.png"
      header="Klip Rewards"
      description="Refer friends or complete tasks while using Klip to earn rewards"
      button-text="Start earning"
      layout="overlay"
    />
  );
};

export const OverlayLong = () => {
  return (
    <sqm-hero-image
      image-url="https://i.imgur.com/bTwu1Um.png"
      header="Klip Rewards"
      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
      button-text="Start earning"
      layout="overlay"
    />
  );
};

export const OverlayLeft = () => {
  return (
    <sqm-hero-image
      image-url="https://i.imgur.com/bTwu1Um.png"
      header="Klip Rewards"
      description="Refer friends or complete tasks while using Klip to earn rewards"
      button-text="Start earning"
      layout="overlay"
      image-pos="left"
    />
  );
};

export const OverlayCenter = () => {
  return (
    <sqm-hero-image
      image-url="https://i.imgur.com/bTwu1Um.png"
      header="Klip Rewards"
      description="Refer friends or complete tasks while using Klip to earn rewards"
      button-text="Start earning"
      layout="overlay"
      image-pos="center"
    />
  );
};

export const OverlayRight = () => {
  return (
    <sqm-hero-image
      image-url="https://i.imgur.com/bTwu1Um.png"
      header="Klip Rewards"
      description="Refer friends or complete tasks while using Klip to earn rewards"
      button-text="Start earning"
      layout="overlay"
      image-pos="right"
    />
  );
};

export const OverlayCustom = () => {
  return (
    <sqm-hero-image
      image-url="https://i.imgur.com/bTwu1Um.png"
      header="Klip Rewards"
      description="Refer friends or complete tasks while using Klip to earn rewards"
      button-text="Start earning"
      text-color="#fffc4b"
      overlay-color="#ff7f7f"
      overlay-opacity="0.9"
      layout="overlay"
    />
  );
};

export const Columns = () => {
  return (
    <sqm-hero-image
      image-url="https://i.imgur.com/yr6ER3R.png"
      header="Klip Rewards"
      description="Refer friends or complete tasks while using Klip to earn rewards"
      button-text="Start earning"
      layout="columns"
    />
  );
};

export const ColumnsReverse = () => {
  return (
    <sqm-hero-image
      image-url="https://i.imgur.com/yr6ER3R.png"
      header="Klip Rewards"
      description="Refer friends or complete tasks while using Klip to earn rewards"
      button-text="Start earning"
      layout="columns"
      imagePos="right"
      imageMobilePos="bottom"
    />
  );
};

export const ColumnsCustomPercentage = () => {
  return (
    <sqm-hero-image
      image-url="https://i.imgur.com/2evfTx7.png"
      description="Be one of the top 3 referrers at the end of the year and receive Klip free for 1 year!"
      layout="columns"
      image-percentage="25%"
      max-height="150px"
      max-width="100%"
      paddingImage="large"
      paddingText="large"
    />
  );
};

export const ColumnsCustom = () => {
  return (
    <sqm-hero-image
      image-url="https://i.imgur.com/yr6ER3R.png"
      header="Klip Rewards"
      description="Refer friends or complete tasks while using Klip to earn rewards"
      button-text="Start earning"
      layout="columns"
      text-color="#fffc4b"
      background-color="#ff7f7f"
    />
  );
};
