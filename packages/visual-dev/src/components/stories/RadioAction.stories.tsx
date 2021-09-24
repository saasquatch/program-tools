import React, { useState } from 'react'
import { RadioAction } from '../RadioAction'

export default {
  title: 'Components / RadioAction',
  component: RadioAction,
}

export const Functional = () => {
  const options = {
    title: 'Primary action',
    text: 'Addtional text describing conequences of this option',
  }
  const [value, setValue] = useState(false)
  return <RadioAction options={options} value={value} onChange={void 0} onClick={() => setValue(!value)} />
}

export const radioAction = () => {
  const options = {
    title: 'Primary action',
    text: 'Addtional text describing conequences of this option',
  }
  return <RadioAction options={options} value={false} onChange={void 0} />
}

export const radioActionChecked = () => {
  const options = {
    title: 'Primary action',
    text: 'Addtional text describing conequences of this option',
  }
  return <RadioAction options={options} value={true} onChange={void 0} />
}
