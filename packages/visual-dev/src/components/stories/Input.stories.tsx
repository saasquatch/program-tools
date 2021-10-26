import React, { useState } from "react"
import { Input } from "../Input"

export default {
  title: "Components / Input",
  component: Input,
}

export const FunctionalInput = () => {
  const [value, setValue] = useState("")
  return <Input value={value} onChange={(e) => setValue(e.target.value)} options={undefined} disabled={undefined} rawErrors={undefined} />
}

export const InputText = () => <Input value="Input Text" />
export const InputDisabled = () => <Input value="Input Text" disabled />
export const Placeholder = () => <Input placeholder="Placeholder Text" />
export const PlaceholderDisabled = () => <Input placeholder="Placeholder Text" disabled />
export const InvalidField = () => <Input value="Invalid Field" />

export const InputEdit = () => <Input value="" icon="edit" disabled />
export const InputEditDisabled = () => <Input value="" icon="edit" />
export const InputSearch = () => <Input value="" icon="search" position="left" />
export const InputSearchDisabled = () => <Input value="" icon="search" position="left" disabled />
export const InputClose = () => <Input value="" icon="close" />
export const InputCloseDisabled = () => <Input value="" icon="close" disabled />

export const InputNumber = () => <Input value="" type="number" />
export const InputNumberDisabled = () => <Input type="number" disabled />

export const InputButtons = () => <Input value="Input Text" buttons />
