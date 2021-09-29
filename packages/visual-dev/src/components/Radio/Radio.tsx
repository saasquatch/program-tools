import * as React from 'react'
import root from 'react-shadow/styled-components'
import styled from 'styled-components'
import * as Styles from './Styles'

type RadioProps = OptionProps & React.ComponentProps<'input'>

interface OptionProps {
  value?: any
  onChange?: any
  options?: any
  id?: string
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

// export const Radio = React.forwardRef<React.ElementRef<'input'>, RadioProps>((props, forwardedRef) => {
export const Radio: React.FC<any> = (props: RadioProps) => {
  const { value, onChange, options } = props

  return (
    <ShadowDom>
      {options.radioOptions.map((option: any) => {
        const { key, label, name } = option
        return (
          <RadioLabel htmlFor={key}>
            <RadioInput type='radio' value={value} onClick={props.onChange} id={key} onChange={onChange} name={name} />
            <RadioButton />
            {label}
          </RadioLabel>
        )
      })}
    </ShadowDom>
  )
}

export const RadioGroup = React.forwardRef<React.ElementRef<'div'>, RadioProps>((props) => {
  const { children } = props

  return <ShadowDom>{children}</ShadowDom>
})
