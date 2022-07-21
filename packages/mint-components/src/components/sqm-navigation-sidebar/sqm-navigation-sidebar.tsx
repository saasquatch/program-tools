import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, State } from "@stencil/core";
import { NavigationSidebarView } from "./sqm-navigation-sidebar-view";

/**
 * @uiName Microsite Sidebar
 * @slots [{"name":"", "title":"Sidebar Content"]}]
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
