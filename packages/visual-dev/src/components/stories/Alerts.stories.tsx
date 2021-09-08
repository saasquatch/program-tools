import React from "react";
import { AlertComponent } from "../Alerts";


export default {
  title: "Components / Alerts",
  component: AlertComponent
}

export const critical = () => <AlertComponent type='critical' title='A critical alert'>An explanation of what this alert is.</AlertComponent>
export const warning = () => <AlertComponent type='warning' title='A warning alert'>An explanation of what this alert is.</AlertComponent>
export const success = () => <AlertComponent type='success' title='A success alert'>An explanation of what this alert is.</AlertComponent>
export const info = () => <AlertComponent type='info' title='An info alert'>An explanation of what this alert is in multiple lines.</AlertComponent>

export const noTitle = () => <AlertComponent type='critical'>No title test. An explanation of what this alert is in multiple multiple multiple multiple lines.</AlertComponent>
export const noType = () => <AlertComponent>No type test. An explanation of what this alert is in multiple multiple multiple multiple lines.</AlertComponent>