import { Component, h, Prop } from "@stencil/core";
import { TabView } from "./sqm-tab-view";

/**
 * @uiName Tab
 * @slot [{"name":"", "title":"Tab Content"}]
 * @validParents ["sqm-tabs"]
 * @example Tab - <sqm-tab header="Example">This is an example tab. Add your own content here.</sqm-tab>
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
