import React from 'react'
import { Button } from '../Button'

export default {
  title: 'Components / Button',
  component: Button,
}

export const Success = () => <Button status='success'>Success</Button>
export const error = () => <Button status='error'>Error</Button>
export const info = () => <Button status='info'>Info</Button>

export const Small = () => (
  <Button status='info' size='small'>
    Small
  </Button>
)
export const Large = () => (
  <Button status='info' size='large'>
    Large
  </Button>
)
