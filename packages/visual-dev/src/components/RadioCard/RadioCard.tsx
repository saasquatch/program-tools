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

const RightSegment = styled.div`
  ${Styles.RightSegmentStyle}
`

const RadioText = styled.div`
  ${Styles.RadioTextStyle}
`

const LeftSegment = styled.div<{ isChecked: boolean }>`
  ${Styles.LeftSegmentStyle}
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
        <LeftSegment isChecked={value}>
          <Icon icon={icon} size='40px' color={icon_color} />
        </LeftSegment>
        <RightSegment>
          <RadioText>
            {options.title ? <div style={{ fontWeight: 'bold' }}> {options.title} </div> : ''}
            {options.text ? <div style={{ color: '#858585', marginTop: 4 }}> {options.text} </div> : ''}
          </RadioText>
        </RightSegment>
      </RadioLabel>
    </ShadowDom>
  )
})
