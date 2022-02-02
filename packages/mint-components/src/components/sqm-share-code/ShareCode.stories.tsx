import { h } from "@stencil/core";
import scenario from "./ShareCode.feature";

export default {
  title: "Components/Share Code",
  parameters: {
    scenario,
  },
};
export const ShareCode = () => {
  return (
    <sqm-share-code></sqm-share-code>
  );
};