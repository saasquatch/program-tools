import { Component, h, Prop } from "@stencil/core";
import { TabView } from "./sqm-tab-view";

/**
 * @uiName Tab
 * @slots [{"name":"", "title":"Tab Content"}]
 * @validParents ["sqm-tabs"]
 * @exampleGroup Layout
 * @example Tab - <sqm-tab header="Example"><p>This is an example tab. Add your own content here.</p></sqm-tab>
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
