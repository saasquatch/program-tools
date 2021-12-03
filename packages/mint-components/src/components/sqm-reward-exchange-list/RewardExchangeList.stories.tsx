import { h } from "@stencil/core";
import { RewardExchangeView } from "./sqm-reward-exchange-list-view";
import * as Data from "./RewardExchangeListData";

export default {
  title: "Components/Reward Exchange List",
};

const resizable = {
  width: "683px",
  minWidth: "260px",
  resize: "horizontal",
  height: "fit-content",
  overflow: "hidden",
};

export const rewardExchange = () => {
  return (
    <div style={resizable}>
      <RewardExchangeView {...Data.rewardExchange}></RewardExchangeView>
    </div>
  );
};

export const rewardExchangeSelected = () => {
  return (
    <div style={resizable}>
      <RewardExchangeView {...Data.rewardExchangeSelected}></RewardExchangeView>
    </div>
  );
};

export const Default2 = () => {
  return (
    <div style={{ ...resizable, height: "700px" }}>
      <RewardExchangeView {...Data.test2}></RewardExchangeView>
    </div>
  );
};
