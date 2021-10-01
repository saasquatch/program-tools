import * as React from 'react'
import styled, { CSSProp } from 'styled-components'
import * as Styles from './Styles'
import { IconKey, Icon } from '../Icon'

type PopoverProps = OptionProps & StyleProps & React.ComponentProps<'div'>

interface OptionProps {
  notification?: boolean
  icon?: IconKey
  children?: any
}

interface StyleProps {
  css?: CSSProp
}

const PopoverDiv = styled.div<Required<StyleProps> & { notification: boolean }>`
  ${(props) =>
    props.notification
      ? `
  min-width: 182px;
  max-width: 255px;
  padding: 8px 12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: inline-flex;
  align-items: center;
  `
      : `
  min-width: 252px;
  max-width: 368px;
  padding: 16px 36px;
  word-wrap: break-word;
  display: inline-block;
  align-items: center;
  `}

  background: #ffffff;
  border: 1px solid #e2e2e2;
  box-sizing: border-box;
  box-shadow: 3px 3px 7px rgba(0, 0, 0, 0.08);
  border-radius: 10px;
  div + div.action {
    margin-top: 10px;
  }
  ${(props) => props.css}
`

export const Popover = React.forwardRef<React.ElementRef<'div'>, PopoverProps>((props, forwardedRef) => {
  const { icon, notification = false, children, css = {}, ...rest } = props

  return (
    <PopoverDiv notification={notification} {...rest} ref={forwardedRef} css={css}>
      {icon ? (
        <span style={{ height: '100%' }}>
          <Icon size='20px' css='float: left; margin-right: 5px; ' icon={icon} />
        </span>
      ) : (
        ''
      )}
      {children}
    </PopoverDiv>
  )
})

const ActionDiv = styled.div<Required<StyleProps>>`
  white-space: inherit;
  overflow: inherit;
  text-overflow: inherit;
  font-family: Helvetica;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  color: #575757;
  ${(props) => props.css}
`

export const Action = React.forwardRef<React.ElementRef<'div'>, PopoverProps>((props, forwardedRef) => {
  const { children, css = {}, ...rest } = props

  return (
    <ActionDiv className='action' {...rest} ref={forwardedRef} css={css}>
      {children}
    </ActionDiv>
  )
})

const DividerDiv = styled.div<Required<StyleProps>>`
  height: 1px;
  margin: 16px -36px;
  background: #e2e2e2;
  ${(props) => props.css}
`

export const Divider = React.forwardRef<React.ElementRef<'div'>, PopoverProps>((props, forwardedRef) => {
  const { children, css = {}, ...rest } = props

  return <DividerDiv {...rest} ref={forwardedRef} css={css} />
})
