import { Component, h, Prop } from "@stencil/core";
import { TabView } from "./sqm-tab-view";

/**
 * @uiName Tab
 */
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
