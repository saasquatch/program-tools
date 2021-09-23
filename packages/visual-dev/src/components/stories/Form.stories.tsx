import React, { useState } from 'react'
import { TextBox, R1, R2, Checkbox } from '../Form'

export default {
  title: 'Components / Form',
  component: TextBox,
}

export const FunctionalInput = () => {
  const [value, setValue] = useState('')
  return <TextBox value={value} onChange={(e) => setValue(e.target.value)} />
}

export const InputText = () => <TextBox value='Input Text' onChange={() => void 0} />
export const InputDisabled = () => <TextBox value='Input Text' disabled />
export const Placeholder = () => <TextBox placeholder='Placeholder Text' />
export const PlaceholderDisabled = () => <TextBox placeholder='Placeholder Text' disabled />

export const radio = () => {
  const options = {
    primary: 'Radio',
  }
  return <R1 options={options} />
}

export const radioChecked = () => {
  const options = {
    primary: 'Checked',
  }
  return <R1 options={options} checked onChange={() => void 0} />
}

export const RadioDescription = () => {
  const options = {
    primary: 'Primary action',
    secondary: 'Addtional text describing conequences of this option',
  }
  const [value, setValue] = useState(false)
  return <R2 options={options} checked={value} onClick={() => setValue(true)} onChange={() => void 0} />
}

export const RadioDescriptionChecked = () => {
  const options = {
    primary: 'Primary action',
    secondary: 'Addtional text describing conequences of this option',
  }
  const [value, setValue] = useState(true)
  return <R2 options={options} checked={value} onClick={() => setValue(true)} onChange={() => void 0} />
}

export const checkbox = () => {
  const options = {
    primary: 'Checkbox',
  }
  return <Checkbox options={options} />
}

export const checkboxChecked = () => {
  const options = {
    primary: 'Checked',
  }
  return <Checkbox options={options} checked onChange={() => void 0} />
}
