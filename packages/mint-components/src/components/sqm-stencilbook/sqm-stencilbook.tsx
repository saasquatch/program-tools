import { h, Component, Host, State } from '@stencil/core';
import { useStencilbook } from '@saasquatch/stencilbook';
import * as hooks from '@saasquatch/stencil-hooks';

import * as ShareButton from '../../stories/ShareButton.stories';
import * as ShareLink from '../../stories/ShareLink.stories';
import * as ReferraList from '../../stories/ReferralList.stories';
import * as UseReferralList from "../../stories/UseReferralList.stories"

import { CucumberAddon } from './CucumberAddon';

const stories = [ShareButton, ShareLink, ReferraList, UseReferralList];

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
