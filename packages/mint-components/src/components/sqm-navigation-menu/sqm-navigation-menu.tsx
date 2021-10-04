import { Component, h, Host, Prop, State } from "@stencil/core";
import { withHooks } from "@saasquatch/stencil-hooks";
import { isDemo } from "@saasquatch/component-boilerplate";
import {
  NavigationMenuView,
  NavigationMenuViewProps,
} from "./sqm-navigation-menu-view";
import { useNavigationMenu } from "./useNavigationMenu";
import { getProps } from "../../utils/utils";
import { DemoData } from "../../global/demo";
import deepmerge from "deepmerge";

/**
 * @uiName Navigation Menu
 */
@Component({
  tag: "sqm-navigation-menu",
  styleUrl: "sqm-navigation-menu.scss",
  shadow: true,
})
export class NavigationMenu {
  @State()
  ignored = true;

  /**
   * @uiName Include dropdown menu
   */
  @Prop() includeDropdown: boolean;
  /**
   * @uiName Label on the header menu
   */
  @Prop() menuLabel: string;

  /**
   * @undocumented
   * @uiType object
   */
  @Prop() demoData?: DemoData<NavigationMenuViewProps>;

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  render() {
    const props = isDemo()
      ? useNavigationMenuDemo(getProps(this))
      : useNavigationMenu(getProps(this));
    return (
      <Host slot="sqm-navigation-menu">
        <NavigationMenuView {...props} />
      </Host>
    );
  }
}

function useNavigationMenuDemo(props: NavigationMenu): NavigationMenuViewProps {
  return deepmerge(
    {
      states: {
        includeDropdown: true,
        styles: {
          ...props,
          menuLabel: "Menu",
        },
      },
      callbacks: {
        rerender: () => {},
      },
      ref: { current: undefined },
    },
    props.demoData || {},
    { arrayMerge: (_, a) => a }
  );
}
