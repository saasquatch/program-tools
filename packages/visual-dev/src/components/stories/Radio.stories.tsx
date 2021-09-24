import React, { useState } from 'react'
import { Radio } from '../Radio'

export default {
  title: 'Components / Radio',
  component: Radio,
}

export const Functional = () => {
  const options = {
    text: 'Radio Toggle',
  }
  const [value, setValue] = useState(false)
  return <Radio options={options} value={value} onChange={undefined} onClick={() => setValue(!value)} />
}

export const radio = () => {
  const options = {
    text: 'Radio',
  }
  return <Radio options={options} value={false} onChange={undefined} />
}

export const radioChecked = () => {
  const options = {
    text: 'Checked',
  }
  return <Radio options={options} value={true} onChange={undefined} />
}
