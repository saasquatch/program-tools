import * as React from "react"
import styled, { CSSProp } from "styled-components"
import { IconKey, Icon } from "../Icon"
import * as Styles from "./Styles"

type DropdownProps = OptionProps & StyleProps & React.ComponentProps<"div">

interface OptionProps {
  text?: string
  showMenu?: boolean
  pill?: boolean
  center?: boolean
  narrow?: boolean
  disabled?: boolean
  icon?: IconKey
  onClickDropdown?: () => void
  children?: React.ReactNode
}

interface ButtonProps {
  pill?: boolean
  center?: boolean
  narrow?: boolean
  disabled?: boolean
}

interface DropdownItemProps {
  onClick?: () => void
  css?: CSSProp
  children?: React.ReactNode
}

interface DropdownSublistProps {
  name: string
  css?: CSSProp
  children: React.ReactNode
}

interface StyleProps {
  css?: CSSProp
}

const DropdownContainer = styled("div")<Required<StyleProps>>`
  ${Styles.base}
  ${(props) => props.css}
`

const DropdownButton = styled("div")<Required<ButtonProps>>`
  ${Styles.button}
  border-radius: ${(props) => (props.pill ? "100px" : "4px")};
  text-align: ${(props) => (props.center ? "center" : "left")};
  line-height: ${(props) => (props.narrow ? "10px" : "16px")};
  color: ${(props) => (props.disabled ? "var(--sq-action-secondary-border)" : "var(--sq-text-on-secondary)")};
  background: ${(props) => (props.disabled ? "var(--sq-surface-subdued)" : "var(--sq-surface)")};
  &:hover {
    ${(props) => !props.disabled && "box-shadow: inset 0 0 0 1px var(--sq-action-secondary-hovered);"}
    ${(props) => props.disabled && "cursor: not-allowed;"};
  }
`
const DropdownContent = styled("div")<Pick<DropdownProps, "pill">>`
  ${Styles.content}
  border-radius: ${(props) => (props.pill ? "20px" : "4px")};
`

const DropdownItemStyle = styled("div")<Required<StyleProps>>`
  ${Styles.item}
  ${(props) => props.css}
`

const SublistContent = styled("div")<Required<StyleProps>>`
  ${Styles.subcontent}
  ${(props) => props.css}
`

const DropdownSubItemStyle = styled("div")`
  ${Styles.subitem}
`

const DropdownSublistStyle = styled("div")`
  ${Styles.sublist}
`

const ArrowStyle = styled("span")`
  ${Styles.arrow}
`

export const Dropdown = React.forwardRef<React.ElementRef<"div">, DropdownProps>((props, forwardedRef) => {
  const { text = "", showMenu = false, pill = false, center = false, narrow = false, disabled = false, icon, onClickDropdown, children, css = {}, ...rest } = props

  return (
    <DropdownContainer {...rest} ref={forwardedRef} css={css}>
      <DropdownButton pill={pill} center={center} narrow={narrow} disabled={disabled} onClick={onClickDropdown}>
        {icon && <Icon color="inherit" size="16px" icon={icon} style={{ margin: -3, top: 2.5, marginRight: "8px" }} />}
        {text} <ArrowStyle>{showMenu ? arrow_up : arrow_down}</ArrowStyle>
      </DropdownButton>
      {showMenu && <DropdownContent pill={pill}>{children}</DropdownContent>}
    </DropdownContainer>
  )
})

export const DropdownItem = React.forwardRef<React.ElementRef<"div">, DropdownItemProps>((props, forwardedRef) => {
  const { onClick, children, css = {}, ...rest } = props

  return (
    <DropdownItemStyle onClick={onClick} {...rest} ref={forwardedRef} css={css}>
      {children}
    </DropdownItemStyle>
  )
})

export const DropdownSublist = React.forwardRef<React.ElementRef<"div">, DropdownSublistProps>((props, forwardedRef) => {
  const { name, children, css = {}, ...rest } = props

  return (
    <SublistContent {...rest} ref={forwardedRef} css={css}>
      <DropdownSublistStyle>{name}</DropdownSublistStyle>
      <DropdownSubItemStyle>{children}</DropdownSubItemStyle>
    </SublistContent>
  )
})

// TO-DO: When available in Icon component, use from there
const arrow_up = (
  <svg width={10} height={7} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M.146 4.517L1.25 5.4 5 2.4l3.75 3 1.104-.883L5 .634.146 4.517z" fill="#858585" />
  </svg>
)

const arrow_down = (
  <svg width={10} height={6} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M.146 1.483L1.25.6 5 3.6l3.75-3 1.104.883L5 5.366.146 1.483z" fill="#858585" />
  </svg>
)
