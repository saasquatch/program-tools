import {
  useCurrentPage,
  useProgramId,
} from "@saasquatch/component-boilerplate";
import { withHooks } from "@saasquatch/stencil-hooks";
import { useEffect, useState } from "@saasquatch/universal-hooks";
import { Component, h, State } from "@stencil/core";
import { NavigationSidebarView } from "./sqm-navigation-sidebar-view";

/**
 * @uiName Microsite Sidebar
 * @validParents ["div","sqm-divided-layout","template","sqm-portal-container","sqm-brand"]
 * @validChildren ["sqm-navigation-sidebar-item"]
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

  render() {
    const props = useNavigationSidebar();

    return (
      <NavigationSidebarView {...props}>
        <slot />
      </NavigationSidebarView>
    );
  }
}

function useNavigationSidebar() {
  const location = useCurrentPage();
  const programId = useProgramId();

  const [checked, setChecked] = useState(false);

  // Close hamburger menu after navigation
  useEffect(() => {
    setChecked(false);
  }, [location.pathname, programId]);

  function onClick(e) {
    setChecked(e.target.checked);
  }

  return {
    checked,
    onClick,
  };
}
