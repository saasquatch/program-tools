import { h } from "@stencil/core";
import {
  RewardExchangeView,
  RewardExchangeViewProps,
} from "./sqm-reward-exchange-list-view";
import * as Data from "./RewardExchangeListData";
import { Resizer } from "../sqm-stencilbook/Resizer";
import { useRef } from "@saasquatch/universal-hooks";

export default {
  title: "Components/Reward Exchange List",
};

const StoryBase = (props: RewardExchangeViewProps) => () => {
  return (
    <RewardExchangeView {...props}></RewardExchangeView>
    // <Resizer>
    // </Resizer>
  );
};

export const ChooseReward = StoryBase(Data.rewardExchange);
export const ChooseRewardSelected = StoryBase(Data.rewardExchangeSelected);
export const ChooseAmount = StoryBase(Data.chooseAmountFixed);
export const ChooseAmountVariable = StoryBase(Data.chooseAmountVariable);
export const chooseAmountVariableDisabled = StoryBase(
  Data.chooseAmountVariableDisabled
);
export const Confirm = StoryBase(Data.confirmFixed);
export const ConfirmVariable = StoryBase(Data.confirmVariable);
export const Error = StoryBase(Data.error);
export const SuccessPromo = StoryBase(Data.success);
export const SuccessVariable = StoryBase(Data.successVariable);
export const Loading = StoryBase(Data.loading);
