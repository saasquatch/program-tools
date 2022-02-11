import * as React from 'react';
import { Tabs } from '.';
import styled, { css } from 'styled-components'

export default {
  title: "Components / Tabs",
  component: Tabs
}

const TabStyling = css`
  border-bottom: 1px solid transparent;

  &:not(:first-child) {
    margin-left: 16px;
  }

  &.active {
    border-bottom: 1px solid #575757;
  }
`

export const defaultTabs = () => {
  return (
    <Tabs
      selected={"first"}
      onTabClick={() => {}}
    >
      <Tabs.Tab id="first">First</Tabs.Tab>
      <Tabs.Tab id="second">Second</Tabs.Tab>
    </Tabs>
  )
}

export const StyledTabs = () => {
  const [selected, setSelected] = React.useState<string>("first");

  return (
    <>
    <Tabs
      selected={selected}
      onTabClick={setSelected}
      customTabStyle={TabStyling}
    >
      <Tabs.Tab id="first">First</Tabs.Tab>
      <Tabs.Tab id="second">Second</Tabs.Tab>
    </Tabs>
      <div style={{marginTop: "32px"}}>Tab selected: {selected}</div>
    </>
  )
}

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
  `

  const NavContainer = styled.div`
    background: var(--sq-nav-surface-primary);
    box-sizing: border-box;
    padding: 16px 24px;
  `

  return (
    <NavContainer>
      <Tabs
        selected={selected}
        onTabClick={setSelected}
        customTabStyle={NavTabStyling}
      >
        <Tabs.Tab id="programs">Programs</Tabs.Tab>
        <Tabs.Tab id="rewards">Rewards</Tabs.Tab>
        <Tabs.Tab id="analytics">Analytics</Tabs.Tab>
        <Tabs.Tab id="participants">Participants</Tabs.Tab>
        <Tabs.Tab id="settings">Settings</Tabs.Tab>
      </Tabs>
    </NavContainer>
  )
}
