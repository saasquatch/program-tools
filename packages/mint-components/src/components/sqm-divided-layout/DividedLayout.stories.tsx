import { h } from "@stencil/core";
import { NavigationSidebarItemView } from "../sqm-navigation-sidebar-item/sqm-navigation-sidebar-item-view";
import { NavigationSidebarView } from "../sqm-navigation-sidebar/sqm-navigation-sidebar-view";
import { PortalSectionView } from "../sqm-titled-section/sqm-portal-section-view";

export default {
  title: "Components/Divided Layout",
};

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

const Sidebar = () => {
  return (
    <NavigationSidebarView {...barProps}>
      <NavigationSidebarItemView {...item1Props} />
      <NavigationSidebarItemView {...item2Props} />
    </NavigationSidebarView>
  );
};

export const Row = () => {
  return (
    <sqm-divided-layout direction="row">
      <Sidebar />
      <div style={{ padding: "48px" }}>
        <PortalSectionView
          {...{
            labelMargin: "xx-small",
            padding: "none",
            label: (
              <sqm-text>
                <p>Welcome back,</p>
              </sqm-text>
            ),
            content: (
              <sqm-text>
                <h1>Joe Smith</h1>
              </sqm-text>
            ),
          }}
        />
      </div>
    </sqm-divided-layout>
  );
};

export const Column = () => {
  return (
    <sqm-divided-layout direction="column">
      <Sidebar />
      <div style={{ padding: "48px" }}>
        <PortalSectionView
          {...{
            labelMargin: "xx-small",
            padding: "none",
            label: (
              <sqm-text>
                <p>Welcome back,</p>
              </sqm-text>
            ),
            content: (
              <sqm-text>
                <h1>Joe Smith</h1>
              </sqm-text>
            ),
          }}
        />
      </div>
    </sqm-divided-layout>
  );
};

export const ColumnCustomDivider = () => {
  return (
    <sqm-divided-layout direction="column" dividerStyle="1px solid red">
      <Sidebar />
      <div style={{ padding: "48px" }}>
        <PortalSectionView
          {...{
            labelMargin: "xx-small",
            padding: "none",
            label: (
              <sqm-text>
                <p>Welcome back,</p>
              </sqm-text>
            ),
            content: (
              <sqm-text>
                <h1>Joe Smith</h1>
              </sqm-text>
            ),
          }}
        />
      </div>
    </sqm-divided-layout>
  );
};
