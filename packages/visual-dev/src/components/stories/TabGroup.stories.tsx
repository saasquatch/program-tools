import React, { useState } from 'react'
import { Tab, TabGroup } from '../TabGroup'

export default {
  title: 'Components / Tab',
  component: TabGroup,
}

export const Functional = () => {

	const [count, setCount] = useState(0)

	const states = {
		0: false,
		1: false,
		2: false,
	}

  states[count] = true


	return (
	  <TabGroup>
		<Tab selected={states[0]} onClick={() => setCount(0)}>Tab 1</Tab>
		<Tab selected={states[1]} onClick={() => setCount(1)}>Tab 2</Tab>
		<Tab selected={states[2]} onClick={() => setCount(2)}>Tab 3</Tab>
	  </TabGroup>
	)
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
