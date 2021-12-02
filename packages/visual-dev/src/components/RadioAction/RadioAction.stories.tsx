import React, { useState } from 'react'
import { RadioAction, RadioActionGroup } from '.'

export default {
  title: 'Components / RadioAction',
  component: RadioAction,
}

export const Functional = () => {
  const options = {
    title: 'Primary action',
    text: 'Addtional text describing conequences of this option',
  }
  const [value, setValue] = useState(0)
  return (
    <RadioActionGroup>
      <RadioAction options={options} value={value == 1} onChange={void 0} onClick={() => setValue(1)} />
      <RadioAction options={options} value={value == 2} onChange={void 0} onClick={() => setValue(2)} />
      <RadioAction options={options} value={value == 3} onChange={void 0} onClick={() => setValue(3)} />
    </RadioActionGroup>
  )
}

export const radioAction = () => {
  const options = {
    title: 'Primary action',
    text: 'Addtional text describing conequences of this option',
  }
  return (
    <RadioActionGroup>
      <RadioAction options={options} value={false} onChange={void 0} />
    </RadioActionGroup>
  )
}

export const radioActionChecked = () => {
  const options = {
    title: 'Primary action',
    text: 'Addtional text describing conequences of this option',
  }
  return (
    <RadioActionGroup>
      <RadioAction options={options} value={true} onChange={void 0} />
    </RadioActionGroup>
  )
}
