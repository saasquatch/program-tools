import * as React from 'react'
import styled, { CSSProp } from 'styled-components'
import { Icon } from '../Icon'
import { Button } from '../Button'

import * as Styles from './Styles'
import { secondary } from '../Button/Styles'

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
  position: absolute;
  display: flex;
  flex-direction: column;
  z-index: 1;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.05);
`

const ModalDiv = styled.div<Required<StyleProps>>`
  ${(props) => props.css}
  position: relative;
  background-color: #fefefe;
  margin: auto;
  padding: 0;
  min-width: 558px;
  max-height: 798px;
  box-shadow: 0 0 0 1px #e2e2e2;
  //   border: 1px solid #e2e2e2;
  // box-sizing: border-box;
  border-radius: 8px;
  white-space: pre-wrap;

  overflow: hidden;
  overflow-y: overlay;

  ::-webkit-scrollbar {
    width: 6px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #e2e2e2;
    border-radius: 50px;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
  }
`

const ModalHeader = styled.div`
  padding: 20px;
  user-select: none;

  box-sizing: border-box;
  border-radius: 8px 8px 0 0;

  /* H1 Bold (26) */
  font-family: Helvetica;
  font-style: normal;
  font-weight: bold;
  font-size: 26px;
  line-height: 28px;

  /* Top Nav Bar/Top Nav Bar Primary/Nav Text On Primary */
  color: #ffffff;

  background: #003b45;
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
            {/* <ModalBanner banner={banner}>
              {banner ? program_icon : ''}
              {banner ? banner.text : ''}
            </ModalBanner> */}
            {children}
          </ModalDiv>
        </ModalBackdrop>
      )}
    </div>
  )
})

const HeadingDiv = styled.div<Required<StyleProps>>`
  ${(props) => props.css}
  //   display: block;
  height: 20px;
  width: 100%;
  background: red;
  //   margin-top: -10px;
  //   margin-bottom: 10px;
`

export const ModalHeading = React.forwardRef<React.ElementRef<'div'>, ModalContentProps>((props, forwardedRef) => {
  const { children, css = {}, ...rest } = props

  return <HeadingDiv {...rest} ref={forwardedRef} css={css} />
})

type ModalActionProps = ActionOptions & StyleProps & React.ComponentProps<'div'>

interface ActionOptions {
  primaryAction?: any
  secondaryAction?: any
}

const ModalActionDiv = styled.div<Required<StyleProps>>`
  ${(props) => props.css}
  //   display: block;
  //   padding: 10px 20px 10px 20px;
  margin-top: 10px;
  margin-bottom: 10px;
  box-sizing: border-box;
  border-radius: 0 0 8px 8px;
  display: flex;
  align-items: center;
  justify-content: center;
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
  ${(props) => props.css}
  margin: 20px;
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
  ${(props) => props.css}
  //   margin: 20px;
  max-width: fit-content;
  margin-top: 10px;
  margin-bottom: 10px;
  color: #575757;
  font-family: Helvetica;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
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
  ${(props) => props.css}
  //   display: block;
  /* Surface/Background */

  background: #F9F9F9;
  /* On Surface/Border */

  border: 1px solid #e2e2e2;
  box-sizing: border-box;
  border-radius: 4px;

  padding: 20px;
  font-family: monospace;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  /* or 143% */

  display: flex;
  align-items: center;

  /* On Surface/Text */

  color: #575757;
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
  ${(props) => props.css}
  //   display: block;
  height: 1px;
  width: 100%;
  background: #e2e2e2;
  margin: 20px 0 20px -20px;
  padding-right: 40px;
`
export const ModalContentDivider = React.forwardRef<React.ElementRef<'div'>, ModalContentProps>((props, forwardedRef) => {
  const { children, css = {}, ...rest } = props

  return <DividerDiv {...rest} ref={forwardedRef} css={css} />
})

const ModalBannerDiv = styled.div<Required<StyleProps>>`
  height: 36px;
  background: #12c8d7;
  display: flex;
  align-items: center;

  padding: 20px;
  margin: -20px;
  margin-bottom: 20px;

  color: #fff;
  text-indent: 20px;
  user-select: none;

  /* H3 Bold (18) */

  font-family: Helvetica;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 20px;
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
  height: 20px;
  background: #12c8d7;
  display: flex;
  align-items: center;

  padding: 20px;
  margin: -20px;
  margin-bottom: 20px;

  text-indent: 15px;
  user-select: none;

  /* H3 Regular (18) */

  font-family: Helvetica;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 20px;
  /* identical to box height, or 111% */

  /* On Surface/Text Subdued */

  color: #858585;
  background: #fff;
  border-bottom: 1px solid #e2e2e2;
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
