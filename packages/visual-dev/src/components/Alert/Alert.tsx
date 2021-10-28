import * as React from 'react'
import styled, { CSSProp } from 'styled-components'
import { Icon } from '../Icon'
import * as Styles from './Styles'

type AlertProps = OptionProps & StyleProps & Omit<React.ComponentProps<'div'>, "translate">

interface OptionProps {
  title: string
  children: React.ReactNode
}

interface StyleProps {
  type: 'critical' | 'warning' | 'success' | 'info'
  css?: CSSProp
}

const AlertDiv = styled.div<Required<StyleProps>>`
  ${Styles.AlertDivStyle}
  ${(props) => Styles[props.type]}
`

const icons = {
  critical: <Icon icon={'alert'} color='var(--sq-surface-critical)' size='23px' />,
  warning: <Icon icon={'alert'} color='var(--sq-surface-warning)' size='23px' />,
  success: <Icon icon={'checkmark_circle'} color='var(--sq-surface-success)' size='23px' />,
  info: <Icon icon={'help'} color='var(--sq-text)' size='23px' />,
}

export const Alert = React.forwardRef<React.ElementRef<'div'>, AlertProps>((props, forwardedRef) => {
  const { type: variant, title, children, css = {}, ...rest } = props

  return (
    <AlertDiv {...rest} type={variant} ref={forwardedRef} css={css}>
      {icons[variant]}
      <div>
        <strong>{title}</strong>
        <div>{children}</div>
      </div>
    </AlertDiv>
  )
})
