import * as React from 'react';
import styled, { CSSProp } from 'styled-components'
import * as Styles from './Styles'

interface Subprops {
  status: "success" | "error" | "info"
  children: string
  size?: "small" | "medium" | "large"
}

type ExampleComponentProps = Props & React.ComponentProps<"button">
type Props = Subprops & {css?: CSSProp}

const Button = styled.button<Required<Props>>`
  ${Styles.base}
  ${props => Styles[props.status]}
  ${props => Styles[props.size]}
  ${props => props.css}
`

export const ExampleComponent = React.forwardRef<React.ElementRef<'button'>, ExampleComponentProps>((props, forwardedRef) => {
  const {
    size = "medium",
    status,
    children,
	  css = {},
    ...rest
	} = props;

  return (
		<Button {...rest} status={status} size={size} ref={forwardedRef} css={css}>{children}</Button>
  )
})