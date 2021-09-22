import * as React from 'react'
import styled, { CSSProp } from 'styled-components'
import * as Styles from './Styles'

type TabGroupProps = OptionProps & StyleProps & React.ComponentProps<'div'>
type TabProps = OptionProps & StyleProps & React.ComponentProps<'div'> & { selected?: boolean }

interface OptionProps {
  children?: React.ReactNode
}

interface StyleProps {
  color?: 'primary' | 'secondary'
  css?: CSSProp
}

const TabGroupStyle = styled('div')<Required<StyleProps>>`
  ${Styles.tabgroup}
  ${(props) => Styles[props.color + '_bg']};
  ${(props) => Styles[props.color + '_text']};
  ${(props) => props.css}
`

const TabStyle = styled('div')<Required<StyleProps & { selected: boolean }>>`
  ${Styles.tab}
  ${(props) => Styles[props.color + '_grey']};
  ${(props) => props.selected && Styles.selected}
  ${(props) => props.css}
`

export const TabGroup = React.forwardRef<React.ElementRef<'div'>, TabGroupProps>((props, forwardedRef) => {
  const { color = 'primary', children, css = {}, ...rest } = props

  return (
    <TabGroupStyle color={color} {...rest} ref={forwardedRef} css={css}>
      {children}
    </TabGroupStyle>
  )
})

export const Tab = React.forwardRef<React.ElementRef<'div'>, TabProps>((props, forwardedRef) => {
  const { color = 'primary', selected = false, children, css = {}, ...rest } = props

  return (
    <TabStyle color={color} selected={selected} {...rest} ref={forwardedRef} css={css}>
      {children}
    </TabStyle>
  )
})
