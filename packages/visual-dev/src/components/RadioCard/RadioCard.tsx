import * as React from 'react'
import root from 'react-shadow/styled-components'
import styled from 'styled-components'
import * as Styles from './Styles'
import { IconKey, Icon } from '../Icon'

type InputProps = OptionProps & React.ComponentProps<'input'>

interface OptionProps {
  value?: any
  onChange?: any
  options?: any
  icon?: IconKey
}

const ShadowDom = styled(root.div)``

const RadioLabel = styled.label<{ isChecked: boolean }>`
  ${Styles.RadioLabelStyle}
  ${(props) => (props.isChecked ? 'border: 2px solid #DC8F32;' : '&:hover {border: 2px solid #858585;}')}
`
const RadioInput = styled.input`
  ${Styles.RadioInputStyle}
`

const CardStyle = styled.div`
  width: auto;
  width: 371px;
  height: 100%;
  float: right;
  border-left: 2px solid #ebebeb;
`

const RadioText = styled.div`
  ${Styles.RadioTextStyle}
  flex-direction: column;
  padding: 20px;
`

const IconStyle = styled.div<{ isChecked: boolean }>`
  float: left;
  width: 117px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  ${(props) => (props.isChecked ? 'color: #DC8F32;' : '')}
`

export const RadioCard = React.forwardRef<React.ElementRef<'input'>, InputProps>((props, forwardedRef) => {
  const { value, onChange, options, icon = 'calendar', ...rest } = props

  let icon_color
  value ? (icon_color = '#DC8F32') : ''

  return (
    <ShadowDom>
      <RadioLabel htmlFor={rest.id} isChecked={value}>
        <RadioInput type='radio' checked={value} {...rest} ref={forwardedRef} />
        <IconStyle isChecked={value}>
          <Icon icon={icon} size='40px' color={icon_color} />
        </IconStyle>
        <CardStyle>
          <RadioText>
            {options.title ? <div style={{ fontWeight: 'bold' }}> {options.title} </div> : ''}
            {options.text ? <div style={{ color: '#858585', marginTop: 4 }}> {options.text} </div> : ''}
          </RadioText>
        </CardStyle>
      </RadioLabel>
    </ShadowDom>
  )
})
