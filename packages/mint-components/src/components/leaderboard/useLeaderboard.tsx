import { LeaderboardViewProps } from './leaderboard-view';

interface LeaderboardProps extends LeaderboardViewProps {}

export function useLeaderboard(props: LeaderboardProps): LeaderboardViewProps {
  return props;
}
