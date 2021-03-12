import { Component, Prop, h } from '@stencil/core';
import { LeaderboardView } from './leaderboard-view';
import { useLeaderboard } from './useLeaderboard';

@Component({
  tag: 'sqm-leaderboard',
  styleUrl: 'leaderboard.css',
  shadow: true,
})
export class MyComponent {
  @Prop() pretext: string;
  @Prop() posttext: string;
  @Prop() rank?: string;
  render() {
    return <LeaderboardView {...useLeaderboard(this)} />;
  }
}
