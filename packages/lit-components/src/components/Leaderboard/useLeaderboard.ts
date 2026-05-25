import { useProgramId, useQuery, useUserIdentity } from '@saasquatch/component-boilerplate';
import { useState } from '@saasquatch/universal-hooks';
import { gql } from 'graphql-request';
import type { LeaderboardProps, LeaderboardRow } from './Leaderboard';

interface LeaderboardQueryResult {
  leaderboard?: {
    rows?: Array<LeaderboardRow | null> | null;
  } | null;
}

export interface LeaderboardHookResult {
  rows: LeaderboardRow[];
  loading: boolean;
  empty: boolean;
}

const LEADERBOARD_QUERY = gql`
  query getLeaderboard($type: String!, $filter: LeaderboardFilterInput, $limit: Int) {
    leaderboard(type: $type, filter: $filter, limit: $limit) {
      rows {
        rank
        firstName
        lastInitial
        value
        statValue
      }
    }
  }
`;

const DEMO_ROWS: LeaderboardRow[] = [
  { rank: 1, firstName: 'Morgan', lastInitial: 'L', statValue: 42 },
  { rank: 2, firstName: 'Avery', lastInitial: 'K', statValue: 36 },
  { rank: 3, firstName: 'Jordan', lastInitial: 'P', statValue: 29 },
  { rank: 4, firstName: 'Casey', lastInitial: 'N', statValue: 21 },
  { rank: 5, firstName: 'Taylor', lastInitial: 'R', statValue: 18 },
];

export function useLeaderboard(props: LeaderboardProps): LeaderboardHookResult {
  const programId = useProgramId() || props.programId;
  const user = useUserIdentity();
  const limit = Number(props.maxRows) || 10;

  const { data, loading } = useQuery<LeaderboardQueryResult>(
    LEADERBOARD_QUERY,
    {
      type: props.leaderboardType,
      filter: programId ? { programId_eq: programId } : {},
      limit,
    },
    !user?.jwt
  );

  const rows = (data?.leaderboard?.rows || []).filter((row): row is LeaderboardRow => Boolean(row));
  return { rows, loading, empty: !loading && rows.length === 0 };
}

export function useDemoLeaderboard(props: LeaderboardProps): LeaderboardHookResult {
  const [rows] = useState<LeaderboardRow[]>(DEMO_ROWS);
  const limit = Number(props.maxRows) || 10;
  const limitedRows = rows.slice(0, limit);

  return { rows: limitedRows, loading: false, empty: limitedRows.length === 0 };
}
