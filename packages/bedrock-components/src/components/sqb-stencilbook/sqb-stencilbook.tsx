import { h, Component, Host, State } from '@stencil/core';
import { useStencilbook } from '@saasquatch/stencilbook';
import { withHooks } from '@saasquatch/stencil-hooks';
import * as ProgramSwitch from '../sqb-program-switch/ProgramSwitch.stories';
import * as Widget from '../sqb-widget/Widget.stories';
import { HookStoryAddon } from './HookStoryAddon';
import { CucumberAddon } from './CucumberAddon';

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
      addons: [HookStoryAddon, CucumberAddon],
    });
    return (
      <Host class={Style} onClick={{}}>
        {children}
      </Host>
    );
  }
}
