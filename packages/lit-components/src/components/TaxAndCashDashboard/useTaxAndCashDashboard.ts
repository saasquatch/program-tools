import { useProgramId, useQuery, useUserIdentity } from '@saasquatch/component-boilerplate';
import { gql } from 'graphql-request';
import { TaxAndCashDashboardProps } from './TaxAndCashDashboard';

const DASHBOARD_QUERY = gql`
  query getTaxDashboard($programId: ID) {
    viewer {
      ... on User {
        taxHandling(programId: $programId) {
          publisher {
            userInfoStatus
            taxFormStatus
            indirectTaxFormStatus
            bankingInfoStatus
            payoutStatus
          }
        }
      }
    }
  }
`;

export function useTaxAndCashDashboard(props: TaxAndCashDashboardProps) {
  const programId = useProgramId() || props.programId;
  const user = useUserIdentity();
  const { data, loading } = useQuery(DASHBOARD_QUERY, { programId }, !user?.jwt);

  const publisher = data?.viewer?.taxHandling?.publisher;

  const steps = [
    {
      label: props.userInfoLabel || 'Personal Information',
      status: publisher?.userInfoStatus || 'NOT_STARTED',
      key: 'user-info',
    },
    {
      label: props.taxFormLabel || 'Tax Information',
      status: publisher?.taxFormStatus || 'NOT_STARTED',
      key: 'tax-form',
    },
    {
      label: props.bankingInfoLabel || 'Banking Information',
      status: publisher?.bankingInfoStatus || 'NOT_STARTED',
      key: 'banking-info',
    },
    {
      label: props.payoutLabel || 'Payout',
      status: publisher?.payoutStatus || 'NOT_STARTED',
      key: 'payout',
    },
  ];

  function getStatusText(status: string) {
    switch (status) {
      case 'COMPLETE':
        return props.completeText || 'Complete';
      case 'PENDING':
      case 'PENDING_REVIEW':
        return props.pendingText || 'Pending';
      default:
        return props.incompleteText || 'Incomplete';
    }
  }

  function getStatusVariant(status: string) {
    switch (status) {
      case 'COMPLETE':
        return 'success';
      case 'PENDING':
      case 'PENDING_REVIEW':
        return 'warning';
      default:
        return 'neutral';
    }
  }

  return { steps, loading, getStatusText, getStatusVariant };
}

export function useDemoTaxAndCashDashboard(
  props: TaxAndCashDashboardProps
): ReturnType<typeof useTaxAndCashDashboard> {
  const steps = [
    {
      label: props.userInfoLabel || 'Personal Information',
      status: 'COMPLETE',
      key: 'user-info',
    },
    {
      label: props.taxFormLabel || 'Tax Information',
      status: 'PENDING',
      key: 'tax-form',
    },
    {
      label: props.bankingInfoLabel || 'Banking Information',
      status: 'NOT_STARTED',
      key: 'banking-info',
    },
    {
      label: props.payoutLabel || 'Payout',
      status: 'NOT_STARTED',
      key: 'payout',
    },
  ];

  function getStatusText(status: string) {
    switch (status) {
      case 'COMPLETE':
        return props.completeText || 'Complete';
      case 'PENDING':
      case 'PENDING_REVIEW':
        return props.pendingText || 'Pending';
      default:
        return props.incompleteText || 'Incomplete';
    }
  }

  function getStatusVariant(status: string) {
    switch (status) {
      case 'COMPLETE':
        return 'success';
      case 'PENDING':
      case 'PENDING_REVIEW':
        return 'warning';
      default:
        return 'neutral';
    }
  }

  return { steps, loading: false, getStatusText, getStatusVariant };
}
