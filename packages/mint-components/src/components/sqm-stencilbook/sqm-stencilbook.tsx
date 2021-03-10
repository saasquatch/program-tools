import { h, Component, Host, State } from '@stencil/core';
import { useStencilbook } from '@saasquatch/stencilbook';
import * as hooks from '@saasquatch/stencil-hooks';

import * as ShareButton from '../share-button/share-button-view';
import * as ShareLink from '../share-link/share-link-view';

import { CucumberAddon } from './CucumberAddon';

const stories = [ShareButton, ShareLink];

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
