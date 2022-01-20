import { h } from "@stencil/core";
import { getDescription } from "graphql";
import { Resizer } from "../sqm-stencilbook/Resizer";
import { MediaView } from "./sqm-media-view";

export default {
  title: "Components/Media",
};

export const ImageOnly = () => {
  return (
    <sqm-media image-url="https://i.imgur.com/bTwu1Um.png" layout="overlay" />
  );
};

export const ImageWithHeader = () => {
  return (
    <sqm-media
      image-url="https://i.imgur.com/bTwu1Um.png"
      header="Klip Rewards"
      layout="overlay"
    />
  );
};

export const ImageWithDescription = () => {
  return (
    <sqm-media
      image-url="https://i.imgur.com/bTwu1Um.png"
      header="Klip Rewards"
      description="Refer friends or complete tasks while using Klip to earn rewards"
      layout="overlay"
    />
  );
};

export const ImageWithButton = () => {
  return (
    <sqm-media
      image-url="https://i.imgur.com/bTwu1Um.png"
      header="Klip Rewards"
      description="Refer friends or complete tasks while using Klip to earn rewards"
      button-text="Start earning"
      layout="overlay"
    />
  );
};

export const ImageCustomOverlay = () => {
  return (
    <sqm-media
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

export const ImageTwoColumnLayout = () => {
  return (
    <sqm-media
      image-url="https://i.imgur.com/yr6ER3R.png"
      header="Klip Rewards"
      description="Refer friends or complete tasks while using Klip to earn rewards"
      button-text="Start earning"
      layout="columns"
    />
  );
};

export const ImageTwoColumnLayoutReverse = () => {
  return (
    <sqm-media
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

export const ImageTwoColumnCustom = () => {
  return (
    <sqm-media
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
