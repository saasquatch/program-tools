import * as React from 'react'
import styled, { CSSProp } from 'styled-components'
import { Icon } from '../Icon'
import { Button } from '../Button'

import * as Styles from './Styles'

type ModalProps = OptionProps & StyleProps & React.ComponentProps<'div'>

interface OptionProps {
  title: string
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
  position: relative;
  background-color: #fefefe;
  margin: auto;
  padding: 0;
  width: 558px;
  //   box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border: 1px solid #e2e2e2;
  box-sizing: border-box;
  border-radius: 8px;
`

const ModalHeader = styled.div`
  padding: 20px;
  margin-bottom: 10px;

  box-sizing: border-box;
  border-radius: 8px 8px 0 0;

  /* H1 Bold (26) */
  font-family: Helvetica;
  font-style: normal;
  font-weight: bold;
  font-size: 26px;
  line-height: 28px;
  /* identical to box height, or 108% */

  /* Top Nav Bar/Top Nav Bar Primary/Nav Text On Primary */

  color: #ffffff;

  background: #003b45;
`
const ModalFooter = styled.div`
  display: block;
  //   padding: 20px;
  padding: 10px 20px 10px 20px;
  margin-bottom: 10px;
  box-sizing: border-box;
  border-radius: 0 0 8px 8px;

  //   border-top: 1px solid #e2e2e2;

  display: flex;
  align-items: center;
  justify-content: space-around;
`

const DividerDiv = styled.div`
  display: block;
  height: 1px;
  width: 100%;
  background: #e2e2e2;
  //   padding: 10px 20px 10px 20px;
  margin-top: 10px;
  margin-bottom: 10px;
`

const ModalSectionDiv = styled.div`
  //   padding: 20px;
  padding: 10px 20px 10px 20px;

  /* Body/Body Regular (14) */

  font-family: Helvetica;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  /* or 143% */

  /* On Surface/Text */

  color: #575757;
`

export const Modal = React.forwardRef<React.ElementRef<'div'>, ModalProps>((props, forwardedRef) => {
  const { title, children, css = {}, ...rest } = props

  return (
    <ModalBackdrop>
      <ModalDiv {...rest} ref={forwardedRef} css={css}>
        <ModalHeader>
          {title}
          <Icon icon='close' color='#fff' size='24px' css='vertical-align: bottom; float: right;' />
        </ModalHeader>
        <ModalSectionDiv>{children}</ModalSectionDiv>
        {/* <DividerDiv /> */}
        <ModalFooter>
          <Button variant='primary'> Close </Button>
        </ModalFooter>
      </ModalDiv>
    </ModalBackdrop>
  )
})

export const ModalSection = React.forwardRef<React.ElementRef<'div'>, ModalProps>((props, forwardedRef) => {
  const { children, css = {}, ...rest } = props

  return <ModalSectionDiv {...rest} ref={forwardedRef} css={css}></ModalSectionDiv>
})
