import { LeaderboardRankViewProps } from './leaderboard-rank-view';

interface LeaderboardRankProps extends LeaderboardRankViewProps {}

export function useLeaderboardRank(props: LeaderboardRankProps): LeaderboardRankViewProps {
  return props;
}
