import React from 'react'
import { Alert } from '../Alert'

export default {
  title: 'Components / Alert',
  component: Alert,
}

export const critical = () => (
  <Alert variant='critical' title='A critical alert'>
    An explanation of what this alert is.
  </Alert>
)
export const warning = () => (
  <Alert variant='warning' title='A warning alert'>
    An explanation of what this alert is.
  </Alert>
)
export const success = () => (
  <Alert variant='success' title='A success alert'>
    An explanation of what this alert is.
  </Alert>
)
export const info = () => (
  <Alert variant='info' title='An info alert'>
    An explanation of what this alert is in multiple lines.
  </Alert>
)
