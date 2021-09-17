import * as React from "react"
import styled, { CSSProp } from "styled-components"
import * as Styles from "./Styles"

type ExampleComponentProps = Props & React.ComponentProps<"button">

interface Props {
  status: "success" | "error" | "info"
  size?: "small" | "medium" | "large"
  css?: CSSProp
  children: React.ReactElement
}

const Button = styled.button<Required<Props>>`
  ${Styles.base}
  ${(props) => Styles[props.status]}
  ${(props) => Styles[props.size]}
  ${(props) => props.css}
`

export const ExampleComponent = React.forwardRef<
  React.ElementRef<"button">,
  ExampleComponentProps
>((props, forwardedRef) => {
  const { size = "medium", status, children, css = {}, ...rest } = props

  return (
    <Button {...rest} status={status} size={size} ref={forwardedRef} css={css}>
      {children}
    </Button>
  )
})
