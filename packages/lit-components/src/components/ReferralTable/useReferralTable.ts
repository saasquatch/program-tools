import { useProgramId, useQuery, useUserIdentity } from '@saasquatch/component-boilerplate';
import { useState } from '@saasquatch/universal-hooks';
import { gql } from 'graphql-request';
import { ReferralTableProps } from './ReferralTable';

const REFERRAL_TABLE_QUERY = gql`
  query getReferrals($programId: ID, $offset: Int, $limit: Int) {
    user: viewer {
      ... on User {
        referrals(filter: { programId_eq: $programId }, limit: $limit, offset: $offset) {
          totalCount
          count
          data {
            dateReferralStarted
            dateConverted
            referredUser {
              firstName
              lastName
            }
            rewards {
              prettyValue
              type
              statuses
            }
            dateModerated
          }
        }
      }
    }
  }
`;

export function useReferralTable(props: ReferralTableProps) {
  const programId = useProgramId() || props.programId;
  const user = useUserIdentity();
  const perPage = Number(props.perPage) || 4;
  const [currentPage, setCurrentPage] = useState(0);

  const { data, loading } = useQuery(
    REFERRAL_TABLE_QUERY,
    { programId, offset: currentPage * perPage, limit: perPage },
    !user?.jwt
  );

  const referrals = data?.user?.referrals?.data || [];
  const totalCount = data?.user?.referrals?.totalCount || 0;
  const totalPages = Math.ceil(totalCount / perPage);

  function nextPage() {
    if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1);
  }

  function prevPage() {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  }

  return {
    referrals,
    loading,
    totalCount,
    totalPages,
    currentPage,
    nextPage,
    prevPage,
    empty: !loading && referrals.length === 0,
  };
}

export function useDemoReferralTable(props: ReferralTableProps): ReturnType<typeof useReferralTable> {
  const perPage = Number(props.perPage) || 4;
  const [currentPage, setCurrentPage] = useState(0);
  const mockReferrals = [
    {
      dateReferralStarted: '2024-01-15',
      dateConverted: '2024-01-20',
      referredUser: { firstName: 'Jane', lastName: 'Doe' },
      rewards: [{ prettyValue: '$10.00', type: 'CREDIT', statuses: ['AVAILABLE'] }],
      dateModerated: null,
    },
    {
      dateReferralStarted: '2024-02-10',
      dateConverted: null,
      referredUser: { firstName: 'Bob', lastName: 'Smith' },
      rewards: [],
      dateModerated: null,
    },
    {
      dateReferralStarted: '2024-03-05',
      dateConverted: '2024-03-10',
      referredUser: { firstName: 'Alice', lastName: 'Jones' },
      rewards: [{ prettyValue: '$5.00', type: 'CREDIT', statuses: ['AVAILABLE'] }],
      dateModerated: null,
    },
  ];
  const referrals = mockReferrals.slice(currentPage * perPage, (currentPage + 1) * perPage);
  const totalCount = mockReferrals.length;
  const totalPages = Math.ceil(totalCount / perPage);

  function nextPage() {
    if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1);
  }

  function prevPage() {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  }

  return {
    referrals,
    loading: false,
    totalCount,
    totalPages,
    currentPage,
    nextPage,
    prevPage,
    empty: referrals.length === 0,
  };
}
