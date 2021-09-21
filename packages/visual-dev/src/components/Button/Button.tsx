import * as React from 'react'
import styled, { CSSProp } from 'styled-components'
import { IconKey, Icon } from '../Icon'
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
  success?: boolean
  danger?: boolean
  css?: CSSProp
}

const ButtonStyle = styled.button<Required<StyleProps>>`
  ${Styles.base}
  ${(props) => Styles[props.variant]}
  ${(props) => props.pill && Styles.pill}
  ${(props) => props.loading && Styles.loading}
  ${(props) => props.danger && Styles.danger}
  ${(props) => props.success && Styles.success}
`

export const Button = React.forwardRef<React.ElementRef<'button'>, ButtonProps>((props, forwardedRef) => {
  const { variant, pill = false, loading = false, danger = false, success = false, icon, /*size = 'medium', icon, pill = false, loading = false, complete = false, danger = false,*/ children, css = {}, ...rest } = props

  return (
    <ButtonStyle {...rest} variant={variant} pill={pill} loading={loading} danger={danger} success={success} ref={forwardedRef} css={css}>
      {icon && <Icon icon={icon} color='#FFFFFF' size='16px' />} {children} {loading && loadingIcon} {success && succesIcon}
    </ButtonStyle>
  )
})

const loadingIcon = <Icon icon='loading' color='#F5A849' size='16px' style={{ marginLeft: 3 }} />
const succesIcon = <Icon icon='checkmark_circle' color='#FFFFFF' size='16px' />
