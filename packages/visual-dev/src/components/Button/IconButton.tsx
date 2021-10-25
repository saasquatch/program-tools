import * as React from "react"
import styled, { CSSProp } from "styled-components"
import { Icon, IconKey } from "../Icon"
import * as Styles from "./Styles"

type ButtonProps = OptionProps & StyleProps & React.ComponentProps<"button">

interface OptionProps {
  icon: IconKey
}

interface StyleProps {
  circle?: boolean
  borderless?: boolean
  size?: "small" | "medium" | "large"
  css?: CSSProp
}

const Button = styled.button<Required<StyleProps>>`
  ${Styles.icon}
  ${(props) => props.borderless && Styles.borderless}
  ${(props) => props.circle && Styles.circle}
  ${(props) => props.size == "small" && Styles.icon_small}
  ${(props) => props.size == "medium" && Styles.icon_medium}
  ${(props) => props.size == "large" && Styles.icon_large}
`
export const IconButton = React.forwardRef<React.ElementRef<"button">, ButtonProps>((props, forwardedRef) => {
  const { icon, borderless = false, circle = false, size = "medium", children, css = {}, ...rest } = props

  return (
    <Button {...rest} circle={circle} borderless={borderless} size={size} ref={forwardedRef} css={css}>
      <Icon icon={icon} size={Styles.icon_only_size[size]} />
    </Button>
  )
})
