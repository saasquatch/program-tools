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
    },
    callbacks: {
      onClick: () => navigation.push(`${props.path}`),
      onMiddleClick: () => middleClickLink(props.path),
    },
  };
}
