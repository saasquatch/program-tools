import { h, Component, State, Prop, FunctionalComponent } from "@stencil/core";
import { withHooks } from "@saasquatch/stencil-hooks";

/**
 *  @undocumented
 */
@Component({
  tag: "sqp-hook-story-container",
})
export class SqpHookStoryContainer {
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
