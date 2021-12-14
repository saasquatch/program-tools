import { h } from "@stencil/core";
import {
  RewardExchangeView,
  RewardExchangeViewProps,
} from "./sqm-reward-exchange-list-view";
import * as Data from "./RewardExchangeListData";
import { Resizer } from "../sqm-stencilbook/Resizer";

export default {
  title: "Components/Reward Exchange List",
};

const StoryBase = (props: RewardExchangeViewProps) => () => {
  return (
    <Resizer>
      <RewardExchangeView {...props}></RewardExchangeView>
    </Resizer>
  );
};

export const ChooseReward = StoryBase(Data.rewardExchange);
export const ChooseRewardSelected = StoryBase(Data.rewardExchangeSelected);
export const ChooseAmount = StoryBase(Data.chooseAmountFixed);
export const ChooseAmountVariable = StoryBase(Data.chooseAmountVariable);
export const Confirm = StoryBase(Data.confirmFixed);
export const ConfirmVariable = StoryBase(Data.confirmVariable);
export const Error = StoryBase(Data.error);
export const Success = StoryBase(Data.success);
export const Success2 = StoryBase(Data.success2);
export const Success3 = StoryBase(Data.success3);
export const Loading = StoryBase(Data.loading);
