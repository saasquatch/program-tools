import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h } from "@stencil/core";
import { TabsView } from "./sqm-tabs-view";
import { useTabs } from "./useTabs";

@Component({
  tag: "sqm-tabs",
  shadow: true,
})
export class Tabs {
  constructor() {
    withHooks(this);
  }

  disconnectedCallback() {}

  render() {
    const { content } = useTabs();

    return (
      <TabsView content={content}>
        <slot />
      </TabsView>
    );
  }
}
