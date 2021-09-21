import React, { useState } from 'react'
import { TextBox, Checkbox } from '../Form'

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

export const FunctionalCheckbox = () => {
  const [value, setValue] = useState(false)
  return <Checkbox checked={value} onChange={(e) => setValue(!value)} />
}
