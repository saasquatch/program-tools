import * as React from "react"
import root from "react-shadow/styled-components"
import styled from "styled-components"
import * as Styles from "./Styles"
import { IconKey, Icon } from "../Icon"
import { IconButton } from "../Button"

type InputProps = OptionProps & React.ComponentProps<"input">

interface OptionProps {
  value?: any
  onChange?: any
  options?: any
  disabled?: any
  type?: any
  rawErrors?: any
  icon?: IconKey
  buttons?: boolean
  position?: "left" | "right"
}

const ShadowDom = styled(root.div)``

const InputBox = styled.input<{ isInvalid: boolean }>`
  ${Styles.InputBoxStyle}
  ${(props) => (props.isInvalid ? Styles.invalid : "")}
`

const IconDiv = styled.div<{ position: string }>`
  ${Styles.IconStyle}
  ${(props) => (props.position == "left" ? "left: 45px;" : "left: 305px;")}
`

export const Input = React.forwardRef<React.ElementRef<"input">, InputProps>((props, forwardedRef) => {
  const { icon, position = "right", type = "text", buttons = false, rawErrors, ...rest } = props

  return (
    <ShadowDom>
      <InputBox {...rest} type={type} ref={forwardedRef} isInvalid={rawErrors} />
      {icon && (
        <IconDiv position={position}>
          <Icon icon={icon} size={"22px"} />
        </IconDiv>
      )}
      {buttons && (
        <>
          <IconButton icon="checkmark" size="mini" css="position: relative; left: -50px;" primary icon_css="margin: -10px; top: 8px;" />
          <IconButton icon="close" size="mini" css="position: relative; left: -47px;" icon_css="margin: -10px; top: 8px;  color: #858585" />
        </>
      )}
    </ShadowDom>
  )
})
