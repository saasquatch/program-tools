import {
  useProgramId,
  useUserIdentity,
  useQuery,
  useMutation,
} from "@saasquatch/component-boilerplate";
import { gql } from "graphql-request";
import { SqmRewardExchangeList } from "./sqm-reward-exchange-list";
import { RewardExchangeViewProps } from "./sqm-reward-exchange-list-view";
import { useEffect, useRef, useState } from "@saasquatch/universal-hooks";
import { SlDrawer, SlInput } from "@shoelace-style/shoelace";

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

const GET_EXCHANGE_LIST = gql`
  query getExchangeList {
    viewer {
      ... on User {
        visibleRewardExchanges(limit: 20, offset: 0) {
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

export function useRewardExchangeList(
  props: SqmRewardExchangeList
): RewardExchangeViewProps {
  const drawerRef = useRef<SlDrawer>();
  const inputRef = useRef<SlInput>();
  const [selectedItem, setSelectedItem] = useState<ExchangeItem>(undefined);
  const [redeemStage, setRedeemStage] = useState("");
  const programId = useProgramId();
  const user = useUserIdentity();

  const [exchange, { data: exchangeResponse, errors }] = useMutation(EXCHANGE);

  const { data } = useQuery(GET_EXCHANGE_LIST, !user?.jwt);

  function openDrawer() {
    setRedeemStage("chooseReward");
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
            amount: inputRef?.current?.value,
            unit: selectedItem.sourceUnit,
          },
          globalRewardKey: selectedItem.globalRewardKey,
          rewardInput: {
            // valueInCents: selectedItem.destination
          },
        };
        break;
      case "VARIABLE_CREDIT_REWARD":
        exchangeVariables = {
          ...exchangeVariables,
          redeemCreditInput: {
            amount: inputRef?.current?.value,
            unit: selectedItem.sourceUnit,
          },
          rewardInput: {
            type: "CREDIT",
            unit: selectedItem.destinationUnit,
            assignedCredit: inputRef?.current?.value,
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

  function selectReward(item: ExchangeItem) {
    setSelectedItem(item);
  }

  useEffect(() => {
    if (!drawerRef?.current || !inputRef.current) return;
    const drawer = drawerRef.current;
    // Clear input value when drawer is closed
    drawer.addEventListener("sl-hide", () => (inputRef.current = undefined));
    return () => {
      drawer.removeEventListener(
        "sl-hide",
        () => (inputRef.current = undefined)
      );
    };
  }, [drawerRef.current, inputRef.current]);

  function nextStage() {
    if (selectedItem?.ruleType === "FIXED_GLOBAL_REWARD") {
      setRedeemStage("confirmation");
    } else {
      if (redeemStage === "chooseReward") {
        drawerRef.current.label = selectedItem?.description;
        setRedeemStage("chooseAmount");
      } else {
        setRedeemStage("confirmation");
      }
    }
  }

  return {
    states: {
      content: props,
      selectedItem,
      redeemStage,
    },
    data: {
      exchangeList: data?.viewer?.visibleRewardExchanges?.data,
    },
    callbacks: {
      exchangeReward,
      openDrawer,
      setRedeemStage,
      nextStage,
      setSelectedItem,
    },
    refs: {
      drawerRef,
      inputRef,
    },
  };
}
