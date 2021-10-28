import * as React from 'react'
import styled, { css } from 'styled-components'
import root from 'react-shadow/styled-components'
import * as Styles from './Styles'
import { optionsList } from 'react-jsonschema-form/lib/utils'
import { Icon } from '../Icon'

type InputProps = OptionProps & React.ComponentProps<'input'>

interface OptionProps {
  options?: any
}
// options: any
// value boolean/string
// onChange: () => void

//rawErrors

const ShadowDom = styled(root.div)``

const InputBox = styled.input`
  ${Styles.InputBoxStyle}
`

// Radio 1
const R1Label = styled.label`
  ${Styles.R1LabelStyle}
`
const R1Input = styled.input`
  ${Styles.R1InputStyle}
`
const R1Button = styled.div`
  ${Styles.R1ButtonStyle}
`

// Radio 2
//<{ isChecked: boolean }>
const R2Label = styled.label<{ isChecked: boolean }>`
  ${Styles.R2LabelStyle}
  ${(props) => (props.isChecked ? 'background: #F9F9F9;' : '')}
`
// ${(props) => (props.isChecked ? 'background: #F9F9F9;' : '')}
const R2Input = styled.input`
  ${Styles.R2InputStyle}
`
const R2Button = styled.div`
  ${Styles.R2ButtonStyle}
`
const R2Text = styled.div`
  flex-direction: column;
`

export const TextBox = React.forwardRef<React.ElementRef<'input'>, InputProps>((props, forwardedRef) => {
  const { ...rest } = props

  return (
    <ShadowDom>
      <InputBox {...rest} type='text' ref={forwardedRef} />
    </ShadowDom>
  )
})

export const R1 = React.forwardRef<React.ElementRef<'input'>, InputProps>((props, forwardedRef) => {
  const { options, id, ...rest } = props

  return (
    <ShadowDom>
      <R1Label htmlFor={id}>
        <R1Input type='radio' id={id} {...rest} ref={forwardedRef} />
        <R1Button />
        {options.primary ? options.primary : ''}
      </R1Label>
    </ShadowDom>
  )
})

export const R2 = React.forwardRef<React.ElementRef<'input'>, InputProps>((props, forwardedRef) => {
  const { options, ...rest } = props

  return (
    <ShadowDom>
      <R2Label htmlFor={rest.id} isChecked={rest.checked ? true : false}>
        <R2Input type='radio' id={rest.id} {...rest} ref={forwardedRef} />
        <R2Button />
        <R2Text>
          {options.primary ? <div> {options.primary} </div> : ''}
          {options.secondary ? <div style={{ color: '#858585', marginTop: 4 }}> {options.secondary} </div> : ''}
        </R2Text>
      </R2Label>
    </ShadowDom>
  )
})

export const Checkbox = React.forwardRef<React.ElementRef<'input'>, InputProps>((props, forwardedRef) => {
  const { options, id, ...rest } = props

  return (
    <ShadowDom>
      <CheckboxLabel htmlFor={id}>
        <CheckboxInput type='checkbox' id={id} {...rest} ref={forwardedRef} />
        <CheckboxBox>
          <Icon icon='checkmark' css={CheckboxTick} />
        </CheckboxBox>
        {options.primary ? options.primary : ''}
      </CheckboxLabel>
    </ShadowDom>
  )
})

const CheckboxLabel = styled.label`
  display: inline-flex;
  align-items: center;
  cursor: pointer;

  color: #575757;
  font-family: Helvetica;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
`

const CheckboxTick = css`
  position: absolute;
  color: #575757;
  width: 20px;
  height: 20px;
  transform: scale(0);
  transition: transform 0.15s;
`
const CheckboxInput = styled.input`
  display: none;

  &:checked + div {
    box-shadow: 0 0 0 2px #575757;
  }

  &:checked + div > div {
    transform: scale(1);
  }
`

const CheckboxBox = styled.div`
  width: 16px;
  height: 16px;
  box-shadow: 0 0 0 1px #575757;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  flex-shrink: 0;
  border-radius: 2px;

  &:hover {
    box-shadow: 0 0 0 2px #575757;
  }
`
