import { h } from "@stencil/core";
import { NavigationSidebarView } from "./sqm-navigation-sidebar-view";
import { NavigationSidebarItemView } from "../sqm-navigation-sidebar-item/sqm-navigation-sidebar-item-view";

export default {
  title: "Components/Navigation Sidebar",
};

export const DefaultNavigationSidebar = () => {
  const barProps = {
    data: {
      programs: [
        {
          key: "program1",
          label: "My Referral Program",
        },
        {
          key: "program2",
          label: "My Rewards Program",
        },
      ],
    },
  };
  const item1Props = {
    states: {
      active: false,
    },
    data: {
      label: "Dashboard",
      icon: "house",
      path: "/",
    },
  };
  const item2Props = {
    states: {
      active: true,
    },
    data: {
      label: "Activity",
      icon: "bar-chart",
      path: "/",
    },
  };
  return (
    <NavigationSidebarView {...barProps}>
      <NavigationSidebarItemView {...item1Props} />
      <NavigationSidebarItemView {...item2Props} />
    </NavigationSidebarView>
  );
};
