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

export const ChooseReward = () => {
  return <RewardExchangeView {...Data.rewardExchange}></RewardExchangeView>;
};

export const ChooseRewardSelected = () => {
  return (
    <RewardExchangeView {...Data.rewardExchangeSelected}></RewardExchangeView>
  );
};

export const ChooseAmount = () => {
  return <RewardExchangeView {...Data.chooseAmountFixed}></RewardExchangeView>;
};

export const ChooseAmountVariable = () => {
  return (
    <RewardExchangeView {...Data.chooseAmountVariable}></RewardExchangeView>
  );
};

export const Confirm = () => {
  return <RewardExchangeView {...Data.confirmFixed}></RewardExchangeView>;
};

export const ConfirmVariable = () => {
  return <RewardExchangeView {...Data.confirmVariable}></RewardExchangeView>;
};

export const Success = () => {
  return <RewardExchangeView {...Data.success}></RewardExchangeView>;
};
