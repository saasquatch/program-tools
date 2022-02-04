import { Component, h, Prop } from "@stencil/core";
import { TabView } from "./sqm-tab-view";

@Component({
  tag: "sqm-tab",
})
export class Tab {
  @Prop() header: string;

  render() {
    return (
      <TabView>
        <slot />
      </TabView>
    );
  }
}
