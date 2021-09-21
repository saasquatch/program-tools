import React, { useState } from 'react'
import { Input } from '../Form'

export default {
  title: 'Components / Form',
  component: Input,
}

export const Default = () => {
  const [value, setValue] = useState('Input Value')
  return <Input value={value} onChange={(e) => setValue(e.target.value)} />
}

export const Placeholder = () => {
  const [value, setValue] = useState('')
  return <Input placeholder='Placeholder Text' value={value} onChange={(e) => setValue(e.target.value)} />
}

export const Disabled = () => {
  const [value, setValue] = useState('')
  return <Input placeholder='Disabled' value={value} onChange={(e) => setValue(e.target.value)} disabled />
}

// // export const checkbox = () => {
//   const [value, setValue] = useState('')
//   return <Checkbox value={value} onChange={(e) => setValue(e.target.value)} />
// }
