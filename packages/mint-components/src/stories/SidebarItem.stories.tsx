import { h } from "@stencil/core";
import { SidebarItemView } from "../components/sqm-sidebar-item/sqm-sidebar-item-view";

export default {
  title: "Sidebar Item",
};

export const InactiveItem = () => {
  const props = {
    states: {
      active: false,
    },
    data: {
      label: "Dashboard",
      icon: "house",
    },
    callbacks: {
      onClick: (e: MouseEvent) => console.log(e),
    },
  };
  return <SidebarItemView {...props} />;
};

export const ActiveItem = () => {
  const props = {
    states: {
      active: true,
    },
    data: {
      label: "Dashboard",
      icon: "house",
    },
    callbacks: {
      onClick: (e: MouseEvent) => console.log(e),
    },
  };
  return <SidebarItemView {...props} />;
};
