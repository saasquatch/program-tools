import { LeaderboardViewProps } from './leaderboard-view';

interface LeaderboardProps {  pretext: string;
  posttext: string;
  rank?: string;}

export function useLeaderboard(props: LeaderboardProps): LeaderboardViewProps {
  return { referrers: [], ...props };
}
