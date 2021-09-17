import React, { useState } from 'react'
import { Switch } from '../Switch'

export default {
  title: 'Components / Switch',
  component: Switch,
}

export const SuccessOff = () => {
  const [enabled, setEnable] = useState(false)
  return <Switch id='success_off' checked={enabled} onChange={() => setEnable(!enabled)}></Switch>
}

export const SuccessOn = () => {
  const [enabled, setEnable] = useState(true)
  return <Switch id='success_on' checked={enabled} onChange={() => setEnable(!enabled)}></Switch>
}

export const CriticalOff = () => {
  const [enabled, setEnable] = useState(false)
  return <Switch id='critical_off' color='critical' checked={enabled} onChange={() => setEnable(!enabled)}></Switch>
}

export const CriticalOn = () => {
  const [enabled, setEnable] = useState(true)
  return <Switch id='critical_on' color='critical' checked={enabled} onChange={() => setEnable(!enabled)}></Switch>
}

export const TextLeft = () => {
  const [enabled, setEnable] = useState(false)
  return <Switch id='text_left' checked={enabled} onChange={() => setEnable(!enabled)} textLeft='Default Referrer reward status to Approved: '></Switch>
}

export const TextRight = () => {
  const [enabled, setEnable] = useState(false)
  return <Switch id='text_right' checked={enabled} onChange={() => setEnable(!enabled)} textRight='Default Referrer reward status to Approved'></Switch>
}

export const TextBoth = () => {
  const [enabled, setEnable] = useState(false)
  return <Switch id='text_both' checked={enabled} onChange={() => setEnable(!enabled)} textLeft='Off' textRight='On'></Switch>
}
