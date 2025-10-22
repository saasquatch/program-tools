import { h } from "@stencil/core";
import { RewardExchangeViewProps } from "./sqm-reward-exchange-list-view";
import { ExchangeItem } from "./useRewardExchangeList";

const baseResponse = (
  data,
  stage = "chooseReward",
  selectedItem = null,
  selectedStep = null,
  exchangeError = false,
  loading = false,
  fueltank = null,
  noExchangeOptions = false,
  queryError = false
): RewardExchangeViewProps => ({
  states: {
    content: {
      text: {
        notAvailableError:
          "{unavailableReasonCode, select, NOT_CHAMPION {CUSTOM ERROR MESSAGE } US_TAX {Exceeds tax limit for this year} INSUFFICIENT_REDEEMABLE_CREDIT {{sourceValue} required} AVAILABILITY_PREDICATE {Not available} other {unavailableReasonCode} }",
        chooseRewardTitle: "Rewards",
        chooseAmountTitle: "Select",
        confirmationTitle: "Confirm",
        rewardTitle: "Choose a reward",
        cancelText: "Cancel",
        backText: "Back",
        continueText: "Continue",
        continueToConfirmationText: "Continue to confirmation",
        redeemText: "Redeem",
        redeemTitle: "Confirm and redeem",
        redemptionSuccessText: "Redeemed {sourceValue} for {destinationValue}",
        doneText: "Done",
        tooltipText: "Copied!",
        selectText: "Select amount to receive",
        sourceAmountMessage:
          "{ruleType, select, FIXED_GLOBAL_REWARD {{sourceValue}} other {{sourceMinValue} to {sourceMaxValue}}}",
        rewardRedeemedText: "Reward redeemed",
        redemptionError:
          "An error occured trying to redeem this reward. Please try again",
        queryError: "Unable to load reward exchange list. Please try again",
        promoCode: "Promo code",
        skeletonCardNum: 8,
        rewardNameTitle: "Reward Name",
        rewardAmountTitle: "Reward Amount",
        costTitle: "Cost",
        notEnoughError: "Sorry not enough!",
        empty: (
          <sqm-empty
            emptyStateImage={
              "https://res.cloudinary.com/saasquatch/image/upload/v1644360953/squatch-assets/empty_exchange2.png"
            }
            emptyStateHeader={"Redeem rewards"}
            emptyStateText={
              "Use your points to redeem rewards once they become available"
            }
          />
        ),
      },
    },
    queryError: queryError,
    redeemStage: stage,
    amount: 0,
    exchangeError: exchangeError,
    loading: loading,
    selectedItem: selectedItem,
    selectedStep: selectedStep,
    noExchangeOptions: noExchangeOptions,
    open: false,
  },
  data: {
    exchangeList: data,
    fuelTankCode: fueltank,
  },
  callbacks: {
    exchangeReward: null,
    resetState: null,
    setStage: null,
    setExchangeState: null,
    copyFuelTankCode: null,
    // refs: null,
  },
  refs: null,
});

const baseReward: ExchangeItem = {
  key: "reward",
  name: "Demo Reward",
  description:
    "Description of reward. Lorem ipsum dolor sit amet, consectetur adipiscing. Id nec semper sapien dignissim rhoncus nunc.",
  imageUrl:
    "https://res.cloudinary.com/saasquatch/image/upload/v1643653103/squatch-assets/default_rewards_1.png",
  available: true,
  unavailableReasonCode: null,
  ruleType: "FIXED_GLOBAL_REWARD",
  sourceUnit: "POINT",
  sourceValue: 10,
  prettySourceValue: "10 SaaSquatch Points",
  sourceMinValue: null,
  prettySourceMinValue: null,
  sourceMaxValue: null,
  prettySourceMaxValue: null,
  destinationMinValue: null,
  prettyDestinationMinValue: null,
  destinationMaxValue: null,
  prettyDestinationMaxValue: null,
  globalRewardKey: "",
  destinationUnit: null,
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
};

const notEnoughPoints = {
  available: false,
  unavailableReasonCode: "INSUFFICIENT_REDEEMABLE_CREDIT",
};

const usTax = {
  available: false,
  unavailableReasonCode: "US_TAX",
};

const customError = {
  available: false,
  unavailableReasonCode: "NOT_CHAMPION",
};

const selected = {
  key: "r1",
};

const imageUrl = (props) => ({
  imageUrl: props,
});

const name = (props) => ({
  name: props,
});

const description = (props) => ({
  description: props,
});

