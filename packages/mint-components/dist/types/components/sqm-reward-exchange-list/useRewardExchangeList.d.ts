import { SqmRewardExchangeList } from "./sqm-reward-exchange-list";
import { RewardExchangeViewProps } from "./sqm-reward-exchange-list-view";
export declare type ExchangeItem = {
  key: string;
  name: string;
  description: string;
  imageUrl: string;
  available: boolean;
  unavailableReasonCode: string;
  ruleType: string;
  sourceUnit: string;
  sourceValue: number;
  prettySourceValue: string;
  sourceMinValue: number;
  prettySourceMinValue: string;
  sourceMaxValue: number;
  prettySourceMaxValue: string;
  destinationMinValue: number;
  prettyDestinationMinValue: string;
  destinationMaxValue: number;
  prettyDestinationMaxValue: string;
  globalRewardKey: string;
  destinationUnit: string;
  steps?: ExchangeStep[];
};
export declare type ExchangeStep = {
  destinationValue: number;
  sourceValue: number;
  prettyDestinationValue: string;
  prettySourceValue: string;
  available: boolean;
  unavailableReasonCode: string;
  globalRewardKey: string;
  rewardInput: ExchangeInput;
};
export declare type ExchangeInput = {
  accountId: string;
  userId: string;
  redeemCreditInput?: {
    amount: number;
    unit: string;
  };
  rewardInput?: {
    type: string;
    unit: string;
    assignedCredit?: number;
    valueInCents?: number;
  };
  globalRewardKey?: string;
};
export declare type Stages = "" | "chooseReward" | "chooseAmount" | "confirmation";
export declare type ExchangeState = {
  selectedItem: ExchangeItem;
  selectedStep: ExchangeStep;
  redeemStage: string;
  amount: number;
  exchangeError: boolean;
};
export declare function useRewardExchangeList(props: SqmRewardExchangeList): RewardExchangeViewProps;
