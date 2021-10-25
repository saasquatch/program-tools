import * as React from "react"
import styled, { CSSProp } from "styled-components"
import { IconKey, Icon } from "../Icon"
import { ButtonSpinner, successAnimation } from "./Animations"
import * as Styles from "./Styles"
import { css } from "styled-components"

type ButtonProps = OptionProps & StyleProps & React.ComponentProps<"button">

interface OptionProps {
  icon?: IconKey
  left?: boolean
  right?: boolean
  children?: React.ReactElement | string
}

interface StyleProps {
  nopill?: boolean
  loading?: boolean
  critical?: boolean
  success?: boolean
  size?: "small" | "medium" | "large"
  css?: CSSProp
}

const icon_size = {
  small: "14px",
  medium: "16px",
  large: "22px",
}

const checkmark_anim = {
  small: "12px",
  medium: "13px",
  large: "18px",
}

const loading_anim = {
  small: "12px",
  medium: "13px",
  large: "18px",
}

const anim_padding = {
  small: 2,
  medium: 3,
  large: 4,
}

// BASE BUTTON STYLING

const base = css`
  cursor: pointer;

  //   display: flex;
  //   flex-direction: row;
  //   justify-content: center;
  //   align-items: center;

  border: none;
  border-radius: 4px;

  background: var(--sq-action-primary);
  color: var(--sq-surface);

  font-family: "Helvetica Neue", Helvetica, sans-serif;
  font-weight: var(--sq-font-weight-bold);

  &:hover {
    background: var(--sq-action-primary-hovered);
  }

  &:disabled {
    cursor: not-allowed;
    background: var(--sq-surface-button-disabled);
    &:hover {
      background: var(--sq-surface-button-disabled);
    }
  }
`

// SIZE VARIANTS

const small = css`
  padding: 2.5px 10.5px;
  font-size: var(--sq-font-size-button-small);
  line-height: var(--sq-line-height-button-small);
`

const medium = css`
  padding: 5px 16px;
  font-size: var(--sq-font-size-button-medium);
  line-height: var(--sq-line-height-button-medium);
`

const large = css`
  padding: 7.5px 21px;
  font-size: var(--sq-font-size-button-large);
  line-height: var(--sq-line-height-button-large);
`

// STATUS VARIANTS

const critical = css`
  background: var(--sq-surface-critical);
  &:hover {
    background: var(--sq-surface-critical-hovered);
  }
`
const success = css`
  background: var(--sq-surface-success);
  &:hover {
    background: var(--sq-surface-success-hovered);
  }
`
const loading = css`
  background: var(--sq-surface-button-disabled);
  &:hover {
    background: var(--sq-surface-button-disabled);
  }
`

const Button = styled.button<Required<StyleProps>>`
  ${base}
  ${(props) => props.size == "small" && small}
  ${(props) => props.size == "medium" && medium}
  ${(props) => props.size == "large" && large}
  ${(props) => props.critical && critical}
  ${(props) => props.success && success}
  ${(props) => props.loading && loading}
`
export const PrimaryButton = React.forwardRef<React.ElementRef<"button">, ButtonProps>((props, forwardedRef) => {
  let { nopill = true, loading = false, critical = false, success = false, icon, left = true, right = false, size = "medium", children, css = {}, ...rest } = props

  if (right) left = false

  return (
    <Button {...rest} nopill={nopill} loading={loading} critical={critical} success={success} size={size} ref={forwardedRef} css={css}>
      {left && icon && <Icon icon={icon} size={icon_size[size]} css="vertical-align: none;" />}
      <span> {children} </span>
      {right && icon && <Icon icon={icon} size={icon_size[size]} css="vertical-align: none;" />}
      {loading && (
        <>
          {children && <span style={{ padding: anim_padding[size] }}></span>}
          {ButtonSpinner(loading_anim[size])}
        </>
      )}
      {success && (
        <>
          {children && <span style={{ padding: anim_padding[size] }}></span>}
          {successAnimation(checkmark_anim[size])}
        </>
      )}
    </Button>
  )
})