const fixedValue = (props) => ({
  prettySourceValue: props,
});

const variableValue = (min, max, unit) => ({
  ruleType: "VARIABLE_CREDIT_REWARD",
  sourceMinValue: min,
  prettySourceMinValue: min + " " + unit,
  sourceMaxValue: max,
  prettySourceMaxValue: max + " " + unit,
});

const demoData = [
  {
    ...baseReward,
    ...name("Free swag with a promo code"),
    ...imageUrl(
      "https://res.cloudinary.com/saasquatch/image/upload/v1643653103/squatch-assets/default_rewards_1.png"
    ),
    ...fixedValue("40 Points"),
  },
  {
    ...baseReward,
    ...selected,
    ...name("Visa® Prepaid Card USD"),
    ...imageUrl(
      "https://res.cloudinary.com/saasquatch/image/upload/v1644000268/squatch-assets/veHErQX.png"
    ),
    ...variableValue(20, 80, "Points"),
  },
  {
    ...baseReward,
    ...name("$50 Store credit"),
    ...imageUrl(
      "https://res.cloudinary.com/saasquatch/image/upload/v1644000270/squatch-assets/WkCMVSE.png"
    ),
    ...fixedValue("100 Points"),
  },
  {
    ...baseReward,
    ...name("Variable amount of store credit"),
    ...imageUrl(
      "https://res.cloudinary.com/saasquatch/image/upload/v1644000240/squatch-assets/Jn2fE0s.png"
    ),
    ...variableValue(20, 100, "Points"),
  },
];

const data = [
  {
    ...baseReward,
    ...name("Free swag with a promo code"),
    ...imageUrl(
      "https://res.cloudinary.com/saasquatch/image/upload/v1643653103/squatch-assets/default_rewards_1.png"
    ),
    ...fixedValue("40 SaaSquatch Points"),
  },
  {
    ...baseReward,
    ...selected,
    ...name("Visa® Prepaid Card USD"),
    ...imageUrl(
      "https://res.cloudinary.com/saasquatch/image/upload/v1644000268/squatch-assets/veHErQX.png"
    ),
    ...variableValue(20, 80, "Points"),
  },
  {
    ...baseReward,
    ...name("A very exclusive gift box"),
    ...imageUrl(
      "https://res.cloudinary.com/saasquatch/image/upload/v1644000223/squatch-assets/93BvEgH.png"
    ),
    ...fixedValue("30 SaaSquatch Points"),
  },
  {
    ...baseReward,
    ...name("$50 Store credit"),
    ...imageUrl(
      "https://res.cloudinary.com/saasquatch/image/upload/v1644000270/squatch-assets/WkCMVSE.png"
    ),
    ...fixedValue("100 SaaSquatch Points"),
  },
  {
    ...baseReward,
    ...name("Variable amount of store credit"),
    ...imageUrl(
      "https://res.cloudinary.com/saasquatch/image/upload/v1644000240/squatch-assets/Jn2fE0s.png"
    ),
    ...variableValue(20, 100, "Points"),
  },
  {
    ...baseReward,
    ...notEnoughPoints,
    ...name("A very rare cactus"),
    ...imageUrl(
      "https://res.cloudinary.com/saasquatch/image/upload/v1644000224/squatch-assets/hhlF2Ey.png"
    ),
    ...fixedValue("2000 SaaSquatch Points"),
  },
  {
    ...baseReward,
    ...usTax,
    ...name(
      "$1000 Store credit with a really super long name in the front page"
    ),
    ...imageUrl(
      "https://res.cloudinary.com/saasquatch/image/upload/v1644000273/squatch-assets/y9HSls1.png"
    ),
    ...fixedValue("2000 SaaSquatch Long Points"),
  },
  {
    ...baseReward,
    ...notEnoughPoints,
    ...name("A holiday gift box"),
    ...imageUrl(
      "https://res.cloudinary.com/saasquatch/image/upload/v1644000223/squatch-assets/dWEdB3p.png"
    ),
    ...fixedValue("100 SaaSquatch Points"),
  },
];

export const rewardExchange = {
  ...baseResponse(data),
};

export const demoRewardExchange = {
  ...baseResponse(demoData, "chooseReward", baseReward),
};

