import React, { useState } from "react"
import { Checkbox } from "."

export default {
  title: "Components / Checkbox",
  component: Checkbox,
}

export const functional = () => {
  const [value, setValue] = useState(false)
  const options = {
    text: "Checkbox",
  }
  return <Checkbox options={options} value={value} onChange={undefined} onClick={() => setValue(!value)} />
}

export const checkbox = () => {
  const options = {
    text: "Checkbox",
  }
  return <Checkbox options={options} value={false} onChange={undefined} />
}

export const checkboxChecked = () => {
  const options = {
    text: "Checked",
  }
  return <Checkbox options={options} value={true} onChange={undefined} />
}

export const Disabled = () => {
  const options = {
    text: "Disabled",
  }
  return <Checkbox options={options} value={false} disabled={true} onChange={undefined} />
}

export const DisabledChecked = () => {
  const options = {
    text: "Checked",
  }
  return <Checkbox options={options} value={true} disabled={true} onChange={undefined} />
}
