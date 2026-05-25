import { useProgramId, useQuery, useUserIdentity } from '@saasquatch/component-boilerplate';
import { useState } from '@saasquatch/universal-hooks';
import { gql } from 'graphql-request';
import { RewardsTableProps } from './RewardsTable';

const REWARDS_TABLE_QUERY = gql`
  query getRewards($programId: ID, $offset: Int, $limit: Int) {
    user: viewer {
      ... on User {
        rewards(filter: { programId_eq: $programId }, limit: $limit, offset: $offset) {
          totalCount
          count
          data {
            id
            type
            value
            unit
            prettyValue
            dateGiven
            dateExpires
            statuses
            fuelTankCode
            programId
            sourceUser {
              firstName
              lastName
            }
          }
        }
      }
    }
  }
`;

export function useRewardsTable(props: RewardsTableProps) {
  const programId = useProgramId() || props.programId;
  const user = useUserIdentity();
  const perPage = Number(props.perPage) || 4;
  const [currentPage, setCurrentPage] = useState(0);

  const { data, loading } = useQuery(
    REWARDS_TABLE_QUERY,
    { programId, offset: currentPage * perPage, limit: perPage },
    !user?.jwt
  );

  const rewards = data?.user?.rewards?.data || [];
  const totalCount = data?.user?.rewards?.totalCount || 0;
  const totalPages = Math.ceil(totalCount / perPage);

  function nextPage() {
    if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1);
  }

  function prevPage() {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  }

  return {
    rewards,
    loading,
    totalCount,
    totalPages,
    currentPage,
    nextPage,
    prevPage,
    empty: !loading && rewards.length === 0,
  };
}
