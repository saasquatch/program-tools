import { h } from "@stencil/core";
import { NavigationSidebarView } from "../components/sqm-navigation-sidebar/sqm-navigation-sidebar-view";
import { SidebarItemView } from "../components/sqm-sidebar-item/sqm-sidebar-item-view";

export default {
  title: "Navigation Sidebar",
};

export const Default = () => {
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
    },
    callbacks: {
      onClick: (e: MouseEvent) => console.log(e),
    },
  };
  const item2Props = {
    states: {
      active: true,
    },
    data: {
      label: "Activity",
      icon: "bar-chart",
    },
    callbacks: {
      onClick: (e: MouseEvent) => console.log(e),
    },
  };
  return (
    <NavigationSidebarView {...barProps}>
      <SidebarItemView {...item1Props} />
      <SidebarItemView {...item2Props} />
    </NavigationSidebarView>
  );
};
