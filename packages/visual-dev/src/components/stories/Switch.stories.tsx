import React, { useState } from 'react';
import { Switch } from '../Switch'

export default {
	title: "Components / Switch",
	component: Switch
}

export const SuccessOff = () => {

	const [enabled, setEnable] = useState(false)

	return <Switch id="success_off" checked={enabled} onChange={() => setEnable(!enabled)}></Switch>

}

export const SuccessOn = () => {

	const [enabled, setEnable] = useState(true)

	return <Switch id="success_on" checked={enabled} onChange={() => setEnable(!enabled)}></Switch>

}

export const CriticalOff = () => {

	const [enabled, setEnable] = useState(false)

	return <Switch id="critical_off" color="critical" checked={enabled} onChange={() => setEnable(!enabled)}></Switch>

}

export const CriticalOn = () => {

	const [enabled, setEnable] = useState(true)

	return <Switch id="critical_on" color="critical" checked={enabled} onChange={() => setEnable(!enabled)}></Switch>

}

export const TextLeft = () => {

	const [enabled, setEnable] = useState(false)

	return <Switch id="text_left" checked={enabled} onChange={() => setEnable(!enabled)} position="left"> Text label for switch: </Switch>

}

export const TextRight = () => {

	const [enabled, setEnable] = useState(false)

	return <Switch id="text_right" checked={enabled} onChange={() => setEnable(!enabled)} position="right"> Text label for switch: </Switch>

}
