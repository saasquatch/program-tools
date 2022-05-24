import * as React from 'react'
import styled, { CSSProp } from 'styled-components'
import * as Styles from './Styles'

type ExampleComponentProps = StyleProps & Omit<React.ComponentProps<'button'>, "css">

interface StyleProps {
  status: 'success' | 'error' | 'info'
  size?: 'small' | 'medium' | 'large'
  customCSS?: CSSProp
  children: React.ReactElement | string
}

const Button = styled.button<Required<StyleProps>>`
  ${Styles.base}
  ${(props) => Styles[props.status]}
  ${(props) => Styles[props.size]}
  ${(props) => props.customCSS}
`

export const ExampleComponent = React.forwardRef<React.ElementRef<'button'>, ExampleComponentProps>((props, forwardedRef) => {
  const { size = 'medium', status, children, customCSS = {}, ...rest } = props

  return (
    <Button {...rest} status={status} size={size} ref={forwardedRef} customCSS={customCSS}>
      {children}
    </Button>
  )
})
