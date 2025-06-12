import {
  isDemo,
  useCurrentPage,
  useProgramId,
} from "@saasquatch/component-boilerplate";
import { withHooks } from "@saasquatch/stencil-hooks";
import { useEffect, useState } from "@saasquatch/universal-hooks";
import { Component, h, Prop, State } from "@stencil/core";
import {
  NavigationSidebarView,
  NavigationSidebarViewProps,
} from "./sqm-navigation-sidebar-view";
import deepmerge from "deepmerge";
import { DemoData } from "../../global/demo";

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

  /**
   * @uiName Text color
   * @uiWidget color
   * @format color
   * @uiGroup Style
   */
  @Prop() mobileMenuColor?: string = "var(--sqm-text, #444445)";

  /**
   * @undocumented
   * @uiType object
   */
  @Prop() demoData?: DemoData<NavigationSidebarViewProps>;

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  render() {
    const props = isDemo()
      ? useDemoNavigationSidebar(this)
      : useNavigationSidebar(this);

    return (
      <NavigationSidebarView {...props}>
        <slot />
      </NavigationSidebarView>
    );
  }
}

function useNavigationSidebar(
  props: NavigationSidebar
): NavigationSidebarViewProps {
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
    mobileMenuColor: props.mobileMenuColor,
    checked,
    onClick,
  };
}

function useDemoNavigationSidebar(
  props: NavigationSidebar
): NavigationSidebarViewProps {
  return deepmerge(
    {
      mobileMenuColor: props.mobileMenuColor,
    },
    props.demoData || {},
    { arrayMerge: (_, a) => a }
  );
}
