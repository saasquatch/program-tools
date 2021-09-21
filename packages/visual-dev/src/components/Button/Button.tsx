import * as React from 'react'
import styled, { CSSProp } from 'styled-components'
import * as Styles from './Styles'

type ButtonProps = StyleProps & React.ComponentProps<'button'>

interface StyleProps {
  status: 'success' | 'error' | 'info'
  size?: 'small' | 'medium' | 'large'
  css?: CSSProp
  children: React.ReactElement | string
}

const ButtonStyle = styled.button<Required<StyleProps>>`
  ${Styles.base}
  ${(props) => Styles[props.status]}
  ${(props) => Styles[props.size]}
  ${(props) => props.css}
`

export const Button = React.forwardRef<React.ElementRef<'button'>, ButtonProps>((props, forwardedRef) => {
  const { size = 'medium', status, children, css = {}, ...rest } = props

  return (
    <ButtonStyle {...rest} status={status} size={size} ref={forwardedRef} css={css}>
      {children}
    </ButtonStyle>
  )
})
