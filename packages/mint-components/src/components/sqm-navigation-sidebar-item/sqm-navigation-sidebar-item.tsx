import { isDemo } from "@saasquatch/component-boilerplate";
import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Prop } from "@stencil/core";
import deepmerge from "deepmerge";
import { DemoData } from "../../global/demo";
import { getProps } from "../../utils/utils";
import {
  NavigationSidebarItemView,
  NavigationSidebarItemViewProps,
} from "./sqm-navigation-sidebar-item-view";
import { useNavigationSidebarItem } from "./useNavigationSidebarItem";

/**
 * @uiName Microsite Sidebar Item
 * @validParents ["sqm-navigation-sidebar"]
 * @exampleGroup Microsite Components
 * @example Sidebar Item - <sqm-navigation-sidebar-item label="Sidebar Item" icon="house"></sqm-navigation-sidebar-item>
 */
@Component({
  tag: "sqm-navigation-sidebar-item",
  shadow: true,
})
export class NavigationSidebarItem {
  /**
   * @uiName Navigation path
   * @uiWidget pageSelect
   */
  @Prop() path: string;
  /**
   * Options available at https://shoelace.style/components/icon
   *
   * @uiName Icon
   */
  @Prop() icon: string;
  /**
   * @uiName Label
   */
  @Prop() label: string;

  /**
   * @undocumented
   * @uiType object
   */
  @Prop() demoData?: DemoData<NavigationSidebarItemViewProps>;

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  render() {
    const props = isDemo()
      ? useSidebarItemDemo(getProps(this))
      : useNavigationSidebarItem(getProps(this));
    return <NavigationSidebarItemView {...props} />;
  }
}

function useSidebarItemDemo(
  props: NavigationSidebarItem
): NavigationSidebarItemViewProps {
  return deepmerge(
    {
      states: {
        active: false,
      },
      data: {
        label: props.label || "Dashboard",
        icon: props.icon || "house",
      },
    },
    props.demoData || {},
    { arrayMerge: (_, a) => a }
  );
}
