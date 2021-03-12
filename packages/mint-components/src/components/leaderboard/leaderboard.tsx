import { Component, Prop, h, VNode } from '@stencil/core';
import { LeaderboardView } from './leaderboard-view';
import { useLeaderboard } from './useLeaderboard';

@Component({
  tag: 'sqm-leaderboard',
  styleUrl: 'leaderboard.css',
  shadow: true,
})
export class Leaderboard {
  @Prop() usersheading: string;
  @Prop() statsheading: string;
  render() {
    const props = {
      empty:<slot name="empty"/>,
      loadingstate:<slot name="loading" />,
      ...this,
    };
    return <LeaderboardView {...useLeaderboard(props)} />;
  }
}
