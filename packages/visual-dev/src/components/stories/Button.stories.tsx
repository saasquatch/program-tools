import React, { useState } from 'react'
import { Button } from '../Button'

export default {
  title: 'Components / Button',
  component: Button,
}

export const primary = () => {
  const [count, setCount] = useState(0)

  const states = {
    0: false,
    1: false,
    2: false,
  }

  states[count] = true

  return (
    <Button variant='primary' loading={states[1]} success={states[2]} onClick={() => setCount((count + 1) % 3)}>
      Primary
    </Button>
  )
}

export const primarySmall = () => (
  <Button variant='primary' size='small'>
    Primary
  </Button>
)
export const primaryMedium = () => (
  <Button variant='primary' size='medium'>
    Primary
  </Button>
)
export const primaryLarge = () => (
  <Button variant='primary' size='large'>
    Primary
  </Button>
)
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

export const secondarySmall = () => (
  <Button variant='secondary' size='small'>
    Secondary
  </Button>
)
export const secondaryMedium = () => (
  <Button variant='secondary' size='medium'>
    Secondary
  </Button>
)
export const secondaryLarge = () => (
  <Button variant='secondary' size='large'>
    Secondary
  </Button>
)

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

export const circleIconSmall = () => <Button variant='circle' icon='add' size='small' />
export const circleIconMedium = () => <Button variant='circle' icon='add' size='medium' />
export const circleIconLarge = () => <Button variant='circle' icon='add' size='large' />

export const iconButton = () => (
  <Button variant='secondary' icon='add'>
    Icon Button
  </Button>
)

export const textSmall = () => (
  <Button variant='text' size='small'>
    Text Button
  </Button>
)
export const textMedium = () => (
  <Button variant='text' size='medium'>
    Text Button
  </Button>
)
export const textLarge = () => (
  <Button variant='text' size='large'>
    Text Button
  </Button>
)

export const iconTextSmall = () => (
  <Button variant='text' icon='block' size='small'>
    Text Button
  </Button>
)

export const iconTextMedium = () => (
  <Button variant='text' icon='block' size='medium'>
    Text Button
  </Button>
)

export const iconTextLarge = () => (
  <Button variant='text' icon='block' size='large'>
    Text Button
  </Button>
)
