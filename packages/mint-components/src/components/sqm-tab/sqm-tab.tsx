import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, Prop, h } from "@stencil/core";
import { getProps } from "../../utils/utils";
import { TabView } from "./sqm-tab-view";
import { useTab } from "./useTab";

@Component({
  tag: "sqm-tab",
})
export class Tab {
  @Prop() tabName: string;

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  render() {
    const { tabName } = getProps(this);
    const { callbacks, state } = useTab();
    return (
      <TabView tabName={tabName} callbacks={callbacks} state={state}>
        <slot />
      </TabView>
    );
  }
}
