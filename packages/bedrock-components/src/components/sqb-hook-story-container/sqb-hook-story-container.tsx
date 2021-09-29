import { h, Component, State, Prop, FunctionalComponent } from '@stencil/core';
import { withHooks } from '@saasquatch/stencil-hooks';

@Component({
  tag: 'sqb-hook-story-container',
})
export class SqbHookStoryContainer {
  @State()
  ignored = true;

  @Prop()
  hookStory: FunctionalComponent;

  constructor() {
    withHooks(this);
  }

  disconnectedCallback() {}

  render() {
    const Story = this.hookStory;
    return <Story />;
  }
}
