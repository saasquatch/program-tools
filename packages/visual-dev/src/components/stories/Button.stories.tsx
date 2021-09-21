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
  <Button variant='primary' disable>
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

export const icon = () => <Button variant='primary' icon='settings'></Button>

export const primaryPill = () => (
  <Button variant='primary' pill>
    Primary
  </Button>
)

export const loadingPill = () => (
  <Button variant='primary' loading pill>
    Loading
  </Button>
)
export const disabledPill = () => (
  <Button variant='primary' disable pill>
    Disabled
  </Button>
)

export const dangerPill = () => (
  <Button variant='primary' danger pill>
    Danger
  </Button>
)
export const successPill = () => (
  <Button variant='primary' success pill>
    Success
  </Button>
)

export const iconPill = () => <Button variant='primary' icon='settings' pill></Button>

export const secondary = () => <Button variant='secondary'>Secondary</Button>

export const secondaryLoading = () => (
  <Button variant='secondary' loading>
    Loading
  </Button>
)

export const secondaryDisabled = () => (
  <Button variant='secondary' disable>
    Disabled
  </Button>
)

export const secondaryPill = () => (
  <Button variant='secondary' pill>
    Secondary
  </Button>
)

export const secondaryLoadingPill = () => (
  <Button variant='secondary' loading pill>
    Loading
  </Button>
)

export const secondaryDisabledPill = () => (
  <Button variant='secondary' disable pill>
    Disabled
  </Button>
)
