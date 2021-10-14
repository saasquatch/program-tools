import React from 'react'
import { Tab, TabGroup } from '../TabGroup'

export default {
  title: 'Components / Tab',
  component: TabGroup,
}

export const Primary = () => {
  return (
    <TabGroup>
      <Tab selected={true}>Selected</Tab>
      <Tab>Unselected</Tab>
      <Tab>Unselected</Tab>
    </TabGroup>
  )
}

export const Secondary = () => {
  return (
    <TabGroup color='secondary'>
      <Tab color='secondary' selected={true}>
        Selected
      </Tab>
      <Tab color='secondary'>Unselected</Tab>
      <Tab color='secondary'>Unselected</Tab>
    </TabGroup>
  )
}
