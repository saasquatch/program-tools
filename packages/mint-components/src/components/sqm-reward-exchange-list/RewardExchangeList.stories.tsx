import { h } from "@stencil/core";
import {
  RewardExchangeView,
  RewardExchangeViewProps,
} from "./sqm-reward-exchange-list-view";
import * as Data from "./RewardExchangeListData";
import scenario from "./sqm-reward-exchange-list.feature";
import { RewardExchangeProps } from "./useRewardExchangeList";

export default {
  title: "Components/Reward Exchange List",
  parameters: {
    scenario,
  },
};

const demoData: RewardExchangeViewProps = {
  states: {
    selectedItem: {
      key: "reward1",
      name: "Reward 1",
      description: "Description for Reward 1",
      imageUrl:
        "https://res.cloudinary.com/saasquatch/image/upload/v1644000273/squatch-assets/y9HSls1.png",
      prettySourceValue: "100 Points",
      ruleType: "FIXED_GLOBAL_REWARD",
      steps: [
        {
          prettyDestinationValue: "Reward Step 1",
          prettySourceValue: "50 Points",
          available: true,
          unavailableReasonCode: null,
          destinationValue: 10,
          sourceValue: 1,
          globalRewardKey: "reward1",
          rewardInput: {
            accountId: "zach",
            userId: "zach",
          },
        },
        {
          prettyDestinationValue: "Reward Step 2",
          prettySourceValue: "100 Points",
          available: false,
          unavailableReasonCode: "Not enough points",
          destinationValue: 10,
          sourceValue: 1,
          globalRewardKey: "reward1",
          rewardInput: {
            accountId: "zach",
            userId: "zach",
          },
        },
      ],
      available: true,
      unavailableReasonCode: null,
      sourceUnit: "Points",
      sourceValue: 100,
      destinationUnit: "Reward",
      destinationMinValue: 1,
      globalRewardKey: "reward1",
      sourceMinValue: 100,
      sourceMaxValue: 100,
      prettySourceMinValue: "100 Points",
      prettySourceMaxValue: "100 Points",
      destinationMaxValue: 10,
      prettyDestinationMinValue: "1 Reward",
      prettyDestinationMaxValue: "10 Reward",
    },
    selectedStep: null,
    redeemStage: "chooseReward",
    amount: 0,
    exchangeError: false,
    queryError: false,
    loading: false,
    open: false,
    noExchangeOptions: false,
    content: {
      text: {
        notAvailableError: "This reward is not available.",
        chooseRewardTitle: "Choose Your Reward",
        chooseAmountTitle: "Choose Amount",
        confirmationTitle: "Confirmation",
        rewardTitle: "Available Rewards",
        cancelText: "Cancel",
        backText: "Back",
        continueText: "Continue",
        continueToConfirmationText: "Continue to Confirmation",
        redeemText: "Redeem",
        redeemTitle: "Redeem Your Reward",
        redemptionSuccessText: "Your reward has been successfully redeemed!",
        sourceAmountMessage: "You have {sourceValue} available.",
        tooltipText: "Copy code",
        doneText: "Done",
        selectText: "Select an option",
        redemptionError: "An error occurred during redemption.",
        notEnoughError: "You do not have enough points.",
        queryError: "An error occurred while fetching rewards.",
        promoCode: "Promo Code:",
        skeletonCardNum: 3,
        rewardNameTitle: "Reward Name",
        rewardAmountTitle: "Reward Amount",
        rewardRedeemedText: "Reward Redeemed!",
        costTitle: "Cost",
        empty: <p>No rewards available.</p>,
      },
    },
  },
  data: {
    exchangeList: [
      {
        key: "reward1",
        name: "Reward 1",
        description: "Description for Reward 1",
        imageUrl:
          "https://res.cloudinary.com/saasquatch/image/upload/v1644000223/squatch-assets/dWEdB3p.png",
        prettySourceValue: "100 Points",
        ruleType: "FIXED_GLOBAL_REWARD",
        steps: [],
      },
      {
        key: "reward2",
        name: "Reward 2",
        description: "Description for Reward 2",
        imageUrl:
          "https://res.cloudinary.com/saasquatch/image/upload/v1644000223/squatch-assets/dWEdB3p.png",
        prettySourceValue: "200 Points",
        ruleType: "VARIABLE_REWARD",
        steps: [
          {
            prettyDestinationValue: "Reward Step 1",
            prettySourceValue: "50 Points",
            available: true,
            unavailableReasonCode: null,
          },
          {
            prettyDestinationValue: "Reward Step 2",
            prettySourceValue: "100 Points",
            available: false,
            unavailableReasonCode: "Not enough points",
          },
        ],
      },
    ],
    fuelTankCode: "PROMO123",
  },
  callbacks: {
    exchangeReward: (e) => console.log("Reward exchanged:", e),
    setStage: (stage) => console.log("Stage set to:", stage),
    resetState: (refresh) => console.log("State reset:", refresh),
    setExchangeState: (state) => console.log("Exchange state updated:", state),
    copyFuelTankCode: () => console.log("Fuel tank code copied."),
  },
  refs: {
    canvasRef: { current: null },
  },
};

export const ChooseReward = () => {
  return (
    <RewardExchangeView
      {...demoData}
      states={demoData.states}
      data={demoData.data}
      callbacks={demoData.callbacks}
      refs={demoData.refs}
    />
  );
};

const StoryBase = (props: RewardExchangeViewProps) => () => {
  return <RewardExchangeView {...props}></RewardExchangeView>;
};

// export const ChooseReward = StoryBase(Data.rewardExchange);
export const CustomErrorMessage = StoryBase(Data.rewardExchangeCustomErrorMsg);
export const LongTextRewardExhange = StoryBase(Data.rewardExchangeLongText);
export const ChooseRewardSelected = StoryBase(Data.rewardExchangeSelected);
export const ChooseAmount = StoryBase(Data.chooseAmountFixed);
export const ChooseAmountNoDescription = StoryBase(
  Data.chooseAmountFixedNoDescription
);
export const ChooseAmountVariableAndStepped = StoryBase(
  Data.chooseAmountVariable
);
export const ChooseAmountVariableAndSteppedNoDescription = StoryBase(
  Data.chooseAmountVariableNoDescription
);
export const chooseAmountVariableAndSteppedDisabled = StoryBase(
  Data.chooseAmountVariableDisabled
);
export const chooseAmountVariableAndSteppedUnavailable = StoryBase(
  Data.chooseAmountVariableUnavailable
);
export const Confirm = StoryBase(Data.confirmFixed);
export const ConfirmVariableAndStepped = StoryBase(Data.confirmVariable);
export const RedemptionError = StoryBase(Data.redemptionError);
export const QueryError = StoryBase(Data.queryError);
export const SuccessPromo = StoryBase(Data.success);
export const SuccessVariableAndStepped = StoryBase(Data.successVariable);
export const Loading = StoryBase(Data.loading);
export const Empty = StoryBase(Data.empty);
