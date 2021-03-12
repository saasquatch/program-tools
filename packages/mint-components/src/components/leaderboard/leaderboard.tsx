import { Component, Prop, h } from '@stencil/core';
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
    return <LeaderboardView {...useLeaderboard(this)} />;
  }
}
