import React from 'react'
import { Dropdown, DropdownItem, DropdownSublist } from '../Dropdown'
import styled from 'styled-components'

export default {
  title: 'Components / Dropdown',
  component: Dropdown,
}

const exampleOnClick = () => alert('You clicked a dropdown item.')

export const DefaultClosed = () => <Dropdown text='Default Closed' menu={false} />
export const DefaultOpen = () => <Dropdown text='Default Open' menu={true} />
export const Hover = () => <Dropdown text='Hovered' />
export const Disabled = () => <Dropdown text='Disabled' disabled={true} />
export const CenterAlignedClosed = () => <Dropdown text='Center Align Closed' menu={false} center={true} />
export const CenterAlignedOpen = () => <Dropdown text='Center Align Open' menu={true} center={true} />

export const PillClosed = () => <Dropdown text='Left Align Closed' menu={false} pill={true} />
export const PillOpen = () => <Dropdown text='Left Align Open' menu={true} pill={true} />
export const PillCenterAlignedClosed = () => <Dropdown text='Center Align Closed' menu={false} center={true} pill={true} />
export const PillCenterAlignedOpen = () => <Dropdown text='Center Align Open' menu={true} center={true} pill={true} />

export const NarrowDefaultClosed = () => <Dropdown text='Default Closed' menu={false} narrow={true} />
export const NarrowPillClosed = () => <Dropdown text='Left Align Closed' menu={false} pill={true} narrow={true} />

// export const Pill = () => <Dropdown text='Default Closed' />

export const Pill = () => (
  <div style={{ height: 200 }}>
    <Dropdown text='Pill Dropdown' type='pill'>
      <DropdownItem> Dropdown Item </DropdownItem>
      <DropdownItem> Dropdown Item </DropdownItem>
      <DropdownItem> Dropdown Item </DropdownItem>
    </Dropdown>
  </div>
)

export const DefaultLeft = () => <Dropdown align='left' text='Left Align' />
export const DefaultCenter = () => <Dropdown align='center' text='Center Align' />
export const DefaultNarrow = () => <Dropdown narrow={true} text='Default Narrow' />
export const DefaultDisabled = () => <Dropdown disabled={true} text='Default Narrow' />

export const PillLeft = () => <Dropdown type='pill' align='left' text='Left Align' />
export const PillCenter = () => <Dropdown type='pill' align='center' text='Center Align' />
export const PillNarrow = () => <Dropdown type='pill' narrow={true} text='Default Narrow' />

export const DefaultSuboptions = () => (
  <div style={{ height: 280 }}>
    <Dropdown text='Default Suboptions'>
      <DropdownItem> Dropdown Item </DropdownItem>
      <DropdownItem> Dropdown Item </DropdownItem>
      <DropdownSublist name='Subtitle'>
        <DropdownItem> Suboption </DropdownItem>
        <DropdownItem> Suboption </DropdownItem>
      </DropdownSublist>
    </Dropdown>
  </div>
)

export const PillSuboptions = () => (
  <div style={{ height: 280 }}>
    <Dropdown text='Pill Suboptions' type='pill'>
      <DropdownItem> Dropdown Item </DropdownItem>
      <DropdownItem> Dropdown Item </DropdownItem>
      <DropdownSublist name='Subtitle'>
        <DropdownItem> Suboption </DropdownItem>
        <DropdownItem> Suboption </DropdownItem>
      </DropdownSublist>
    </Dropdown>
  </div>
)

export const OnclickActions = () => (
  <div style={{ height: 250 }}>
    <Dropdown text='Onclick Actions'>
      <DropdownItem onClick={exampleOnClick}> Dropdown Item </DropdownItem>
      <DropdownItem onClick={exampleOnClick}> Dropdown Item </DropdownItem>
      <DropdownSublist name='Subtitle'>
        <DropdownItem onClick={exampleOnClick}> Suboption </DropdownItem>
      </DropdownSublist>
    </Dropdown>
  </div>
)
