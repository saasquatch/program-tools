import * as React from 'react'
import styled, { CSSProp } from 'styled-components'
import { IconKey, Icon } from '../Icon'
import { ButtonSpinner, successAnimation } from './Animations'
import * as Styles from './Styles'
import { css } from 'styled-components'

type ButtonProps = OptionProps & StyleProps & React.ComponentProps<'button'>

interface OptionProps {
  icon?: IconKey
  children?: React.ReactElement | string
}

interface StyleProps {
  nopill?: boolean
  loading?: boolean
  critical?: boolean
  disable?: boolean
  success?: boolean
  size?: 'small' | 'medium' | 'large'
  css?: CSSProp
}

const size_table = {
  small: '18px',
  medium: '20px',
  large: '24px',
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

  font-family: 'Helvetica Neue', Helvetica, sans-serif;
  font-weight: var(--sq-font-weight-bold);

  &:hover {
    background: var(--sq-action-primary-hovered);
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

const Button = styled.button<Required<StyleProps>>`
  ${base}
  ${(props) => props.size == 'small' && small}
  ${(props) => props.size == 'medium' && medium}
  ${(props) => props.size == 'large' && large}
  ${(props) => props.critical && critical}
  ${(props) => props.success && success}
`
export const PrimaryButton = React.forwardRef<React.ElementRef<'button'>, ButtonProps>((props, forwardedRef) => {
  const { nopill = true, loading = false, critical = false, success = false, disable = false, icon, size = 'medium', children, css = {}, ...rest } = props

  return (
    <Button {...rest} nopill={nopill} loading={loading} critical={critical} success={success} disable={disable} size={size} ref={forwardedRef} css={css}>
      {icon && <Icon icon={icon} size={size_table[size]} css='margin: -2px; vertical-align: none;' />}
      {children}
      {loading && ButtonSpinner} {success && successAnimation}
    </Button>
  )
})
