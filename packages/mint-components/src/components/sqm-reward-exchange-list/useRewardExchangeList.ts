import {
  useProgramId,
  useUserIdentity,
  useQuery,
  useMutation,
} from "@saasquatch/component-boilerplate";
import { gql } from "graphql-request";
import { SqmRewardExchangeList } from "./sqm-reward-exchange-list";
import { RewardExchangeViewProps } from "./sqm-reward-exchange-list-view";
import {
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "@saasquatch/universal-hooks";
import { SlDrawer } from "@shoelace-style/shoelace";

export type ExchangeItem = {
  key: string;
  name: string;
  description: string;
  imageUrl: string;
  available: boolean;
  unavailableReason: string;
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
  steps?: {
    sourceValue: number;
    prettySourceValue: string;
    destinationValue: number;
    prettyDestinationValue: string;
  }[];
};

export type ExchangeStep = {
  destinationValue: number;
  sourceValue: number;
  prettyDestinationValue: string;
  prettySourceValue: string;
};

export type Stages = "" | "chooseReward" | "chooseAmount" | "confirmation";
const GET_EXCHANGE_LIST = gql`
  query getExchangeList {
    viewer {
      ... on User {
        visibleRewardExchangeItems(limit: 20, offset: 0) {
          data {
            key
            name
            description
            imageUrl
            available
            unavailableReason
            unavailableReasonCode
            ruleType
            sourceUnit
            sourceValue
            prettySourceValue
            sourceMinValue
            prettySourceMinValue
            sourceMaxValue
            prettySourceMaxValue
            destinationMinValue
            prettyDestinationMinValue
            destinationMaxValue
            prettyDestinationMaxValue
            globalRewardKey
            destinationUnit
            steps {
              sourceValue
              prettySourceValue
              destinationValue
              prettyDestinationValue
            }
          }
          totalCount
        }
      }
    }
  }
`;

const EXCHANGE = gql`
  mutation exchange($exchangeRewardInput: ExchangeRewardInput!) {
    exchangeReward(exchangeRewardInput: $exchangeRewardInput) {
      reward {
        id
      }
    }
  }
`;
export type ExchangeState = {
  selectedItem: ExchangeItem;
  selectedStep: ExchangeStep;
  redeemStage: string;
  amount: number;
  success: boolean;
};

export function useRewardExchangeList(
  _: SqmRewardExchangeList
): RewardExchangeViewProps {
  const drawerRef = useRef<SlDrawer>();

  const [exchangeState, setExchangeState] = useReducer<
    ExchangeState,
    Partial<ExchangeState>
  >(
    (state, next) => ({
      ...state,
      ...next,
    }),
    {
      selectedItem: undefined,
      selectedStep: undefined,
      redeemStage: "",
      amount: 0,
      success: false,
    }
  );

  const { selectedItem, selectedStep, redeemStage, amount, success } =
    exchangeState;

  const user = useUserIdentity();

  const [exchange, { data: exchangeResponse, errors }] = useMutation(EXCHANGE);

  const { data } = useQuery(GET_EXCHANGE_LIST, !user?.jwt);

  useEffect(() => {
    if (exchangeResponse?.exchangeReward?.reward?.id) {
      setExchangeState({ success: true });
    }
  }, [exchangeResponse]);

  function openDrawer() {
    setExchangeState({ redeemStage: "chooseReward" });
    drawerRef.current?.show();
  }

  function exchangeReward() {
    if (!selectedItem) return;

    let exchangeVariables: { [key: string]: any } = {
      accountId: user?.accountId,
      userId: user.id,
    };

    switch (selectedItem.ruleType) {
      case "FIXED_GLOBAL_REWARD":
        exchangeVariables = {
          ...exchangeVariables,
          redeemCreditInput: {
            amount: selectedItem.sourceValue,
            unit: selectedItem.sourceUnit,
          },
          globalRewardKey: selectedItem.globalRewardKey,
        };
        break;
      case "VARIABLE_GLOBAL_REWARD":
        exchangeVariables = {
          ...exchangeVariables,
          redeemCreditInput: {
            amount: amount,
            unit: selectedItem.sourceUnit,
          },
          globalRewardKey: selectedItem.globalRewardKey,
          rewardInput: {
            valueInCents: selectedStep.destinationValue || amount,
          },
        };
        break;
      case "VARIABLE_CREDIT_REWARD":
        exchangeVariables = {
          ...exchangeVariables,
          redeemCreditInput: {
            amount: amount,
            unit: selectedItem.sourceUnit,
          },
          rewardInput: {
            type: "CREDIT",
            unit: selectedItem.destinationUnit,
            assignedCredit: amount || selectedStep.destinationValue,
          },
        };
        break;
      default:
        exchangeVariables = {
          ...exchangeVariables,
          redeemCreditInput: {
            amount: selectedItem.sourceValue,
            unit: selectedItem.sourceUnit,
          },
          globalRewardKey: selectedItem.globalRewardKey,
        };
    }

    console.log(exchangeVariables);
    exchange({ exchangeRewardInput: exchangeVariables });
  }

  const resetState = useCallback((e) => {
    // selects also trigger an sl-hide event :(
    //@ts-ignore - componentId is not private here
    if (e?.target?.componentId !== drawerRef.current?.componentId) return;

    console.log("go!");
    setExchangeState({
      amount: 0,
      selectedStep: undefined,
      selectedItem: undefined,
      success: false,
    });
  }, []);

  useEffect(() => {
    if (!drawerRef?.current) return;
    const drawer = drawerRef.current;
    // Clear input value when drawer is closed
    drawer.addEventListener("sl-hide", resetState);
    return () => {
      drawer.removeEventListener("sl-hide", resetState);
    };
  }, [drawerRef.current]);

  function setStage(stage?: Stages) {
    setExchangeState({ redeemStage: stage });
  }

  return {
    states: {
      selectedItem,
      redeemStage,
      amount,
      selectedStep,
      success,
    },
    data: {
      exchangeList: data?.viewer?.visibleRewardExchangeItems?.data,
    },
    callbacks: {
      exchangeReward,
      openDrawer,
      setExchangeState,
      setStage
    },
    refs: {
      drawerRef,
    },
  };
}
