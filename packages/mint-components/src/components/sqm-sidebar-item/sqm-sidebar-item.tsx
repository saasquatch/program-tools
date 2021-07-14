import { Component, h, Host, Prop, State } from "@stencil/core";
import { withHooks } from "@saasquatch/stencil-hooks";
import { isDemo } from "@saasquatch/component-boilerplate";
import { SidebarItemView, SidebarItemViewProps } from "./sqm-sidebar-item-view";
import { useSidebarItem } from "./useSidebarItem";
import { getProps } from "../../utils/utils";

/**
 * @uiName Sidebar Item
 */
@Component({
  tag: "sqm-sidebar-item",
  shadow: true,
})
export class SidebarItem {
  @State()
  ignored = true;

  /**@uiName Navigation path */
  @Prop() path: string;
  /**@uiName Icon */
  @Prop() icon: string;
  /**@uiName Label */
  @Prop() label: string;

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  render() {
    const props = isDemo()
      ? useSidebarItemDemo(getProps(this))
      : useSidebarItem(getProps(this));
    return <SidebarItemView {...props} />;
  }
}

function useSidebarItemDemo(props: SidebarItem): SidebarItemViewProps {
  return {
    states: {
      active: false,
    },
    data: {
      label: "Dashboard",
      icon: "house",
    },
    callbacks: {
      onClick: (e: MouseEvent) => console.log(e),
    },
  };
}
