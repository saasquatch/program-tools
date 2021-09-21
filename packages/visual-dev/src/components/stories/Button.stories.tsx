import React from 'react'
import { Button } from '../Button'

export default {
  title: 'Components / Button',
  component: Button,
}

export const primary = () => <Button variant='primary'>Primary</Button>

export const loading = () => (
  <Button variant='primary' loading>
    Loading
  </Button>
)
export const disabled = () => (
  <Button variant='primary' disabled>
    Disabled
  </Button>
)

export const danger = () => (
  <Button variant='primary' danger>
    Danger
  </Button>
)
export const success = () => (
  <Button variant='primary' success>
    Success
  </Button>
)

export const icon = () => <Button variant='primary' icon='calendar'></Button>

export const primaryPill = () => (
  <Button variant='primary' pill>
    Primary
  </Button>
)
export const secondary = () => <Button variant='secondary'>Error</Button>
export const text = () => <Button variant='text'>Info</Button>
export const circle = () => <Button variant='circle'>Info</Button>
