import React, { useState } from 'react'
import { TextBox, Radio } from '../Form'

export default {
  title: 'Components / Form',
  component: TextBox,
}

export const FunctionalInput = () => {
  const [value, setValue] = useState('')
  return <TextBox value={value} onChange={(e) => setValue(e.target.value)} />
}

export const InputText = () => <TextBox value='Input Text' />
export const InputDisabled = () => <TextBox value='Input Text' disabled />
export const Placeholder = () => <TextBox placeholder='Placeholder Text' />
export const PlaceholderDisabled = () => <TextBox placeholder='Placeholder Text' disabled />

export const RadioUnchecked = () => {
  const options = {
    primary: 'Radio',
  }
  return <Radio options={options} />
}

export const RadioChecked = () => {
  const options = {
    primary: 'Checked',
  }
  return <Radio options={options} checked />
}

export const RadioText = () => {
  const options = {
    primary: 'Primary action',
    secondary: 'Addtional text describing conequences of this option',
  }
  return <Radio options={options} checked />
}
