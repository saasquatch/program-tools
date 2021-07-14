import { SidebarItem } from "./sqm-sidebar-item";
import { SidebarItemViewProps } from "./sqm-sidebar-item-view";

export function useSidebarItem(props: SidebarItem): SidebarItemViewProps {
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
