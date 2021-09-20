import React, { useState } from 'react'
import { Switch } from '../Switch'

export default {
  title: 'Components / Switch',
  component: Switch,
}

export const SuccessOff = () => {
  const [enabled, setEnable] = useState(false)
  return <Switch id='success_off' checked={enabled} onChange={() => setEnable(!enabled)} />
}

export const SuccessOn = () => {
  const [enabled, setEnable] = useState(true)
  return <Switch id='success_on' checked={enabled} onChange={() => setEnable(!enabled)} />
}

export const CriticalOff = () => {
  const [enabled, setEnable] = useState(false)
  return <Switch id='critical_off' color='critical' checked={enabled} onChange={() => setEnable(!enabled)} />
}

export const CriticalOn = () => {
  const [enabled, setEnable] = useState(true)
  return <Switch id='critical_on' color='critical' checked={enabled} onChange={() => setEnable(!enabled)} />
}
