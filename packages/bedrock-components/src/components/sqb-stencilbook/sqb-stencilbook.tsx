import { h, Component, Host, State } from '@stencil/core';
import { useStencilbook } from '@saasquatch/stencilbook';
import { withHooks } from '@saasquatch/stencil-hooks';
import * as ProgramSwitch from '../../stories/ProgramSwitch.stories';
import * as Widget from '../../stories/Widget.stories';
import { HookStoryAddon } from './HookStoryAddon';

// Import and add all stories to this array
const stories = [ProgramSwitch, Widget];

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
      title: 'Bedrock Components',
      addons: [HookStoryAddon],
    });
    return (
      <Host class={Style} onClick={{}}>
        {children}
      </Host>
    );
  }
}
