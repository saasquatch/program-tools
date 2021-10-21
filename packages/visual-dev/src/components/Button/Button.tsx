import * as React from 'react'
import styled, { CSSProp } from 'styled-components'
import { IconKey, Icon } from '../Icon'
import { ButtonSpinner, successAnimation } from './Animations'
import * as Styles from './Styles'

type ButtonProps = OptionProps & StyleProps & React.ComponentProps<'button'>

interface OptionProps {
  icon?: IconKey
  children?: React.ReactElement | string
}

interface StyleProps {
  variant: 'primary' | 'secondary' | 'circle' | 'text'
  pill?: boolean
  loading?: boolean
  disable?: boolean
  success?: boolean
  critical?: boolean
  size?: 'small' | 'medium' | 'large'
  css?: CSSProp
}

const default_sizes = {
  small: '14px',
  medium: '20px',
  large: '36px',
}

const text_sizes = {
  small: '16px',
  medium: '17px',
  large: '22px',
}

const ButtonStyle = styled.button<Required<StyleProps>>`
  ${Styles.base}
  ${(props) => Styles[props.variant]}
  ${(props) => (props.variant != 'circle' && props.variant != 'text' ? props.pill && Styles.pill : '')}
  ${(props) => props.loading && Styles['loading_' + props.variant]}
  ${(props) => props.disable && Styles['disable_' + props.variant]}
  ${(props) => props.size && Styles[props.variant + '_' + props.size]}
  ${(props) => props.critical && Styles.critical}
  ${(props) => props.success && Styles.success}
`

export const Button = React.forwardRef<React.ElementRef<'button'>, ButtonProps>((props, forwardedRef) => {
  const { variant, pill = true, loading = false, critical = false, success = false, disable = false, icon, size = 'medium', children, css = {}, ...rest } = props

  return (
    <ButtonStyle {...rest} variant={variant} pill={pill} loading={loading} critical={critical} success={success} disable={disable} size={size} ref={forwardedRef} css={css}>
      {icon && <Icon icon={icon} style={{ color: 'inherit' }} size={variant == 'text' ? text_sizes[size] : default_sizes[size]} />} {children} {loading && ButtonSpinner} {success && successAnimation}
    </ButtonStyle>
  )
})
