import * as React from 'react'
import root from 'react-shadow/styled-components'
import styled, { css } from 'styled-components'
import { Icon } from '../Icon'
import * as Styles from './Styles'

type InputProps = OptionProps & React.ComponentProps<'input'>

interface OptionProps {
  value?: any
  onChange?: any
  options?: any
  disabled?: any
}

const ShadowDom = styled(root.div)``

const CheckboxLabel = styled.label<{ isDisabled?: any }>`
  ${Styles.CheckboxLabelStyle}
  ${(props) => props.isDisabled && Styles.disabled_color}
`
const CheckboxTick = css`
  ${Styles.CheckboxTickStyle}
`
const CheckboxInput = styled.input<{ isDisabled?: any }>`
  ${Styles.CheckboxInputStyle}
  ${(props) => (props.isDisabled == true ? Styles.checked_disabled : Styles.checked_border)}
`
const CheckboxBox = styled.div<{ isDisabled?: any }>`
  ${Styles.CheckboxStyle}
  ${(props) => props.isDisabled && Styles.disabled_bg}
`

export const Checkbox = React.forwardRef<React.ElementRef<'input'>, InputProps>((props, forwardedRef) => {
  const { value, onChange, options, disabled, ...rest } = props

  return (
    <ShadowDom>
      <CheckboxLabel htmlFor={rest.id} isDisabled={disabled}>
        {/* <CheckboxInput checked={value} type='checkbox' isDisabled={disabled} {...rest} ref={forwardedRef} />
        <CheckboxBox isDisabled={disabled}> */}
        <Icon icon='checkmark' css={CheckboxTick} />
        <input type='checkbox' {...rest} ref={forwardedRef} />
        {/* </CheckboxBox> */}
        "CHECK BOX"
        {options ? options.text : ''}
      </CheckboxLabel>
    </ShadowDom>
  )
})
