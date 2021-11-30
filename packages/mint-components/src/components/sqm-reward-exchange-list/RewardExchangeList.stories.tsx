import { h } from "@stencil/core";
import { RewardExchangeView } from "./sqm-reward-exchange-list-view";
import * as Data from "./RewardExchangeListData";

export default {
  title: "Components/Reward Exchange List",
};

export const Default = () => {
  return <RewardExchangeView {...Data.test}></RewardExchangeView>;
};

export const Default2 = () => {
  return <RewardExchangeView {...Data.test2}></RewardExchangeView>;
};
