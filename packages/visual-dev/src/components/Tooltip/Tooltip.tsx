import React from "react"
import styled, { CSSProp } from "styled-components"

import * as Styles from "./Styles"

type TooltipProps = OptionProps & StyleProps & Omit<React.ComponentProps<"div">, "translate">

interface OptionProps {
  text?: string
  direction?: "top" | "left" | "bottom" | "right"
  showTooltip?: boolean
  children?: React.ReactNode
}

interface StyleProps {
  css?: CSSProp
}

const TooltipDiv = styled.div<Required<StyleProps>>`
  ${Styles.base}
  ${(props) => props.css}
`

const TooltipTip = styled.div`
  ${Styles.tooltip}
`

export const Tooltip = React.forwardRef<React.ElementRef<"div">, TooltipProps>((props, forwardedRef) => {
  const { text = "", direction = "top", showTooltip = false, children, css = {}, ...rest } = props

  return (
    <TooltipDiv {...rest} ref={forwardedRef} css={css}>
      {children}
      {showTooltip && <TooltipTip className={direction}>{text}</TooltipTip>}
    </TooltipDiv>
  )
})
