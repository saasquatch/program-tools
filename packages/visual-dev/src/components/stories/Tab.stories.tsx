import React, { useState } from 'react'
import { TabGroup } from '../Tab'

export default {
  title: 'Components / Tab',
  component: TabGroup,
}

// Number labels are only for an example. There is def a better way
// This is more a POC for one way to do tab groups
export const Default = () => {
  const [select, onSelected] = useState(1)
  return (
    <TabGroup selected={select} onTabClicked={(id) => onSelected(id)}>
      <TabGroup.Tab label={1}>Selected</TabGroup.Tab>
      <TabGroup.Tab label={2}>Unselected</TabGroup.Tab>
      <TabGroup.Tab label={3}>Unselected</TabGroup.Tab>
    </TabGroup>
  )
}
