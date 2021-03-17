import { withHooks } from '@saasquatch/stencil-hooks';
import { Component, Prop, h } from '@stencil/core';
import { LeaderboardView } from './leaderboard-view';
import { useLeaderboard } from './useLeaderboard';

/**
 * @uiName Leaderboard
 */
@Component({
  tag: 'sqm-leaderboard',
  styleUrl: 'leaderboard.css',
  shadow: true,
})
export class Leaderboard {
  @Prop() usersheading: string;
  @Prop() statsheading: string;

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  render() {
    const props = {
      empty: <slot name="empty" />,
      loadingstate: <slot name="loading" />,
      ...this,
    };
    const viewprops = useLeaderboard(props);
    return <LeaderboardView {...viewprops} />;
  }
}
