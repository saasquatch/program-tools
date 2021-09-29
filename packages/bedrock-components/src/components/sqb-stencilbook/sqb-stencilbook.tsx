import { h, Component, Host, State } from '@stencil/core';
import { useStencilbook } from '@saasquatch/stencilbook';
import { withHooks } from '@saasquatch/stencil-hooks';

import * as MyComponent from '../../stories/MyComponent.stories';
import { HookStoryAddon } from './HookStoryAddon';

// Import and add all stories to this array
const stories = [MyComponent];

/**
 * For internal documentation
 *
 * @undocumented
 */
@Component({
  tag: 'sqb-stencilbook',
})
export class SQBStencilbook {
  @State()
  ignored = true;

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}
  render() {
    const { class: Style, children } = useStencilbook(stories, {
      h,
      title: 'My Theme',
      addons: [HookStoryAddon],
    });
    return <Host class={Style}>{children}</Host>;
  }
}
