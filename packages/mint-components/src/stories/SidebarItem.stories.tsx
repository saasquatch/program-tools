import { h } from "@stencil/core";
import { NavigationSidebarItemView } from "../components/sqm-navigation-sidebar-item/sqm-navigation-sidebar-item-view";

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
      path: "/",
    },
  };
  return <NavigationSidebarItemView {...props} />;
};

export const ActiveItem = () => {
  const props = {
    states: {
      active: true,
    },
    data: {
      label: "Dashboard",
      icon: "house",
      path: "/",
    },
  };
  return <NavigationSidebarItemView {...props} />;
};
