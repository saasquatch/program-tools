import { withHooks } from '@saasquatch/stencil-hooks';
import { Component, Prop, h } from '@stencil/core';
import { LeaderboardRankView } from './leaderboard-rank-view';
import { useLeaderboardRank } from './useLeaderboardRank';

/**
 * @uiName Leaderboard Rank
 */
@Component({
  tag: 'sqm-leaderboard-rank',
  styleUrl: 'leaderboard-rank.css',
  shadow: true,
})
export class LeaderboardRank {
  /**
   * @uiName Default rank
   */
  @Prop() rank?: string;

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  render() {
    const props = useLeaderboardRank(this);
    return <LeaderboardRankView {...props} />;
  }
}
