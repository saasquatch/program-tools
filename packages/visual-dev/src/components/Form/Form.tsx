import * as React from 'react'
import styled from 'styled-components'
import root from 'react-shadow/styled-components'
import * as Styles from './Styles'
import { optionsList } from 'react-jsonschema-form/lib/utils'

type InputProps = OptionProps & React.ComponentProps<'input'>

interface OptionProps {
  options?: any
}
const ShadowDom = styled(root.div)``

const TextBoxStyle = styled.input`
  width: 300px;
  height: 30px;

  font: 400 14px Helvetica;
  text-indent: 6px;

  color: #575757;
  background: #ffffff;

  border: 2px solid #e2e2e2;
  border-radius: 4px;

  &::placeholder {
    color: #bdbdbd;
  }

  &:focus {
    outline: none;
    border-color: #448ee1;
  }

  &:disabled {
    user-select: none;
    cursor: not-allowed;
    pointer-events: none;
    color: #bdbdbd;
    background-color: #ebebeb;
  }
`

const CheckboxStyle = styled.input`
  &[type='radio']:checked,
  &[type='radio']:not(:checked) {
    position: absolute;
    left: -9999px;
  }
  &[type='radio']:checked + label,
  &[type='radio']:not(:checked) + label {
    position: relative;
    padding-left: 28px;
    cursor: pointer;
    line-height: 20px;
    display: inline-block;
    color: #666;
  }
  &[type='radio']:checked + label:before,
  &[type='radio']:not(:checked) + label:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 14px;
    height: 14px;
    border: 1.5px solid #f49c20;
    border-radius: 100%;
    background: #fff;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
  }
  &[type='radio']:checked + label:after,
  &[type='radio']:not(:checked) + label:after {
    content: '';
    width: 8px;
    height: 8px;
    background: #f49c20;
    position: absolute;
    top: 3px;
    left: 3px;
    border-radius: 100%;
    -webkit-transition: all 0.2s ease;
    transition: all 0.2s ease;
  }
  &[type='radio']:not(:checked) + label:after {
    opacity: 0;
    -webkit-transform: scale(0);
    transform: scale(0);
  }
  &[type='radio']:checked + label:after {
    opacity: 1;
    -webkit-transform: scale(1);
    transform: scale(1);
  }
`

const CheckboxLabel = styled.label`
  font-family: Helvetica;
`

const RadioInput = styled.input`
  display: none;

  &:checked + div {
    border-color: #f49c20;
  }
  &:checked + div::after {
    transform: scale(1);
  }
`

const RadioLabel = styled.label`
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  margin-right: 10px;

  color: #575757;
  font-family: Helvetica;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
`

const RadioButton = styled.div`
  //   Outer Circle
  width: 14px;
  height: 14px;
  border: 1.5px solid #575757;
  border-radius: 50%;
  margin-right: 10px;
  box-sizing: border-box;
  padding: 1.5px;

  //   Inner Circle
  &::after {
    content: '';
    width: 8px;
    height: 8px;
    display: block;
    background: #f49c20;
    border-radius: 100%;
    transform: scale(0);
    transition: transform 0.15s;
  }
`

export const TextBox = React.forwardRef<React.ElementRef<'input'>, InputProps>((props, forwardedRef) => {
  const { ...rest } = props

  return (
    <ShadowDom>
      <TextBoxStyle {...rest} type='text' ref={forwardedRef} />
    </ShadowDom>
  )
})

export const Radio = React.forwardRef<React.ElementRef<'input'>, InputProps>((props, forwardedRef) => {
  const { options, id, ...rest } = props

  return (
    <ShadowDom>
      <RadioLabel htmlFor={id}>
        <RadioInput type='radio' name='radio_name' id={id} {...rest} ref={forwardedRef} />
        <RadioButton />
        {options.primary ? options.primary : ''}
        {options.secondary ? options.secondary : ''}
      </RadioLabel>
    </ShadowDom>
  )
})
