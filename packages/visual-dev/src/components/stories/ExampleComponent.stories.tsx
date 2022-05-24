import React from 'react'
import { ExampleComponent } from '../ExampleComponent'

export default {
  title: 'Examples / Component',
  component: ExampleComponent,
}

export const Success = () => <ExampleComponent status='success'>Success</ExampleComponent>
export const error = () => <ExampleComponent status='error'>Error</ExampleComponent>
export const info = () => <ExampleComponent status='info'>Info</ExampleComponent>

export const Small = () => (
  <ExampleComponent status='info' size='small'>
    Small
  </ExampleComponent>
)
export const Large = () => (
  <ExampleComponent status='info' size='large'>
    Large
  </ExampleComponent>
)
