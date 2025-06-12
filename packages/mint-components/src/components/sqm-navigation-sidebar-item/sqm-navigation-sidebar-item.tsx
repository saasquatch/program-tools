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
import { Spacing } from "../../global/mixins";

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
   * @uiGroup Style
   */
  @Prop() icon: string;
  /**
   * @uiName Label
   */
  @Prop() label: string;

  /**
   * Background color of the nav item
   * @uiName Background Color
   * @uiWidget color
   * @uiGroup Style
   */
  @Prop() backgroundColor?: string;

  /**
   * Background color of the nav item when hovered
   * @uiName Background Hover Color
   * @uiWidget color
   * @uiGroup Style
   */
  @Prop() backgroundHoverColor?: string;

  /**
   * Background color of the nav item when focused
   * @uiName Background Focused Color
   * @uiWidget color
   * @uiGroup Style
   */
  @Prop() backgroundFocusedColor?: string;

  /**
   * Text color of the nav item
   * @uiName Text Color
   * @uiWidget color
   * @uiGroup Style
   */
  @Prop() textColor?: string;

  /**
   * Text color of the nav item when hovered
   * @uiName Text Hover Color
   * @uiWidget color
   * @uiGroup Style
   */
  @Prop() textHoverColor?: string;

  /**
   * Text color of the nav item when items is focused
   * @uiName Text Focused Color
   * @uiWidget color
   * @uiGroup Style
   */
  @Prop() textFocusedColor?: string;

  /**
   * Border radius (in number of pixels)
   * @uiName Border Radius
   * @uiGroup Style
   */
  @Prop() borderRadius?: number;

  /**
   * @uiName Padding
   * @uiType string
   * @uiEnum ["none", "xxx-small", "xx-small", "x-small", "small", "medium", "large", "x-large", "xx-large", "xxx-large", "xxxx-large"]
   * @uiEnumNames ["None", "XXX-Small", "XX-Small", "X-Small", "Small", "Medium", "Large", "X-Large", "XX-Large", "XXX-Large", "XXXX-Large"]
   */
  @Prop() padding?: Spacing = "x-small";

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
      backgroundColor: props.backgroundColor,
      backgroundHoverColor: props.backgroundHoverColor,
      textColor: props.textColor,
      textHoverColor: props.textHoverColor,
      borderRadius: props.borderRadius,
      backgroundFocusedColor: props.backgroundFocusedColor,
      textFocusedColor: props.textFocusedColor,
      padding: props.padding,
    },
    props.demoData || {},
    { arrayMerge: (_, a) => a }
  );
}
