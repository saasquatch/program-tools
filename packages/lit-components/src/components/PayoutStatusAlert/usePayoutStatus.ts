import { useProgramId, useQuery, useUserIdentity } from '@saasquatch/component-boilerplate';
import { gql } from 'graphql-request';
import { PayoutStatusAlertProps } from './PayoutStatusAlert';

const PAYOUT_STATUS_QUERY = gql`
  query getPayoutStatus($programId: ID) {
    viewer {
      ... on User {
        payoutDetails(programId: $programId) {
          payoutStatus
        }
      }
    }
  }
`;

export function usePayoutStatus(props: PayoutStatusAlertProps) {
  const programId = useProgramId() || props.programId;
  const user = useUserIdentity();
  const { data, loading } = useQuery(PAYOUT_STATUS_QUERY, { programId }, !user?.jwt);

  const status = data?.viewer?.payoutDetails?.payoutStatus || '';

  function getVariant() {
    switch (status) {
      case 'APPROVED':
        return 'success';
      case 'DENIED':
        return 'danger';
      case 'PENDING':
        return 'warning';
      default:
        return 'neutral';
    }
  }

  function getText() {
    switch (status) {
      case 'APPROVED':
        return props.approvedText;
      case 'DENIED':
        return props.deniedText;
      case 'PENDING':
        return props.pendingText;
      default:
        return '';
    }
  }

  return { status, loading, variant: getVariant(), text: getText() };
}

export function useDemoPayoutStatus(
  props: PayoutStatusAlertProps
): ReturnType<typeof usePayoutStatus> {
  return {
    status: 'PENDING',
    loading: false,
    variant: 'warning',
    text: props.pendingText,
  };
}