export const rewardExchangeLongText = {
  ...baseResponse([
    {
      ...baseReward,
      ...notEnoughPoints,
      ...name(
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt ratione a itaque non obcaecati iste, amet repudiandae at consequatur adipisci culpa nam, incidunt exercitationem aliquid."
      ),
      ...imageUrl(
        "https://res.cloudinary.com/saasquatch/image/upload/v1644000223/squatch-assets/dWEdB3p.png"
      ),
      ...fixedValue(
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt ratione a itaque non obcaecati iste, amet repudiandae at consequatur adipisci culpa nam, incidunt exercitationem aliquid."
      ),
    },
    {
      ...baseReward,
      ...name(
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt ratione a itaque non obcaecati iste, amet repudiandae at consequatur adipisci culpa nam, incidunt exercitationem aliquid."
      ),
      ...imageUrl(
        "https://res.cloudinary.com/saasquatch/image/upload/v1644000273/squatch-assets/y9HSls1.png"
      ),
      ...fixedValue(
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt ratione a itaque non obcaecati iste, amet repudiandae at consequatur adipisci culpa nam, incidunt exercitationem aliquid."
      ),
    },
    {
      ...baseReward,
      ...name("Suuuuuuuuper aweeeeesssssoooommme reward!!!!!!"),
      ...imageUrl(
        "https://res.cloudinary.com/saasquatch/image/upload/v1644000270/squatch-assets/WkCMVSE.png"
      ),
      ...fixedValue(
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt ratione a itaque non obcaecati iste, amet repudiandae at consequatur adipisci culpa nam, incidunt exercitationem aliquid."
      ),
    },
    ...data,
  ]),
};

export const rewardExchangeCustomErrorMsg = {
  ...baseResponse([
    {
      ...baseReward,
      ...customError,
      ...name("A very rare cactus"),
      ...imageUrl(
        "https://res.cloudinary.com/saasquatch/image/upload/v1644000224/squatch-assets/hhlF2Ey.png"
      ),
      ...fixedValue("2000 SaaSquatch Points"),
    },
    ...data,
  ]),
};

export const rewardExchangeSelected = {
  ...baseResponse(data, "chooseReward", {
    ...baseReward,
    ...selected,
    ...name("Visa® Prepaid Card USD"),
    ...imageUrl(
      "https://res.cloudinary.com/saasquatch/image/upload/v1644000268/squatch-assets/veHErQX.png"
    ),
    ...variableValue(20, 80, "Points"),
  }),
};

const stepsData = (start, end, inc) => {
  const steps = [];
  for (let i = start; i <= end; i += inc) {
    steps.push({
      sourceValue: i,
      prettySourceValue: i + " SaaSquatch Points",
      destinationValue: i,
      prettyDestinationValue: "$" + i,
      available: true,
      unavailableReasonCode: null,
    });
  }
  return steps;
};

const baseStep = (
  dst,
  dstUnit,
  src,
  srcUnit,
  available = true,
  unavailableReason = null
) => ({
  destinationValue: dst,
  prettyDestinationValue: dstUnit + dst,
  sourceValue: src,
  prettySourceValue: src + " " + srcUnit,
  available: available,
  unavailableReasonCode: unavailableReason,
});

export const chooseAmountVariable = {
  ...baseResponse(data, "chooseAmount", {
    ...baseReward,
    ...name("Visa® Prepaid Card USD"),
    ...imageUrl(
      "https://res.cloudinary.com/saasquatch/image/upload/v1644000268/squatch-assets/veHErQX.png"
    ),
    ...variableValue(20, 80, "Points"),
    steps: [
      baseStep(20, "$", 40, "Points"),
      baseStep(30, "$", 60, "Points"),
      baseStep(40, "$", 80, "Points"),
      baseStep(50, "$", 100, "Points"),
      baseStep(60, "$", 120, "Points"),
    ],
  }),
};
export const chooseAmountVariableNoDescription = {
  ...baseResponse(data, "chooseAmount", {
    ...baseReward,
    ...name("Visa® Prepaid Card USD"),
    ...description(""),
    ...imageUrl("https://i.imgur.com/veHErQX.png"),
    ...variableValue(20, 80, "Points"),
    steps: [
      baseStep(20, "$", 40, "Points"),
      baseStep(30, "$", 60, "Points"),
      baseStep(40, "$", 80, "Points"),
      baseStep(50, "$", 100, "Points"),
      baseStep(60, "$", 120, "Points"),
    ],
  }),
};

