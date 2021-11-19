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
  const [selectedItem, setSelectedItem] = useState(undefined);
  const programId = useProgramId();
  const user = useUserIdentity();

  const [exchange, { data: exchangeResponse, errors }] = useMutation(EXCHANGE);

  const { data } = useQuery(GET_EXCHANGE_LIST, !user?.jwt);

  function setDrawer(item) {
    console.log({ item });
    drawerRef.current.label = item.description;
    setSelectedItem(item);
    drawerRef.current?.show();
  }

  function exchangeReward() {
    if (!selectedItem) return;

    let exchangeVariables: { [key: string]: any } = {
      accountId: user?.accountId,
      userId: user.id,
    };

    switch (selectedItem.type) {
      case "FIXED_GLOBAL_REWARD":
        exchangeVariables = {
          ...exchangeVariables,
          redeemCreditInput: {
            amount: selectedItem.value,
            unit: selectedItem.unit,
          },
          globalRewardKey: selectedItem.globalRewardKey,
        };
        break;
      case "VARIABLE_GLOBAL_REWARD":
        exchangeVariables = {
          ...exchangeVariables,
          redeemCreditInput: {
            amount: inputRef?.current?.value,
            unit: selectedItem.unit,
          },
          globalRewardKey: selectedItem.globalRewardKey,
          rewardInput: {
            valueInCents: Math.ceil(selectedItem.value * selectedItem.rate),
          },
        };
        break;
      case "VARIABLE_CREDIT_REWARD":
        exchangeVariables = {
          ...exchangeVariables,
          redeemCreditInput: {
            amount: inputRef?.current?.value,
            unit: selectedItem.unit,
          },
          rewardInput: {
            type: "CREDIT",
            unit: selectedItem.rewardUnit,
            assignedCredit: Math.ceil(selectedItem.value * selectedItem.rate),
          },
        };
        break;
      default:
        exchangeVariables = {
          ...exchangeVariables,
          redeemCreditInput: {
            amount: selectedItem.value,
            unit: selectedItem.unit,
          },
          globalRewardKey: "gc1",
        };
    }

    console.log(exchangeVariables);
    exchange({ exchangeRewardInput: exchangeVariables });
  }

  useEffect(() => {
    if (!drawerRef?.current || !inputRef.current) return;
    const drawer = drawerRef.current;
    // Clear input value when drawer is closed
    drawer.addEventListener("sl-hide", () => (inputRef.current.value = ""));
    return () => {
      drawer.removeEventListener(
        "sl-hide",
        () => (inputRef.current.value = "")
      );
    };
  }, [drawerRef.current, inputRef.current]);

  return {
    states: {
      content: props,
      selectedItem,
    },
    data: {
      exchangeList: data?.viewer?.visibleRewardExchanges?.data,
    },
    callbacks: {
      exchangeReward,
      setDrawer,
    },
    refs: {
      drawerRef,
      inputRef,
    },
  };
}
