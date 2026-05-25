import { useProgramId, useQuery, useUserIdentity } from '@saasquatch/component-boilerplate';
import { gql } from 'graphql-request';
import { RewardExchangeListProps } from './RewardExchangeList';

const REWARDS_QUERY = gql`
  query getRewardExchanges($programId: ID) {
    user: viewer {
      ... on User {
        rewardBalanceDetails(programId: $programId) {
          type
          unit
          value
          prettyValue
          exchangeList {
            id
            name
            description
            imageUrl
            costPrettyValue
            costValue
            available
          }
        }
      }
    }
  }
`;

export function useRewardExchangeList(props: RewardExchangeListProps) {
  const programId = useProgramId() || props.programId;
  const user = useUserIdentity();
  const { data, loading } = useQuery(REWARDS_QUERY, { programId }, !user?.jwt);

  const balanceDetails = data?.user?.rewardBalanceDetails || [];
  const balance = balanceDetails[0];
  const exchanges = balance?.exchangeList || [];
  const currentBalance = balance?.prettyValue || '0';

  return { exchanges, currentBalance, loading, empty: !loading && exchanges.length === 0 };
}
