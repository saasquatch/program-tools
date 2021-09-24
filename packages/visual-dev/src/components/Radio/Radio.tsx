import * as React from 'react'
import root from 'react-shadow/styled-components'
import styled from 'styled-components'
import * as Styles from './Styles'

type RadioProps = OptionProps & React.ComponentProps<'input'>

interface OptionProps {
  value?: any
  onChange?: any
  options?: any
}

const ShadowDom = styled(root.div)``

const RadioLabel = styled.label`
  ${Styles.RadioLabelStyle}
`
const RadioInput = styled.input`
  ${Styles.RadioInputStyle}
`
const RadioButton = styled.div`
  ${Styles.RadioButtonStyle}
`

export const Radio = React.forwardRef<React.ElementRef<'input'>, RadioProps>((props, forwardedRef) => {
  const { value, onChange, options, ...rest } = props

  return (
    <ShadowDom>
      <RadioLabel htmlFor={rest.id}>
        <RadioInput type='radio' checked={value} {...rest} ref={forwardedRef} />
        <RadioButton />
        {options.text ? options.text : ''}
      </RadioLabel>
    </ShadowDom>
  )
})
