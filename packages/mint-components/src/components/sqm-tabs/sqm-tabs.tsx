import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Prop } from "@stencil/core";
import { getProps } from "../../utils/utils";
import { TabsView } from "./sqm-tabs-view";
import { useTabs } from "./useTabs";

/**
 * @uiName Tab Group
 * @slots [{"name":"", "title":"Tabs","validChildren":["sqm-tab"]}]
 * @exampleGroup Layout
 * @canvasRenderer always-replace
 * @example Generic Tab Group - <sqm-tabs><sqm-tab header="Tab 1"><p>This is the first tab</p></sqm-tab><sqm-tab header="Tab 2"><p>This is the second tab</p></sqm-tab><sqm-tab header="Tab 3"><p>This is the third tab</p></sqm-tab></sqm-tabs>
 */
@Component({
  tag: "sqm-tabs",
  shadow: true,
})
export class Tabs {
  /**
   * Used to specify the placement of the tabs
   *
   * @uiName Tabs Placement
   * @uiType string
   * @uiEnum ["left", "right", "bottom", "top"]
   * @uiEnumNames ["Left", "Right", "Bottom", "Top"]
   */
  @Prop() placement?: "left" | "right" | "bottom" | "top";

  constructor() {
    withHooks(this);
  }

  disconnectedCallback() {}

  render() {
    const { content } = useTabs();
    const { placement } = getProps(this);

    return (
      <TabsView placement={placement} content={content}>
        <slot />
      </TabsView>
    );
  }
}
