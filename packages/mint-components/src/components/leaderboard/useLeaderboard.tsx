import { h } from '@stencil/core';
import { LeaderboardViewProps } from './leaderboard-view';

interface LeaderboardProps {
  usersheading: string;
  statsheading: string;
}

export function useLeaderboard(props: LeaderboardProps): LeaderboardViewProps {
  return { loading: false, empty: <div></div>, loadingstate: <div></div>, hasleaders: true, referrers: [], ...props };
}
