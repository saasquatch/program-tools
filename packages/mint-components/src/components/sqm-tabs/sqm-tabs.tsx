import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Prop } from "@stencil/core";
import { getProps } from "../../utils/utils";
import { TabsView } from "./sqm-tabs-view";
import { useTabs } from "./useTabs";

/**
 * @uiName Tabs
 */
@Component({
  tag: "sqm-tabs",
  shadow: true,
})
export class Tabs {
  /**
   * Used to specify the placement of the tabs
   *
   * @uiName Placement
   */
  @Prop() placement?: string | null;

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
