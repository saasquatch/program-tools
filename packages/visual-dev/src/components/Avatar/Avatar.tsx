import * as React from 'react'
import styled, { CSSProp } from 'styled-components'
import * as Styles from './Styles'
import { Icon } from '../Icon'

type AvatarProps = OptionProps & StyleProps & React.ComponentProps<'div'>

interface OptionProps {
  firstName?: string
  lastName?: string
}

interface StyleProps {
  css?: CSSProp
}

const AvatarStyle = styled.div<Required<StyleProps>>`
  ${(props) => props.css}
`

const AvatarCircle = styled.div`
  ${Styles.base}
`

const AvatarText = styled.span`
  ${Styles.circle}
`

export const Avatar = React.forwardRef<React.ElementRef<'div'>, AvatarProps>((props, forwardedRef) => {
  const { firstName = '', lastName = '', css = {}, ...rest } = props
  let initials
  if (firstName || lastName) {
    initials = firstName.charAt(0) + lastName.charAt(0)
  }

  return (
    <AvatarStyle {...rest} ref={forwardedRef} css={css}>
      {!(firstName || lastName) ? (
        <Icon icon='avatar' size='34px' />
      ) : (
        <AvatarCircle>
          <AvatarText>{initials}</AvatarText>
        </AvatarCircle>
      )}
    </AvatarStyle>
  )
})
