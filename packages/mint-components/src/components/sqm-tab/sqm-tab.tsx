import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, Prop, h } from "@stencil/core";
import { getProps } from "../../utils/utils";
import { TabView } from "./sqm-tab-view";
import { useTab } from "./useTab";

@Component({
  tag: "sqm-tab",
})
export class Tab {
  @Prop() header: string;
  @Prop() open: boolean;

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  render() {
    const { header, open } = getProps(this);
    const { callbacks, state } = useTab();
    return (
      <TabView open={open}>
        <slot />
      </TabView>
    );
  }
}
