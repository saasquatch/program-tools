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

export function useDemoRewardExchangeList(_props: RewardExchangeListProps): ReturnType<typeof useRewardExchangeList> {
  const exchanges = [
    {
      id: '1',
      name: '$5 Gift Card',
      description: 'Redeem for a $5 gift card',
      imageUrl: '',
      costPrettyValue: '$5.00',
      costValue: 500,
      available: true,
    },
    {
      id: '2',
      name: '$10 Gift Card',
      description: 'Redeem for a $10 gift card',
      imageUrl: '',
      costPrettyValue: '$10.00',
      costValue: 1000,
      available: true,
    },
    {
      id: '3',
      name: '$25 Gift Card',
      description: 'Redeem for a $25 gift card',
      imageUrl: '',
      costPrettyValue: '$25.00',
      costValue: 2500,
      available: false,
    },
  ];

  return { exchanges, currentBalance: '$50.00', loading: false, empty: false };
}
