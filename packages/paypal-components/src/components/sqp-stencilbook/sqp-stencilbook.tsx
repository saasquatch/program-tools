import { h, Component, Host, State } from '@stencil/core';
import { useStencilbook } from '@saasquatch/stencilbook';
import { withHooks } from '@saasquatch/stencil-hooks';
import { HookStoryAddon } from './HookStoryAddon';
import { CucumberAddon } from './CucumberAddon';

// Import and add all stories to this array
const stories = [];

/**
 * For internal documentation
 *
 * @undocumented
 */
@Component({
  tag: 'sqp-stencilbook',
})
export class SQPStencilbook {
  @State()
  ignored = true;

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}
  render() {
    const { class: Style, children } = useStencilbook(stories, {
      h,
      title: 'Paypal Components',
      addons: [HookStoryAddon, CucumberAddon],
    });
    return (
      <Host class={Style} onClick={{}}>
        {children}
      </Host>
    );
  }
}
