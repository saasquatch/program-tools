import * as React from "react";
import { Tabs, TabsView } from ".";
import styled, { css } from "styled-components";

export default {
  tags: ["autodocs"],
  title: "Components / Tabs",
  component: TabsView,
};

// const TabStyling = css`
//   border-bottom: 1px solid transparent;

//   &:not(:first-child) {
//     margin-left: 16px;
//   }

//   &.active {
//     border-bottom: 1px solid #575757;
//   }
// `;

export const defaultTabs = () => {
  return (
    <TabsView selected={"first"} onTabClick={() => {}}>
      <TabsView.TabView id="first">First</TabsView.TabView>
      <TabsView.TabView id="second">Second</TabsView.TabView>
    </TabsView>
  );
};

export const FunctionalTabs = () => {
  const [selected, setSelected] = React.useState<string>("first");

  return (
    <>
      <Tabs selected={selected} onTabClick={setSelected}>
        <TabsView.TabView id="first">First</TabsView.TabView>
        <TabsView.TabView id="second">Second</TabsView.TabView>
      </Tabs>
      <div style={{ marginTop: "32px" }}>Tab selected: {selected}</div>
    </>
  );
};

export const DisabledTabs = () => {
  const [selected, setSelected] = React.useState<string>("second");

  return (
    <>
      <TabsView selected={selected} onTabClick={setSelected}>
        <TabsView.TabView disabled id="first">
          First
        </TabsView.TabView>
        <TabsView.TabView id="second">Second</TabsView.TabView>
        <TabsView.TabView id="third">Third</TabsView.TabView>
      </TabsView>
      <div style={{ marginTop: "32px" }}>Tab selected: {selected}</div>
    </>
  );
};

export const NavigationTabs = () => {
  const [selected, setSelected] = React.useState<string>("programs");

  const NavTabStyling = css`
    font-size: 14px;
    color: var(--sq-nav-text-on-primary);
    padding: 4px 8px;
    border-bottom: 2px solid transparent;
    text-align: center;

    &:not(:first-child) {
      margin-left: 32px;
    }

    &.active {
      border-bottom: 2px solid white;
    }

    &:not(.active) {
      color: var(--sq-nav-text-on-primary-subdued);
    }

    &:hover {
      color: var(--sq-nav-text-on-primary);
    }
  `;

  const NavContainer = styled.div`
    background: var(--sq-nav-surface-primary);
    box-sizing: border-box;
    padding: 16px 24px;
  `;

  return (
    <NavContainer>
      <TabsView
        selected={selected}
        onTabClick={setSelected}
        customTabStyle={NavTabStyling}
      >
        <TabsView.TabView id="programs">Programs</TabsView.TabView>
        <TabsView.TabView id="rewards">Rewards</TabsView.TabView>
        <TabsView.TabView id="analytics">Analytics</TabsView.TabView>
        <TabsView.TabView id="participants">Participants</TabsView.TabView>
        <TabsView.TabView id="settings">Settings</TabsView.TabView>
      </TabsView>
    </NavContainer>
  );
};
