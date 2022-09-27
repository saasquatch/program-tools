import { useHost } from "@saasquatch/component-boilerplate";
import { withHooks } from "@saasquatch/stencil-hooks";
import { useEffect, useState } from "@saasquatch/universal-hooks";
import { Component, h, Method, Prop, State, VNode } from "@stencil/core";
import { getProps } from "../../utils/utils";
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
