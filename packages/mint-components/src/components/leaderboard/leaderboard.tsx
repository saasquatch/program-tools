import { Component, Prop, h } from '@stencil/core';
import { LeaderboardView } from './leaderboard-view';
import { useLeaderboard } from './useLeaderboard';

@Component({
  tag: 'sqm-leaderboard',
  styleUrl: 'leaderboard.css',
  shadow: true,
})
export class MyComponent {

  @Prop() placementtext: string;

  render() {
    return <LeaderboardView {...useLeaderboard(this)} />;
  }
}
