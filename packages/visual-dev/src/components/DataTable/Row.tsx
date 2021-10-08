import * as React from 'react'
import styled, { CSSProp } from 'styled-components'
import * as Styles from './Styles'
import { IconKey, Icon } from '../Icon'

type PopoverProps = OptionProps & StyleProps & React.ComponentProps<'div'>

interface OptionProps {
  content?: any
  children?: any
}

interface StyleProps {
  variant?: 'row' | 'header' | 'banner' | 'extra'
  css?: CSSProp
}

const RowDiv = styled.div<Required<StyleProps>>`
  display: flex;
  padding: 20px;
  justify-content: space-between;
  align-items: center;
  font-family: Helvetica;
  font-style: normal;
  font-size: 14px;
  line-height: 20px;
  color: #232323;

  ${(props) =>
    props.variant == 'row' &&
    `
    background: #FFFFFF;
    border: 2px solid #E2E2E2;
    box-sizing: border-box;
  `}

  ${(props) =>
    props.variant == 'header' &&
    `
    font-weight: bold;
    background: #F9F9F9;
    border: 2px solid #E2E2E2;
    box-sizing: border-box;
    border-radius: 6px 6px 0px 0px;
  `}

  ${(props) =>
    props.variant == 'banner' &&
    `
    padding: 0;
    // margin: 20px;
    color: white;
    height: 74px;
    background: #003b45;
    border: 2px solid #003b45;
    box-sizing: border-box;
    border-top-left-radius: 7px;
    border-top-right-radius: 7px;

  `}

  ${(props) =>
    props.variant == 'extra' &&
    `
    background: #f9f9f9;
    border: 2px solid #E2E2E2;
    box-sizing: border-box;

  `}

  ${(props) => props.css}
`

const ContentDiv = styled.div<{ flex: string; center: boolean; width: string }>`
  display: inline-block;
  ${(props) => (props.center ? 'text-align: center;' : '')}
  flex-grow: ${(props) => props.flex};
  width: ${(props) => props.width};
`

export const Row = React.forwardRef<React.ElementRef<'div'>, PopoverProps>((props, forwardedRef) => {
  const { content, variant = 'row', children, css = {}, ...rest } = props

  return (
    <RowDiv variant={variant} {...rest} ref={forwardedRef} css={css}>
      {content &&
        content.map((x: any) => (
          <ContentDiv flex={x.flex ? x.flex : '1'} center={x.center} width={x.width ? x.width : '100px'}>
            {x.text}
          </ContentDiv>
        ))}
      {children}
      {variant == 'banner' && (
        <div>
          <span style={{ padding: 20 }}>Filter Rewards by Program</span>
          <span style={{ background: 'white', width: 2, height: '90px', marginTop: -45, display: 'inline-flex', position: 'absolute' }}>.</span>
          <span style={{ marginLeft: 20 }}>5 rewards earned across all programs</span>
        </div>
      )}
    </RowDiv>
  )
})
