import { Component, h, Host, Prop, State } from "@stencil/core";
import { withHooks } from "@saasquatch/stencil-hooks";
import { isDemo } from "@saasquatch/component-boilerplate";
import {
  NavigationMenuView,
  NavigationMenuViewProps,
} from "./navigation-menu-view";
import { useNavigationMenu } from "./useNavigationMenu";
import { getProps } from "../../utils/utils";

/**
 * @uiName Portal Frame
 */
@Component({
  tag: "sqm-navigation-menu",
  styleUrl: "navigation-menu.scss",
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
  return {
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
  };
}
