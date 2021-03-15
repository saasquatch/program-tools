import { h, Component, Host, State } from '@stencil/core';
import { useStencilbook } from '@saasquatch/stencilbook';
import * as hooks from '@saasquatch/stencil-hooks';

import * as ShareButton from '../../stories/ShareButton.stories';
import * as ShareLink from '../../stories/ShareLink.stories';
import * as BigStat from '../../stories/BigStat.stories';
import * as Leaderboard from '../../stories/Leaderboard.stories';
import * as LeaderboardRank from '../../stories/LeaderboardRank.stories';
import * as UseShareLink from '../../stories/UseShareLink.stories';
import * as UseShareButton from '../../stories/UseShareButton.stories';

import { CucumberAddon } from './CucumberAddon';

const stories = [ShareButton, ShareLink, BigStat, Leaderboard, LeaderboardRank, UseShareLink, UseShareButton];

/**
 * For internal documentation
 *
 * @undocumented
 */
@Component({
  tag: 'sqm-stencilbook',
})
export class StencilStorybook {
  @State()
  ignored = true;

  constructor() {
    hooks.withHooks(this);
  }
  disconnectedCallback() {}
  render() {
    const { class: Style, children } = useStencilbook(stories, {
      h,
      hooks,
      title: 'Mint Components',
      addons: [CucumberAddon],
    });
    return <Host class={Style}>{children}</Host>;
  }
}
