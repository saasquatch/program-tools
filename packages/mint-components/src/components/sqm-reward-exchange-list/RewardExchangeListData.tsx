const baseResponse = (data) => ({
  states: {
    content: {
      text: {
        notAvailableError:
          "{unavailableReason, select, US_TAX {US Tax limit} INSUFFICIENT_REDEEMABLE_CREDIT {Not enough points} other {Not available} }",
      },
    },
    redeemStage: "chooseReward",
    amount: 0,
    exchangeError: false,
    loading: false,
    selectedItem: null,
    selectedStep: null,
  },
  data: {
    exchangeList: data,
  },
  callbacks: {
    exchangeReward: null,
    resetState: null,
    setStage: null,
    setExchangeState: null,
    refs: null,
  },
  refs: null,
});

const baseReward = {
  key: "",
  name: "",
  description: "",
  imageUrl: "",
  available: true,
  unavailableReason: null,
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
  steps: [],
};

const notEnoughPoints = {
  available: false,
  unavailableReasonCode: "INSUFFICIENT_REDEEMABLE_CREDIT",
};

const usTax = {
  available: false,
  unavailableReasonCode: "US_TAX",
};

const imageUrl = (props) => ({
  imageUrl: props,
});

const description = (props) => ({
  description: props,
});

const fixedValue = (props) => ({
  prettySourceValue: props,
});

const variableValue = (min, max, text) => ({
  ruleType: "VARIABLE_CREDIT_REWARD",
  sourceMinValue: min,
  prettySourceMinValue: min + " " + text,
  sourceMaxValue: max,
  prettySourceMaxValue: max + " " + text,
});

export const test = {
  ...baseResponse([
    {
      ...baseReward,
      ...description("Free swag with a promo code"),
      ...imageUrl("https://i.imgur.com/Ds7M19I.png"),
      ...fixedValue("40 SaaSquatch Points"),
    },
    {
      ...baseReward,
      ...description("Visa® Prepaid Card USD"),
      ...imageUrl("https://i.imgur.com/4s3q2zz.png"),
      ...variableValue(20, 80, "SaaSquatch Points"),
    },
    {
      ...baseReward,
      ...description("A very exclusive gift box"),
      ...imageUrl("https://i.imgur.com/XuiJi4l.png"),
      ...fixedValue("30 SaaSquatch Points"),
    },
    {
      ...baseReward,
      ...description("$50 Store credit"),
      ...imageUrl("https://i.imgur.com/WkCMVSE.png"),
      ...fixedValue("100 SaaSquatch Points"),
    },
    {
      ...baseReward,
      ...description("Variable amount of store credit"),
      ...imageUrl("https://i.imgur.com/Jn2fE0s.png"),
      ...variableValue(20, 100, "SaaSquatch Points"),
    },
    {
      ...baseReward,
      ...notEnoughPoints,
      ...description("A very rare cactus"),
      ...imageUrl("https://i.imgur.com/CvCdpXc.png"),
      ...fixedValue("2000 SaaSquatch Points"),
    },
    {
      ...baseReward,
      ...usTax,
      ...description("$1000 Store credit"),
      ...imageUrl("https://i.imgur.com/I9FCh9Z.png"),
      ...fixedValue("2000 SaaSquatch Points"),
    },
    {
      ...baseReward,
      ...notEnoughPoints,
      ...description("A holiday gift box"),
      ...imageUrl("https://i.imgur.com/HBJS1WH.png"),
      ...fixedValue("100 SaaSquatch Points"),
    },
  ]),
};

export const test2 = {
  states: {
    content: {
      text: {
        buttonText: "Exchange Rewards",
        ignored: true,
      },
    },
    redeemStage: "chooseAmount",
    amount: 0,
    exchangeError: false,
    loading: false,
    selectedItem: {
      key: "r4",
      name: "Salmon Coins",
      description: "Points for Salmon Coins",
      imageUrl:
        "data:image/jpeg;base64,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",
      available: true,
      unavailableReason: null,
      unavailableReasonCode: null,
      ruleType: "VARIABLE_CREDIT_REWARD",
      sourceUnit: "POINT",
      sourceValue: null,
      prettySourceValue: null,
      sourceMinValue: 1,
      prettySourceMinValue: "1 Point",
      sourceMaxValue: 100,
      prettySourceMaxValue: "100 Points",
      destinationMinValue: 1,
      prettyDestinationMinValue: "1 Salmon Coin",
      destinationMaxValue: 100,
      prettyDestinationMaxValue: "100 Salmons",
      globalRewardKey: null,
      destinationUnit: "TESTUNIT",
      steps: [
        {
          sourceValue: 1,
          prettySourceValue: "1 Point",
          destinationValue: 1,
          prettyDestinationValue: "1 Salmon Coin",
          available: true,
          unavailableReasonCode: null,
          unavailableReason: "",
        },
        {
          sourceValue: 2,
          prettySourceValue: "2 Points",
          destinationValue: 2,
          prettyDestinationValue: "2 Salmons",
          available: true,
          unavailableReasonCode: null,
          unavailableReason: "",
        },
        {
          sourceValue: 3,
          prettySourceValue: "3 Points",
          destinationValue: 3,
          prettyDestinationValue: "3 Salmons",
          available: true,
          unavailableReasonCode: null,
          unavailableReason: "",
        },
        {
          sourceValue: 4,
          prettySourceValue: "4 Points",
          destinationValue: 4,
          prettyDestinationValue: "4 Salmons",
          available: true,
          unavailableReasonCode: null,
          unavailableReason: "",
        },
        {
          sourceValue: 5,
          prettySourceValue: "5 Points",
          destinationValue: 5,
          prettyDestinationValue: "5 Salmons",
          available: true,
          unavailableReasonCode: null,
          unavailableReason: "",
        },
      ],
    },
    selectedStep: null,
  },
  data: {
    exchangeList: null,
  },
  callbacks: {
    exchangeReward: null,
    resetState: null,
    setStage: null,
    setExchangeState: null,
    refs: {
      drawerRef: {},
    },
  },
  refs: null,
};
