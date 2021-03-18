import { LeaderboardRankViewProps } from './leaderboard-rank-view';

export interface LeaderboardRankProps {
  rank?: string;
}

export function useLeaderboardRank(props: LeaderboardRankProps): LeaderboardRankViewProps {
  return { rank: '{default rank}', ...props };
}
