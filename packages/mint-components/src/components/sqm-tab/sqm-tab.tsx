import { Component, h, Prop } from "@stencil/core";
import { TabView } from "./sqm-tab-view";

/**
 * @uiName Tab
 */
@Component({
  tag: "sqm-tab",
})
export class Tab {
  
  /** @uiName Tab Title  */
  @Prop() header: string;

  render() {
    return (
      <TabView>
        <slot />
      </TabView>
    );
  }
}
