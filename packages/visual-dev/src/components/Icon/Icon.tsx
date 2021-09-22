import * as React from 'react'
import styled, { CSSProp } from 'styled-components'
import * as Styles from './Styles'
import * as SVGs from './SVGs'

type IconProps = OptionProps & StyleProps & React.ComponentProps<'div'>

interface OptionProps {
  icon: IconKey
}

interface StyleProps {
  color?: string
  size?: 'small' | 'medium' | 'large' | string
  css?: CSSProp
}

const default_size = {
  small: '12px',
  medium: '23px',
  large: '36px',
}

const StyledSVG = styled.div<Required<StyleProps>>`
  ${Styles.base}
  color: ${(props) => props.color};
  width: ${(props) => (default_size.hasOwnProperty(props.size) ? default_size[props.size] : props.size)};
  height: ${(props) => (default_size.hasOwnProperty(props.size) ? default_size[props.size] : props.size)};
  ${(props) => props.css}
`

export type IconKey = keyof typeof SVGs

export const Icon = React.forwardRef<React.ElementRef<'div'>, IconProps>((props, forwardedRef) => {
  const { icon, color = 'var(--sq-text-subdued)', size = 'medium', css = {}, ...rest } = props

  return (
    <StyledSVG {...rest} size={size} color={color} ref={forwardedRef} css={css}>
      {Object.keys(SVGs).includes(icon) ? SVGs[icon] : SVGs['placeholder']}
    </StyledSVG>
  )
})
