import { navigation, useCurrentPage } from "@saasquatch/component-boilerplate";
import { middleClickLink } from "../../utils/utils";
import { NavigationSidebarItem } from "./sqm-navigation-sidebar-item";
import { NavigationSidebarItemViewProps } from "./sqm-navigation-sidebar-item-view";

export function useNavigationSidebarItem(
  props: NavigationSidebarItem
): NavigationSidebarItemViewProps {
  const currentPage = useCurrentPage();
  return {
    states: {
      active: currentPage.pathname === props.path,
    },
    data: {
      label: props.label,
      icon: props.icon,
      path: props.path,
    },
    backgroundColor: props.backgroundColor,
    backgroundHoverColor: props.backgroundHoverColor,
    textColor: props.textColor,
    textHoverColor: props.textHoverColor,
    borderRadius: props.borderRadius,
    backgroundFocusedColor: props.backgroundFocusedColor,
    textFocusedColor: props.textFocusedColor,
    padding: props.padding,
  };
}
