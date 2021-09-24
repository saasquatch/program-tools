import React from 'react'
import { Alert } from '../Alert'

export default {
  title: 'Components / Alert',
  component: Alert,
}

export const critical = () => (
  <Alert type='critical' title='A critical alert'>
    An explanation of what this alert is.
  </Alert>
)
export const warning = () => (
  <Alert type='warning' title='A warning alert'>
    An explanation of what this alert is.
  </Alert>
)
export const success = () => (
  <Alert type='success' title='A success alert'>
    An explanation of what this alert is.
  </Alert>
)
export const info = () => (
  <Alert type='info' title='An info alert'>
    An explanation of what this alert is in multiple lines.
  </Alert>
)
