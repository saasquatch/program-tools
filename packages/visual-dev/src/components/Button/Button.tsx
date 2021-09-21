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
  disable?: boolean
  success?: boolean
  danger?: boolean
  css?: CSSProp
}

const ButtonStyle = styled.button<Required<StyleProps>>`
  ${Styles.base}
  ${(props) => Styles[props.variant]}
  ${(props) => props.pill && Styles.pill}
  ${(props) => props.loading && Styles['loading_' + props.variant]}
  ${(props) => props.disable && Styles['disable_' + props.variant]}
  ${(props) => props.danger && Styles.danger}
  ${(props) => props.success && Styles.success}
`

export const Button = React.forwardRef<React.ElementRef<'button'>, ButtonProps>((props, forwardedRef) => {
  const { variant, pill = false, loading = false, danger = false, success = false, disable = false, icon, /*size = 'medium', icon, pill = false, loading = false, complete = false, danger = false,*/ children, css = {}, ...rest } = props

  return (
    <ButtonStyle {...rest} variant={variant} pill={pill} loading={loading} danger={danger} success={success} disable={disable} ref={forwardedRef} css={css}>
      {icon && <Icon icon={icon} color='#FFFFFF' size='16px' />} {children} {loading && <Icon icon='loading' color={iconColors[variant]} size='16px' style={{ marginLeft: 3 }} />} {success && succesIcon}
    </ButtonStyle>
  )
})

const iconColors = {
  primary: '#F5A849',
  secondary: '#A6B9BD',
}

const succesIcon = <Icon icon='checkmark_circle' color='#FFFFFF' size='16px' />
