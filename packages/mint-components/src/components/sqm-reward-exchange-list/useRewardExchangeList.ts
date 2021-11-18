import {
  useProgramId,
  useUserIdentity,
  useQuery,
  useMutation,
} from "@saasquatch/component-boilerplate";
import { gql } from "graphql-request";
import { SqmRewardExchangeList } from "./sqm-reward-exchange-list";
import { RewardExchangeViewProps } from "./sqm-reward-exchange-list-view";

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
  const programId = useProgramId();
  const user = useUserIdentity();

  const [exchange, { data: exchangeResponse, errors }] = useMutation(EXCHANGE);

  const { data } = useQuery(GET_EXCHANGE_LIST, !user?.jwt);

  return {
    states: {
      content: props,
    },
    data: {
      exchangeList: data?.viewer?.visibleRewardExchanges?.data,
    },
    callbacks: {
      exchange,
    },
  };
}
