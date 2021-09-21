import * as React from 'react'
import styled from 'styled-components'
import root from 'react-shadow/styled-components'
import * as Styles from './Styles'

type InputProps = OptionProps & React.ComponentProps<'input'>

interface OptionProps {
  options?: any
}
const ShadowDom = styled(root.div)``

const InputStyle = styled.input`
  ${Styles.input}
`

const CheckboxStyle = styled.input``

export const Input = React.forwardRef<React.ElementRef<'input'>, InputProps>((props, forwardedRef) => {
  const { ...rest } = props //children, css = {},

  return (
    <ShadowDom>
      <InputStyle {...rest} type='text' ref={forwardedRef} />
    </ShadowDom>
  )
})

export const Checkbox = React.forwardRef<React.ElementRef<'input'>, InputProps>((props, forwardedRef) => {
  const { ...rest } = props //children, css = {},

  return (
    <ShadowDom>
      <CheckboxStyle {...rest} type='checkbox' ref={forwardedRef} />
    </ShadowDom>
  )
})
