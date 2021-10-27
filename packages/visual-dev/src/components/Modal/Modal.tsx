import * as React from "react"
import styled, { CSSProp } from "styled-components"
import { Icon } from "../Icon"
import * as Styles from "./Styles"

type ModalProps = OptionProps & StyleProps & React.ComponentProps<"div">

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

export const Modal = React.forwardRef<React.ElementRef<"div">, ModalProps>((props, forwardedRef) => {
  const { title, open = false, onClose, banner, primaryAction, secondaryAction, children, css = {}, ...rest } = props
  return (
    <div>
      {open && (
        <ModalBackdrop>
          <ModalDiv {...rest} ref={forwardedRef} css={css}>
            <ModalHeader>
              {title}
              <Icon icon="close" color="#fff" size="24px" css="vertical-align: bottom; float: right; cursor: pointer; margin-left: 50px;" onClick={onClose} />
            </ModalHeader>
            {children}
          </ModalDiv>
        </ModalBackdrop>
      )}
    </div>
  )
})