export const chooseAmountVariableDisabled = {
  ...baseResponse(data, "chooseAmount", {
    ...baseReward,
    ...name("Visa® Prepaid Card USD"),
    ...imageUrl(
      "https://res.cloudinary.com/saasquatch/image/upload/v1644000268/squatch-assets/veHErQX.png"
    ),
    ...variableValue(20, 80, "Points"),
    steps: [
      baseStep(20, "$", 40, "Points"),
      baseStep(30, "$", 60, "Points"),
      baseStep(40, "$", 80, "Points", false, "INSUFFICIENT_REDEEMABLE_CREDIT"),
      baseStep(50, "$", 100, "Points", false, "INSUFFICIENT_REDEEMABLE_CREDIT"),
      baseStep(60, "$", 120, "Points", false, "INSUFFICIENT_REDEEMABLE_CREDIT"),
    ],
  }),
};

export const chooseAmountVariableUnavailable = {
  ...baseResponse(data, "chooseAmount", {
    ...baseReward,
    ...name("Visa® Prepaid Card USD"),
    ...imageUrl(
      "https://res.cloudinary.com/saasquatch/image/upload/v1644000268/squatch-assets/veHErQX.png"
    ),
    ...variableValue(20, 80, "Points"),
    steps: [
      baseStep(20, "$", 40, "Points"),
      baseStep(30, "$", 60, "Points"),
      baseStep(40, "$", 80, "Points", false, "US_TAX"),
      baseStep(50, "$", 100, "Points", false, "US_TAX"),
      baseStep(60, "$", 120, "Points", false, "US_TAX"),
    ],
  }),
};

export const chooseAmountFixed = {
  ...baseResponse(data, "chooseAmount", {
    ...baseReward,
    ...name("Free swag with a promo code"),
    ...imageUrl(
      "https://res.cloudinary.com/saasquatch/image/upload/v1644000252/squatch-assets/n7vC4BR.png"
    ),
    ...fixedValue("40 SaaSquatch Points"),
  }),
};

export const chooseAmountFixedNoDescription = {
  ...baseResponse(data, "chooseAmount", {
    ...baseReward,
    ...description(""),
    ...name("Free swag with a promo code"),
    ...imageUrl("https://i.imgur.com/n7vC4BR.png"),
    ...fixedValue("40 SaaSquatch Points"),
  }),
};

export const confirmFixed = {
  ...baseResponse(data, "confirmation", {
    ...baseReward,
    ...name("Free swag with a promo code"),
    ...imageUrl(
      "https://res.cloudinary.com/saasquatch/image/upload/v1644000252/squatch-assets/n7vC4BR.png"
    ),
    ...fixedValue("40 SaaSquatch Points"),
  }),
};

export const confirmVariable = {
  ...baseResponse(
    data,
    "confirmation",
    {
      ...baseReward,
      ...name("Visa® Prepaid Card USD"),
      ...imageUrl(
        "https://res.cloudinary.com/saasquatch/image/upload/v1644000268/squatch-assets/veHErQX.png"
      ),
      ...variableValue(20, 80, "Points"),
    },
    baseStep(20, "$", 40, "Points")
  ),
};

export const redemptionError = {
  ...baseResponse(
    data,
    "confirmation",
    {
      ...baseReward,
      ...name("Visa® Prepaid Card USD"),
      ...imageUrl(
        "https://res.cloudinary.com/saasquatch/image/upload/v1644000268/squatch-assets/veHErQX.png"
      ),
      ...variableValue(20, 80, "Points"),
    },
    baseStep(20, "$", 40, "Points"),
    true
  ),
};

export const queryError = {
  ...baseResponse(
    undefined,
    "chooseReward",
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    true
  ),
};

export const success = {
  ...baseResponse(
    data,
    "success",
    {
      ...baseReward,
      ...name("Free swag with a promo code"),
      ...imageUrl(
        "https://res.cloudinary.com/saasquatch/image/upload/v1644000252/squatch-assets/n7vC4BR.png"
      ),
      ...fixedValue("40 SaaSquatch Points"),
    },
    undefined,
    undefined,
    undefined,
    "4ah2-hh46-gk7r"
  ),
};

export const successVariable = {
  ...baseResponse(
    data,
    "success",
    {
      ...baseReward,
      ...name("Visa® Prepaid Card USD"),
      ...imageUrl(
        "https://res.cloudinary.com/saasquatch/image/upload/v1644000223/squatch-assets/93BvEgH.png"
      ),
      ...variableValue(20, 80, "Points"),
    },
    baseStep(20, "$", 40, "Points")
  ),
};

export const loading = {
  ...baseResponse(null, "chooseReward", null, null, false, true),
};

export const empty = {
  ...baseResponse(null, "chooseReward", null, null, false, false, null, true),
};
