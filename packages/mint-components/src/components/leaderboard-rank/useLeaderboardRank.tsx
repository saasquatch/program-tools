import { LeaderboardRankViewProps } from './leaderboard-rank-view';

interface LeaderboardRankProps {
  rank?: string;
}

export function useLeaderboardRank(props: LeaderboardRankProps): LeaderboardRankViewProps {
  return { rank: '{default rank}', ...props };
}
