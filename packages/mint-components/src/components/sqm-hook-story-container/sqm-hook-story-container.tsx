import { h, Component, State, Prop, FunctionalComponent } from "@stencil/core";
import * as hooks from "@saasquatch/stencil-hooks";

@Component({
  tag: "sqm-hook-story-container",
})
export class SqmHookStoryContainer {
  @State()
  ignored = true;

  @Prop()
  hookStory: FunctionalComponent;

  constructor() {
    hooks.withHooks(this);
  }

  disconnectedCallback() {}

  render() {
    const Story = this.hookStory;
    return <Story />;
  }
}
