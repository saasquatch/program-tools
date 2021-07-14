import { Component, h, Host, Prop, State } from "@stencil/core";
import { withHooks } from "@saasquatch/stencil-hooks";
import { isDemo } from "@saasquatch/component-boilerplate";
import {
  NavigationSidebarView,
  NavigationSidebarViewProps,
} from "./sqm-navigation-sidebar-view";
import { useNavigationSidebar } from "./useNavigationSidebar";
import { getProps } from "../../utils/utils";

/**
 * @uiName Navigation Sidebar
 */
@Component({
  tag: "sqm-navigation-sidebar",
  shadow: true,
})
export class NavigationSidebar {
  @State()
  ignored = true;

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  render() {
    const props = isDemo()
      ? useNavigationSidebarDemo(getProps(this))
      : useNavigationSidebar(getProps(this));
    return (
      <NavigationSidebarView {...props}>
        <slot />
      </NavigationSidebarView>
    );
  }
}

function useNavigationSidebarDemo(
  props: NavigationSidebar
): NavigationSidebarViewProps {
  return {
    data: {
      programs: [
        {
          key: "program1",
          label: "My Referral Program",
        },
        {
          key: "program2",
          label: "My Rewards Program",
        },
      ],
    },
  };
}
