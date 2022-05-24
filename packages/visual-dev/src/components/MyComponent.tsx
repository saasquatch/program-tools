import * as React from 'react'

interface MyComponentProps {
  name: string
}

const MyComponent: React.FC<MyComponentProps> = ({ name }) => (
  <div role='heading' aria-level={1}>My First Component: {name}</div>
)

export default MyComponent;
