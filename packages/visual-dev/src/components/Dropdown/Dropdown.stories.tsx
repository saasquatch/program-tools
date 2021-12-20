import React, { useState } from 'react'
import { Dropdown, DropdownItem, DropdownSublist } from '.'

export default {
  title: 'Components / Dropdown',
  component: Dropdown,
}

const exampleOnClick = () => alert('You clicked a dropdown item.')

export const Functional = () => {
  const [enabled, setEnable] = useState(true)
  return (
    <div style={{ height: 280 }}>
      <Dropdown text='Default Dropdown' onClickDropdown={() => setEnable(!enabled)} showMenu={enabled}>
        <DropdownItem onClick={exampleOnClick}> Dropdown Item </DropdownItem>
        <DropdownItem onClick={exampleOnClick}> Dropdown Item </DropdownItem>
        <DropdownSublist name='Dropdown Subtitle'>
          <DropdownItem onClick={exampleOnClick}> Dropdown Suboption </DropdownItem>
          <DropdownItem onClick={exampleOnClick}> Dropdown Suboption </DropdownItem>
        </DropdownSublist>
      </Dropdown>
    </div>
  )
}

export const DefaultClosed = () => <Dropdown text='Default Closed' showMenu={false} />

export const DefaultOpen = () => <Dropdown text='Default Open' showMenu={true} />

export const Disabled = () => <Dropdown text='Disabled' disabled={true} />

export const CenterAlignedClosed = () => <Dropdown text='Center Align Closed' showMenu={false} center={true} />

export const CenterAlignedOpen = () => <Dropdown text='Center Align Open' showMenu={true} center={true} />

export const IconClosed = () => <Dropdown text='Icon Closed' icon='calendar' showMenu={false} />

export const IconOpen = () => <Dropdown text='Icon Open' icon='calendar' showMenu={true} />

export const PillClosed = () => <Dropdown text='Left Align Closed' showMenu={false} pill={true} />

export const PillOpen = () => <Dropdown text='Left Align Open' showMenu={true} pill={true} />

export const PillDisabled = () => <Dropdown text='Disabled' disabled={true} pill={true} />

export const PillCenterAlignedClosed = () => <Dropdown text='Center Align Closed' showMenu={false} center={true} pill={true} />

export const PillCenterAlignedOpen = () => <Dropdown text='Center Align Open' showMenu={true} center={true} pill={true} />

export const PillIconClosed = () => <Dropdown text='Icon Closed' icon='calendar' showMenu={false} pill={true} />

export const PillIconOpen = () => <Dropdown text='Icon Open' icon='calendar' showMenu={true} pill={true} />

export const NarrowDefaultClosed = () => <Dropdown text='Default Closed' showMenu={false} narrow={true} />

export const NarrowPillClosed = () => <Dropdown text='Left Align Closed' showMenu={false} pill={true} narrow={true} />

export const MenuOptions = () => (
  <div style={{ height: 180 }}>
    <Dropdown text='Menu Options' showMenu={true}>
      <DropdownItem> Dropdown Item </DropdownItem>
      <DropdownItem> Dropdown Item </DropdownItem>
      <DropdownItem> Dropdown Item </DropdownItem>
    </Dropdown>
  </div>
)

export const MenuSuboptions = () => (
  <div style={{ height: 240 }}>
    <Dropdown text='Menu Suboptions' showMenu={true}>
      <DropdownSublist name='Dropdown Subtitle'>
        <DropdownItem> Dropdown Suboption </DropdownItem>
        <DropdownItem> Dropdown Suboption </DropdownItem>
        <DropdownItem> Dropdown Suboption </DropdownItem>
      </DropdownSublist>
    </Dropdown>
  </div>
)
