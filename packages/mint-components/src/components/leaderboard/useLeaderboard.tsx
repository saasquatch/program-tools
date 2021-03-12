import { LeaderboardViewProps } from './leaderboard-view';

interface LeaderboardProps {
  usersheading: string;
  statsheading: string;
}

export function useLeaderboard(props: LeaderboardProps): LeaderboardViewProps {
  return { referrers: [], ...props };
}
