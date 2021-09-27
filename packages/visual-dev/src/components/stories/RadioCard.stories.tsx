import React, { useState } from 'react'
import { RadioCard } from '../RadioCard'

export default {
  title: 'Components / RadioCard',
  component: RadioCard,
}

export const Functional = () => {
  const options = {
    title: 'A title for this option',
    text: 'This is a default radio group button. Toggle it by clicking.',
  }
  const [value, setValue] = useState(false)
  return <RadioCard options={options} value={value} onChange={void 0} onClick={() => setValue(!value)} />
}

export const radioAction = () => {
  const options = {
    title: 'A title for this option',
    text: 'This is a default radio group button. It is unselected.',
  }
  return <RadioCard options={options} value={false} onChange={void 0} />
}

export const radioActionChecked = () => {
  const options = {
    title: 'A title for this option',
    text: 'This is a selected radio group button.',
  }
  return <RadioCard options={options} value={true} onChange={void 0} />
}
