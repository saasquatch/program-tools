import { LeaderboardViewProps } from './leaderboard-view';

interface LeaderboardProps {
  placementtext: string;
}

export function useLeaderboard(props: LeaderboardProps): LeaderboardViewProps {
  return { referrers: [], ...props };
}
