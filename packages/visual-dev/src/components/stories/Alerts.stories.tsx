import React from "react";
import { Alert } from "../Alerts";

export default {
  title: "Components / Alerts",
  component: Alert
}

export const critical = () => <Alert type="critical" title='A critical alert'>An explanation of what this alert is.</Alert>
export const warning = () => <Alert type="warning" title='A warning alert'>An explanation of what this alert is.</Alert>
export const success = () => <Alert type='success' title='A success alert'>An explanation of what this alert is.</Alert>
export const info = () => <Alert type='info' title='An info alert'>An explanation of what this alert is in multiple lines.</Alert>

export const noTitle = () => <Alert type='critical'>No title test. An explanation of what this alert is in multiple multiple multiple multiple lines.</Alert>
export const noType = () => <Alert>No type test. An explanation of what this alert is in multiple multiple multiple multiple lines.</Alert>