import { r as registerInstance, h as h$1 } from './index-832bd454.js';
import { n as h } from './stencil-hooks.module-f4b05383.js';

let SqmHookStoryContainer = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.ignored = true;
    h(this);
  }
  disconnectedCallback() { }
  render() {
    const Story = this.hookStory;
    return h$1(Story, null);
  }
};

export { SqmHookStoryContainer as sqm_hook_story_container };
