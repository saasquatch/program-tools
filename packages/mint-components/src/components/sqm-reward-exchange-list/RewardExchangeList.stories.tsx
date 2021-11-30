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

export const Default = () => {
  return (
    <div style={resizable}>
      <RewardExchangeView {...Data.test}></RewardExchangeView>
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
