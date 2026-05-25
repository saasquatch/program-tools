import { useProgramId, useQuery, useUserIdentity } from '@saasquatch/component-boilerplate';
import { useState } from '@saasquatch/universal-hooks';
import { gql } from 'graphql-request';
import type { LeaderboardRankProps } from './LeaderboardRank';

interface RankQueryResult {
  viewer?: {
    leaderboardRank?: {
      rank?: number | null;
    } | null;
  } | null;
}

export interface LeaderboardRankHookResult {
  rank?: number;
  rankText: string;
  loading: boolean;
}

const RANK_QUERY = gql`
  query getRank($type: String!, $filter: UserLeaderboardFilterInput) {
    viewer {
      ... on User {
        leaderboardRank(type: $type, filter: $filter) {
          rank
        }
      }
    }
  }
`;

function getRankText(props: LeaderboardRankProps, rank?: number) {
  return rank
    ? (props.rankTextFormat || 'Your rank: {rank}').replace('{rank}', String(rank))
    : props.unrankedText;
}

export function useLeaderboardRank(props: LeaderboardRankProps): LeaderboardRankHookResult {
  const programId = useProgramId() || props.programId;
  const user = useUserIdentity();

  const { data, loading } = useQuery<RankQueryResult>(
    RANK_QUERY,
    {
      type: props.leaderboardType,
      filter: programId ? { programId_eq: programId } : {},
    },
    !user?.jwt
  );

  const rank = data?.viewer?.leaderboardRank?.rank ?? undefined;

  return { rank, rankText: getRankText(props, rank), loading };
}

export function useDemoLeaderboardRank(props: LeaderboardRankProps): LeaderboardRankHookResult {
  const [rank] = useState<number | undefined>(7);
  return { rank, rankText: getRankText(props, rank), loading: false };
}
