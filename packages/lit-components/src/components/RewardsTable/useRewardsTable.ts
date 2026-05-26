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

export function useDemoRewardsTable(props: RewardsTableProps): ReturnType<typeof useRewardsTable> {
  const perPage = Number(props.perPage) || 4;
  const [currentPage, setCurrentPage] = useState(0);
  const mockRewards = [
    {
      id: '1',
      type: 'CREDIT',
      value: 1000,
      unit: 'POINT',
      prettyValue: '$10.00',
      dateGiven: '2024-01-15',
      dateExpires: null,
      statuses: ['AVAILABLE'],
      fuelTankCode: null,
      programId: 'program1',
      sourceUser: { firstName: 'Jane', lastName: 'Doe' },
    },
    {
      id: '2',
      type: 'CREDIT',
      value: 500,
      unit: 'POINT',
      prettyValue: '$5.00',
      dateGiven: '2024-02-10',
      dateExpires: '2025-02-10',
      statuses: ['AVAILABLE'],
      fuelTankCode: null,
      programId: 'program1',
      sourceUser: { firstName: 'Bob', lastName: 'Smith' },
    },
    {
      id: '3',
      type: 'FUEL_TANK',
      value: 2500,
      unit: 'CENT',
      prettyValue: '$25.00',
      dateGiven: '2024-03-05',
      dateExpires: null,
      statuses: ['AVAILABLE'],
      fuelTankCode: 'CODE123',
      programId: 'program1',
      sourceUser: null,
    },
  ];
  const rewards = mockRewards.slice(currentPage * perPage, (currentPage + 1) * perPage);
  const totalCount = mockRewards.length;
  const totalPages = Math.ceil(totalCount / perPage);

  function nextPage() {
    if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1);
  }

  function prevPage() {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  }

  return {
    rewards,
    loading: false,
    totalCount,
    totalPages,
    currentPage,
    nextPage,
    prevPage,
    empty: rewards.length === 0,
  };
}
