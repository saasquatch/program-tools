import * as React from 'react'
import styled, { CSSProp } from 'styled-components'
import { Icon } from '../Icon'
import * as Styles from './Styles'

type AvatarProps = OptionProps & StyleProps & React.ComponentProps<'div'>

interface OptionProps {
  firstName?: string
  lastName?: string
  full?: boolean
}

interface StyleProps {
  css?: CSSProp
}

const AvatarStyle = styled.div<Required<StyleProps>>`
  ${(props) => props.css}
`

const AvatarCircle = styled.div<{ full: boolean; color: string }>`
  ${(props) => (props.full ? Styles.AvatarCircleStyleLarge : Styles.AvatarCircleStyle)};
  ${(props) => (props.full ? 'background-color: ' + props.color : '')};
`

const AvatarText = styled.span<{ full: boolean; color: string }>`
  ${(props) => (props.full ? Styles.AvatarTextStyleLarge : Styles.AvatarTextStyle)};
  ${(props) => (props.full ? '' : 'color: ' + props.color)};
`

export const Avatar = React.forwardRef<React.ElementRef<'div'>, AvatarProps>((props, forwardedRef) => {
  const { firstName = '', full = false, lastName = '', css = {}, ...rest } = props
  let initials = ''
  if (firstName || lastName) {
    initials = firstName.charAt(0) + lastName.charAt(0)
  }
  const colors = ['#023B44', '#0FA177', '#00C75F', '#0092AD', '#44BFD5', '#F5A624']
  const random = initials.charCodeAt(0) % 6

  return (
    <AvatarStyle {...rest} ref={forwardedRef} css={css}>
      {!(firstName || lastName) ? (
        <Icon icon='avatar' size={full ? 'var(--sq-icon-size-avatar-large)' : 'var(--sq-icon-size-avatar)'} />
      ) : (
        <AvatarCircle full={full} color={colors[random]}>
          <AvatarText full={full} color={colors[random]}>
            {initials}
          </AvatarText>
        </AvatarCircle>
      )}
    </AvatarStyle>
  )
})
