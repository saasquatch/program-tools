import { useProgramId, useQuery, useUserIdentity } from '@saasquatch/component-boilerplate';
import { gql } from 'graphql-request';
import { PayoutDetailsCardProps } from './PayoutDetailsCard';

const PAYOUT_QUERY = gql`
  query getPayoutDetails($programId: ID) {
    viewer {
      ... on User {
        payoutDetails(programId: $programId) {
          nextPayoutDate
          availableBalance
          currency
          payoutMethod
        }
      }
    }
  }
`;

export function usePayoutDetailsCard(props: PayoutDetailsCardProps) {
  const programId = useProgramId() || props.programId;
  const user = useUserIdentity();
  const { data, loading } = useQuery(PAYOUT_QUERY, { programId }, !user?.jwt);

  const details = data?.viewer?.payoutDetails;

  return {
    loading,
    nextPayoutDate: details?.nextPayoutDate || 'N/A',
    availableBalance: details?.availableBalance || '$0.00',
    currency: details?.currency || 'USD',
    payoutMethod: details?.payoutMethod || 'Not configured',
  };
}

export function useDemoPayoutDetailsCard(
  _props: PayoutDetailsCardProps
): ReturnType<typeof usePayoutDetailsCard> {
  return {
    loading: false,
    nextPayoutDate: 'March 14, 2024',
    availableBalance: '$100.00',
    currency: 'USD',
    payoutMethod: 'Bank transfer',
  };
}
