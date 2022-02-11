import { h } from "@stencil/core";
import scenario from "./ShareCode.feature";

export default {
  title: "Components/Share Code",
  parameters: {
    scenario,
  },
};
export const ShareCode = () => {
  return <sqm-share-code></sqm-share-code>;
};
export const CustomTooltipText = () => {
  return <sqm-share-code tooltipText="CUSTOM TOOLTIP TEXT"></sqm-share-code>;
};

export const CustomTooltipDuration = () => {
  return <sqm-share-code tooltipLifespan={5000}></sqm-share-code>;
};
