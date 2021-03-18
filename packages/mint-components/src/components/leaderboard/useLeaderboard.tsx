import { VNode } from '@stencil/core';
import { LeaderboardViewProps } from './leaderboard-view';

export interface LeaderboardProps {
  usersheading: string;
  statsheading: string;
  empty: VNode;
  loadingstate: VNode;
}

export function useLeaderboard(props: LeaderboardProps): LeaderboardViewProps {
  return { loading: false, hasleaders: true, referrers: [], ...props };
}
