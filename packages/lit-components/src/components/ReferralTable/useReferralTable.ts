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
