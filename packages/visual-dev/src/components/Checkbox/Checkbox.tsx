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
  id?: string
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

// export const Checkbox = React.forwardRef<React.ElementRef<'input'>, InputProps>((props, forwardedRef) => {
export const Checkbox: React.FC<any> = (props: InputProps) => {
  const { id, value, onChange, options, disabled, name } = props

  // const { value, onChange, options, disabled } = props

  console.log(props)
  console.log(props.options)

  return (
    <ShadowDom>
      <CheckboxLabel htmlFor={id} isDisabled={disabled}>
        <CheckboxInput checked={value} type='checkbox' isDisabled={disabled} id={id} />
        <CheckboxBox isDisabled={disabled}>
          <Icon icon='checkmark' css={CheckboxTick} />
        </CheckboxBox>
        {options ? options.text : ''}
      </CheckboxLabel>
    </ShadowDom>
  )
}
