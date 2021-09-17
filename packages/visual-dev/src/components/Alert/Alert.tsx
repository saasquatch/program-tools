import * as React from "react"
import styled, { CSSProp } from "styled-components"
import "../../styles.css"
import { Icon } from "../Icon"

import * as Styles from "./Styles"

type AlertProps = OptionProps & StyleProps & React.ComponentProps<"div">

interface OptionProps {
  title: string
  children: React.ReactNode
}

interface StyleProps {
  type: "critical" | "warning" | "success" | "info"
  css?: CSSProp
}

const AlertDiv = styled.div<Required<StyleProps>>`
  ${Styles.base}
  ${(props) => Styles[props.type]}
`

export const Alert = React.forwardRef<React.ElementRef<"div">, AlertProps>(
  (props, forwardedRef) => {
    const { type, title, children, css = {}, ...rest } = props

    return (
      <AlertDiv {...rest} type={type} ref={forwardedRef} css={css}>
        {icons[type]}
        <div style={{ paddingLeft: 16 }}>
          <div style={{ fontWeight: "bold" }}>{title} </div>
          <div>{children}</div>
        </div>
      </AlertDiv>
    )
  }
)

const icons = {
  critical: <Icon icon={"alert"} color='var(--sq-surface-critical)' />,
  warning: <Icon icon={"alert"} color='var(--sq-surface-warning)' />,
  success: <Icon icon={"checkmark_circle"} color='var(--sq-text-subdued)' />,
  info: <Icon icon={"help"} color='var(--sq-text)' />,
}
