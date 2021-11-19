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
import { SlDrawer } from "@shoelace-style/shoelace";
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
    const exchangeVariables = {
      accountId: user?.accountId,
      userId: user.id,
      redeemCreditInput: {
        amount: selectedItem.name,
        unit: "POINT",
      },
      globalRewardKey: "gc1",
    };

    console.log(exchangeVariables);
    // exchange({ exchangeRewardInput: exchangeVariables });
  }

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
    },
  };
}
