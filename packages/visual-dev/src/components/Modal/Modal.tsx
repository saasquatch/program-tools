import * as React from 'react'
import styled, { CSSProp } from 'styled-components'
import { Icon } from '../Icon'
import { Button } from '../Button'

import * as Styles from './Styles'

type ModalProps = OptionProps & StyleProps & React.ComponentProps<'div'>

interface OptionProps {
  title: string
  open?: boolean
  banner?: any
  onClose: any
  primaryAction?: any
  secondaryAction?: any
  children: React.ReactNode
}

interface StyleProps {
  css?: CSSProp
}

const ModalBackdrop = styled.div`
  ${Styles.ModalBackdropStyle}
`

const ModalDiv = styled.div<Required<StyleProps>>`
  ${Styles.ModalDivStyle}
  ${(props) => props.css}
`

const ModalHeader = styled.div`
  ${Styles.ModalHeaderStyle}
`

export const Modal = React.forwardRef<React.ElementRef<'div'>, ModalProps>((props, forwardedRef) => {
  const { title, open = false, onClose, banner, primaryAction, secondaryAction, children, css = {}, ...rest } = props
  return (
    <div>
      {open && (
        <ModalBackdrop>
          <ModalDiv {...rest} ref={forwardedRef} css={css}>
            <ModalHeader>
              {title}
              <Icon icon='close' color='#fff' size='24px' css='vertical-align: bottom; float: right; cursor: pointer; margin-left: 50px;' onClick={onClose} />
            </ModalHeader>
            {children}
          </ModalDiv>
        </ModalBackdrop>
      )}
    </div>
  )
})

type ModalActionProps = ActionOptions & StyleProps & React.ComponentProps<'div'>

interface ActionOptions {
  primaryAction?: any
  secondaryAction?: any
}

const ModalActionDiv = styled.div<Required<StyleProps>>`
  ${Styles.ModalActionDivStyle}
  ${(props) => props.css}
`

export const ModalContentAction = React.forwardRef<React.ElementRef<'div'>, ModalActionProps>((props, forwardedRef) => {
  const { primaryAction, secondaryAction, children, css = {}, ...rest } = props

  return (
    <ModalActionDiv {...rest} ref={forwardedRef} css={css}>
      {secondaryAction && (
        <Button variant='text' onClick={secondaryAction.onAction} style={{ marginRight: 25 }}>
          {secondaryAction.text}
        </Button>
      )}
      {primaryAction && (
        <Button variant={'primary'} onClick={primaryAction.onAction} danger={primaryAction.danger}>
          {primaryAction.text}
        </Button>
      )}
    </ModalActionDiv>
  )
})

type ModalContentProps = ContentOptions & StyleProps & React.ComponentProps<'div'>

interface ContentOptions {
  children?: React.ReactNode
}

const ModalContentDiv = styled.div<Required<StyleProps>>`
  ${Styles.ModalContentDivStyle}
  ${(props) => props.css}
`
export const ModalContent = React.forwardRef<React.ElementRef<'div'>, ModalContentProps>((props, forwardedRef) => {
  const { children, css = {}, ...rest } = props

  return (
    <ModalContentDiv {...rest} ref={forwardedRef} css={css}>
      {children}
    </ModalContentDiv>
  )
})

const ModalContentTextDiv = styled.div<Required<StyleProps>>`
  ${Styles.ModalContentTextDivStyle}
  ${(props) => props.css}
`

export const ModalContentText = React.forwardRef<React.ElementRef<'div'>, ModalContentProps>((props, forwardedRef) => {
  const { children, css = {}, ...rest } = props

  return (
    <ModalContentTextDiv {...rest} ref={forwardedRef} css={css}>
      {children}
    </ModalContentTextDiv>
  )
})

const CodeDiv = styled.div<Required<StyleProps>>`
  ${Styles.CodeDivStyle}
  ${(props) => props.css}
`
export const ModalContentCode = React.forwardRef<React.ElementRef<'div'>, ModalContentProps>((props, forwardedRef) => {
  const { children, css = {}, ...rest } = props

  return (
    <CodeDiv {...rest} ref={forwardedRef} css={css}>
      {children}{' '}
    </CodeDiv>
  )
})

const DividerDiv = styled.div<Required<StyleProps>>`
  ${Styles.DividerDivStyle}
  ${(props) => props.css}
`
export const ModalContentDivider = React.forwardRef<React.ElementRef<'div'>, ModalContentProps>((props, forwardedRef) => {
  const { children, css = {}, ...rest } = props

  return <DividerDiv {...rest} ref={forwardedRef} css={css} />
})

const ModalBannerDiv = styled.div<Required<StyleProps>>`
  ${Styles.ModalBannerDivStyle}
`

export const ModalContentBanner = React.forwardRef<React.ElementRef<'div'>, ModalContentProps & { banner: any }>((props, forwardedRef) => {
  const { banner, children, css = {}, ...rest } = props

  return (
    <ModalBannerDiv {...rest} ref={forwardedRef} css={css}>
      {banner ? banner.icon : ''}
      {banner ? banner.text : ''}
    </ModalBannerDiv>
  )
})

const ModalBackDiv = styled.div<Required<StyleProps>>`
  ${Styles.ModalBackDivStyle}
`

export const ModalContentTopAction = React.forwardRef<React.ElementRef<'div'>, ModalContentProps & { action: any }>((props, forwardedRef) => {
  const { action, children, css = {}, ...rest } = props

  return (
    <ModalBackDiv onClick={action} {...rest} ref={forwardedRef} css={css}>
      {action ? action.icon : ''}
      {action ? action.text : ''}
    </ModalBackDiv>
  )
})
