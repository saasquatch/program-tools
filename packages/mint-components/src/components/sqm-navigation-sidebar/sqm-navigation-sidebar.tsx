import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Method, State } from "@stencil/core";
import { NavigationSidebarView } from "./sqm-navigation-sidebar-view";
import { useNavigationSidebar } from "./useNavigationSidebar";

/**
 * @uiName Microsite Sidebar
 * @slots [{"name":"", "title":"Sidebar Content"}]
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

  @Method()
  async renderNavigationItem(child: Element) {
    return <div innerHTML={child.outerHTML} />;
  }

  render() {
    const { mobileChildren } = useNavigationSidebar(this.renderNavigationItem);

    const props = {
      mobileItemsSlot: mobileChildren,
    };

    return (
      <NavigationSidebarView {...props}>
        <slot />
      </NavigationSidebarView>
    );
  }
}
