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
} from "@saasquatch/universal-hooks";

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
  steps?: ExchangeStep[];
};

export type ExchangeStep = {
  destinationValue: number;
  sourceValue: number;
  prettyDestinationValue: string;
  prettySourceValue: string;
  available: boolean;
  unavailableReasonCode: string;
  unavailableReason:string;
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
              available
              unavailableReasonCode
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
        fuelTankCode
      }
    }
  }
`;
export type ExchangeState = {
  selectedItem: ExchangeItem;
  selectedStep: ExchangeStep;
  redeemStage: string;
  amount: number;
  exchangeError: boolean;
};

export function useRewardExchangeList(
  props: SqmRewardExchangeList
): RewardExchangeViewProps {
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
      redeemStage: "chooseReward",
      amount: 0,
      exchangeError: false,
    }
  );

  const { selectedItem, selectedStep, redeemStage, amount, exchangeError } =
    exchangeState;

  const user = useUserIdentity();

  const [exchange, { data: exchangeResponse, errors }] = useMutation(EXCHANGE);

  const { data, loading, refetch } = useQuery(GET_EXCHANGE_LIST, !user?.jwt);

  useEffect(() => {
    if (exchangeResponse?.exchangeReward?.reward?.id) {
      setExchangeState({ redeemStage: "success", exchangeError: false });
    }
    if (!!errors) {
      setExchangeState({ exchangeError: true });
    }
  }, [exchangeResponse, errors]);

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
            valueInCents: selectedStep.destinationValue,
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
            assignedCredit: selectedStep.destinationValue,
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
    exchange({ exchangeRewardInput: exchangeVariables });
  }

  const resetState = (refresh: boolean) => {
    refresh && refetch();
    setExchangeState({
      amount: 0,
      selectedStep: undefined,
      selectedItem: undefined,
      exchangeError: false,
      redeemStage: "chooseReward",
    });
  };
  function setStage(stage?: Stages) {
    setExchangeState({ redeemStage: stage });
  }
  return {
    states: {
      content: {
        text: props,
      },
      selectedItem,
      redeemStage,
      amount,
      selectedStep,
      exchangeError,
      loading,
    },
    data: {
      exchangeList: data?.viewer?.visibleRewardExchangeItems?.data,
      fuelTankCode: exchangeResponse?.exchangeReward?.reward?.fuelTankCode,
    },
    callbacks: {
      exchangeReward,
      setExchangeState,
      setStage,
      resetState,
    },
  };
}
