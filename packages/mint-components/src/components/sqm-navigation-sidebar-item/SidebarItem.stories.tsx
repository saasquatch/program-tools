import { h } from "@stencil/core";
import { NavigationSidebarItemView } from "./sqm-navigation-sidebar-item-view";

export default {
  title: "Components/Sidebar Item",
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
