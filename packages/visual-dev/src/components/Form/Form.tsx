import * as React from 'react'
import styled from 'styled-components'
import root from 'react-shadow/styled-components'
import * as Styles from './Styles'

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

const CheckboxStyle = styled.input``

export const TextBox = React.forwardRef<React.ElementRef<'input'>, InputProps>((props, forwardedRef) => {
  const { ...rest } = props

  return (
    <ShadowDom>
      <TextBoxStyle {...rest} type='text' ref={forwardedRef} />
    </ShadowDom>
  )
})

export const Checkbox = React.forwardRef<React.ElementRef<'input'>, InputProps>((props, forwardedRef) => {
  const { ...rest } = props

  return (
    <ShadowDom>
      <CheckboxStyle {...rest} type='checkbox' ref={forwardedRef} />
    </ShadowDom>
  )
})
