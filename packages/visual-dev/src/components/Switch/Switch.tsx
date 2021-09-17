import * as React from 'react'
import styled, { CSSProp } from 'styled-components'

import * as Styles from './Styles'

type SwitchProps = OptionProps & StyleProps & React.ComponentProps<'div'>

interface OptionProps {
  id: string
  checked: boolean
  onSwitchChange: () => void
  color?: 'success' | 'critical'
  textLeft?: string
  textRight?: string
  children: React.ReactNode
}

interface StyleProps {
  css?: CSSProp
}

const SwitchWrapper = styled.div<Required<StyleProps>>`
  ${(props) => props.css}
`
const SwitchBox = styled.div`
  ${Styles.wrapper}
`

const SwitchButton = styled.label`
  ${Styles.base}
`

const SwitchLabel = styled.label`
  ${Styles.label}
`

const SwitchBackground = styled.input<Required<{ color: string }>>`
  ${Styles.off}
  &:checked + ${SwitchButton} {
    ${(props) => Styles[props.color]}
    ${Styles.on}
  }
`

export const Switch = React.forwardRef<React.ElementRef<'div'>, SwitchProps>((props, forwardedRef) => {
  const { id, color = 'success', checked, onSwitchChange, textLeft = '', textRight = '', css = {}, ...rest } = props

  const spaceLeft = textLeft == '' ? '0px' : '10px'
  const spaceRight = textRight == '' ? '0px' : '10px'
  return (
    <SwitchWrapper {...rest} ref={forwardedRef} css={css}>
      <SwitchLabel htmlFor={id}>
        {textLeft}
        <SwitchBox style={{ marginLeft: spaceLeft, paddingRight: spaceRight }}>
          <SwitchBackground color={color} id={id} type='checkbox' checked={checked} onChange={onSwitchChange} />
          <SwitchButton htmlFor={id} />
        </SwitchBox>
        {textRight}
      </SwitchLabel>
    </SwitchWrapper>
  )
})
