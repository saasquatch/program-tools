import React from 'react';
import { Switch } from '../Switch'

export default {
	title: "Components / Switch",
	component: Switch
}

export const Default = () => <Switch id="default"></Switch>
export const On = () => <Switch status="on" id="on"></Switch>
export const Critical = () => <Switch status="on" color="critical" id="critical"></Switch>
export const Off = () => <Switch status="off" id="off"></Switch>