import * as React from 'react';
import styled from 'styled-components'

import * as Styles from './Styles'

interface AvatarProps {
  status: "success" | "error" | "info"
  children: string
  size?: "small" | "medium" | "large"
}

const Button = styled.button<Required<AvatarProps>>`
  ${Styles.base}
  ${props => Styles[props.status]}
  ${props => Styles[props.size]}
`

export const Avatar: React.FC<AvatarProps> = ({
  size = "medium",
  status,
  children
}) => {
  return <Button status={status} size={size}>{children}</Button>
}
