import * as React from 'react'
import styled, { CSSProp } from 'styled-components'
import * as Styles from './Styles'
import { Icon } from '../Icon'

type TagProps = OptionProps & StyleProps & React.ComponentProps<'div'>

interface OptionProps {
  onClickClose?: () => void
  children: React.ReactNode
}

interface StyleProps {
  css?: CSSProp
}

const TagStyled = styled.div<StyleProps>`
  ${Styles.base}
  ${(props) => props.css}
`

const TextSegmentStyled = styled.div`
  ${Styles.textSegment}
`

const IconSegmentStyled = styled.div`
  ${Styles.iconSegment}
`

export const Tag = React.forwardRef<React.ElementRef<'div'>, TagProps>((props, forwardedRef) => {
  const { onClickClose, children, css = {}, ...rest } = props

  return (
    <TagStyled {...rest} ref={forwardedRef} css={css}>
      <IconSegmentStyled onClick={onClickClose}>{<Icon size='10px' icon='close' />}</IconSegmentStyled>
      <TextSegmentStyled>{children}</TextSegmentStyled>
    </TagStyled>
  )
})
