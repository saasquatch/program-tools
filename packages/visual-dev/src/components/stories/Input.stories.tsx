import React, { useState } from 'react'
import { Input } from '../Input'

export default {
  title: 'Components / Input',
  component: Input,
}

export const FunctionalInput = () => {
  const [value, setValue] = useState('')
  return <Input value={value} onChange={(e) => setValue(e.target.value)} options={undefined} disabled={undefined} rawErrors={undefined} />
}

export const InputText = () => <Input value='Input Text' />
export const InputDisabled = () => <Input value='Input Text' />
export const Placeholder = () => <Input placeholder='Placeholder Text' />
export const PlaceholderDisabled = () => <Input placeholder='Placeholder Text' />
export const InvalidField = () => <Input value='Invalid Field' />

export const InputEdit = () => <Input value='' icon='edit' />
export const InputSearch = () => <Input value='' icon='search' position='left' />
export const InputClose = () => <Input value='' icon='close' />
