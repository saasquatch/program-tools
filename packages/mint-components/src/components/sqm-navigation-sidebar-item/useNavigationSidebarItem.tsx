import { NavigationSidebarItem } from "./sqm-navigation-sidebar-item";
import { NavigationSidebarItemViewProps } from "./sqm-navigation-sidebar-item-view";

export function useNavigationSidebarItem(props: NavigationSidebarItem): NavigationSidebarItemViewProps {
  return {
    states: {
      active: false,
    },
    data: {
      label: props.label,
      icon: props.icon,
    },
    callbacks: {
      onClick: (e: MouseEvent) => console.log(e),
    },
  };
}
