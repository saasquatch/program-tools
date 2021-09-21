import * as React from 'react'
import styled, { CSSProp } from 'styled-components'
import root from 'react-shadow/styled-components'
import * as Styles from './Styles'

type InputProps = OptionProps & React.ComponentProps<'input'>

interface OptionProps {
  options?: any
}
const ShadowHost = styled(root.div)``

const InputStyle = styled.input`
  ${Styles.input}
`

export const Input = React.forwardRef<React.ElementRef<'input'>, InputProps>((props, forwardedRef) => {
  const { ...rest } = props //children, css = {},

  return (
    <ShadowHost>
      <InputStyle {...rest} type='text' ref={forwardedRef} />
    </ShadowHost>
  )
})
