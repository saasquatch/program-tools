import React from 'react'
import styled, { CSSProp } from 'styled-components'
import { useState } from 'react'

import * as Styles from './Styles'

type TooltipProps = OptionProps & StyleProps & React.ComponentProps<'div'>

interface OptionProps {
  text?: string
  direction?: 'top' | 'left' | 'bottom' | 'right'
  delay?: 'none' | 'short' | 'medium' | 'long' | number
  children: React.ReactNode
}

interface StyleProps {
  css?: CSSProp
}

const default_delay = {
  none: 0,
  short: 100,
  medium: 250,
  long: 1000,
}

const TooltipDiv = styled.div<Required<StyleProps>>`
  ${Styles.base}
  ${(props) => props.css}
`

const TooltipTip = styled.div`
  ${Styles.tooltip}
`

export const Tooltip = React.forwardRef<React.ElementRef<'div'>, TooltipProps>((props, forwardedRef) => {
  const { text = '', direction = 'top', delay = 'short', children, css = {}, ...rest } = props

  let timeout: ReturnType<typeof setTimeout>
  const [active, setActive] = useState(false)

  const showTooltip = () => {
    timeout = setTimeout(
      () => {
        setActive(true)
      },
      props.delay ? default_delay[props.delay] : default_delay['medium']
    )
  }

  const hideTooltip = () => {
    clearInterval(timeout)
    setActive(false)
  }
  return (
    <TooltipDiv {...rest} onMouseEnter={showTooltip} onMouseLeave={hideTooltip} ref={forwardedRef} css={css}>
      {children}
      {active && <TooltipTip className={direction}>{text}</TooltipTip>}
    </TooltipDiv>
  )
})
