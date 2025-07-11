import { h } from "@stencil/core";
import {
  RewardExchangeView,
  RewardExchangeViewProps,
} from "./sqm-reward-exchange-list-view";
import * as Data from "./RewardExchangeListData";
import scenario from "./sqm-reward-exchange-list.feature";

export default {
  title: "Components/Reward Exchange List",
  parameters: {
    scenario,
  },
};

const StoryBase = (props: RewardExchangeViewProps) => {
  return <RewardExchangeView {...props} />;
};

export const ChooseReward = () => StoryBase(Data.rewardExchange);

export const CustomErrorMessage = () =>
  StoryBase(Data.rewardExchangeCustomErrorMsg);

export const LongTextRewardExhange = () =>
  StoryBase(Data.rewardExchangeLongText);

export const ChooseRewardSelected = () =>
  StoryBase(Data.rewardExchangeSelected);

export const ChooseAmount = () => StoryBase(Data.chooseAmountFixed);

export const ChooseAmountNoDescription = () =>
  StoryBase(Data.chooseAmountFixedNoDescription);

export const ChooseAmountVariableAndStepped = () =>
  StoryBase(Data.chooseAmountVariable);

export const ChooseAmountVariableAndSteppedNoDescription = () =>
  StoryBase(Data.chooseAmountVariableNoDescription);

export const chooseAmountVariableAndSteppedDisabled = () =>
  StoryBase(Data.chooseAmountVariableDisabled);

export const chooseAmountVariableAndSteppedUnavailable = () =>
  StoryBase(Data.chooseAmountVariableUnavailable);

export const Confirm = () => StoryBase(Data.confirmFixed);

export const ConfirmVariableAndStepped = () => StoryBase(Data.confirmVariable);

export const RedemptionError = () => StoryBase(Data.redemptionError);

export const QueryError = () => StoryBase(Data.queryError);

export const SuccessPromo = () => StoryBase(Data.success);

export const SuccessVariableAndStepped = () => StoryBase(Data.successVariable);

export const Loading = () => StoryBase(Data.loading);

export const Empty = () => StoryBase(Data.empty);
