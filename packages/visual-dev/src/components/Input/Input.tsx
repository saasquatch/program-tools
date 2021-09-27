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
  disabled?: any
  type?: any
  rawErrors?: any
  icon?: IconKey
  position?: 'left' | 'right'
}

const ShadowDom = styled(root.div)``

const InputBox = styled.input<{ isInvalid: boolean }>`
  ${Styles.InputBoxStyle}
  ${(props) => (props.isInvalid ? Styles.invalid : '')}
`

const IconDiv = styled.div<{ position: string }>`
  ${Styles.IconStyle}
  ${(props) => (props.position == 'left' ? 'left: 45px;' : 'left: 305px;')}
`

export const Input = React.forwardRef<React.ElementRef<'input'>, InputProps>((props, forwardedRef) => {
  const { icon, position = 'right', type = 'text', rawErrors, ...rest } = props

  return (
    <ShadowDom>
      <InputBox {...rest} type={type} ref={forwardedRef} isInvalid={rawErrors} />
      {icon && (
        <IconDiv position={position}>
          <Icon icon={icon} size={'22px'} />
        </IconDiv>
      )}
    </ShadowDom>
  )
})
