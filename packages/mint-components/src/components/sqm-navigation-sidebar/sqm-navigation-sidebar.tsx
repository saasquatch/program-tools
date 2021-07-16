import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, State } from "@stencil/core";
import {
  NavigationSidebarView
} from "./sqm-navigation-sidebar-view";

/**
 * A holder for navigation menu items
 * 
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
    return (
      <NavigationSidebarView>
        <slot />
      </NavigationSidebarView>
    );
  }
}