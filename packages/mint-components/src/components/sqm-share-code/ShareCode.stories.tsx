import { h } from "@stencil/core";
import scenario from "./ShareCode.feature";

export default {
  title: "Components/Share Code",
  parameters: {
    scenario,
  },
};
export const ShareCode = () => {
  return <sqm-share-code tooltiptext="Copied to Clipboard"></sqm-share-code>;
};
export const CustomTooltipText = () => {
  return <sqm-share-code tooltiptext="CUSTOM TOOLTIP TEXT"></sqm-share-code>;
};

export const CustomTooltipDuration = () => {
  return <sqm-share-code tooltiplifespan={5000} tooltiptext="CUSTOM TOOLTIP TEXT"></sqm-share-code>;
};
