import { Component, Prop, h } from '@stencil/core';
import { LeaderboardRankView } from './leaderboard-rank-view';
import { useLeaderboardRank } from './useLeaderboardRank';

@Component({
  tag: 'sqm-leaderboard-rank',
  styleUrl: 'leaderboard-rank.css',
  shadow: true,
})
export class MyComponent {

  render() {
    return <LeaderboardRankView {...useLeaderboardRank(this)} />;
  }
}
