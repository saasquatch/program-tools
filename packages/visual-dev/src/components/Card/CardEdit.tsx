import * as React from "react"
import styled, { CSSProp } from "styled-components"
import { Badge } from "../Badge"
import { SecondaryButton } from "../Button"
import { Icon } from "../Icon"
import { Input } from "../Input"
import * as Styles from "./Styles"

type CardProps = OptionProps & StyleProps & Omit<React.ComponentProps<"div">, "translate">

interface OptionProps {
  title?: string
  children?: any
  edit?: boolean
}

interface StyleProps {
  css?: CSSProp
}

const CardStyle = styled.div<Required<StyleProps>>`
  ${Styles.cardEdit}
  ${(props) => props.css}
`
const CardHeader = styled.div`
  ${Styles.cardEditHeader}
`
const CardHeaderIcon = styled.div`
  ${Styles.cardEditHeaderIcon}
`
const CardHeaderText = styled.div`
  ${Styles.cardEditHeaderText}
`
const TextTitle = styled.div`
  ${Styles.cardEditTextTitle}
`

const TextDesc = styled.div`
  ${Styles.cardEditTextDesc}
`

export const CardEdit = React.forwardRef<React.ElementRef<"div">, CardProps>((props, forwardedRef) => {
  const { title, edit = false, children, css = {}, ...rest } = props

  return (
    <CardStyle {...rest} ref={forwardedRef} css={css}>
      <CardHeader>
        <CardHeaderIcon>
          <Icon icon="calendar" size="large" css="" color="var(--sq-text-subdued)" />
        </CardHeaderIcon>
        {edit && (
          <>
            <Input placeholder="Edit Program Name" buttons />
          </>
        )}
        {!edit && (
          <>
            <CardHeaderText>
              <TextTitle>
                {title}
                <Icon size="25px" icon="edit" css="margin: -5px; margin-left: 0; :hover{color: #0275FB	;}" />
                <Badge status="success" css="display: inline; margin-left: 16px; font-size: 12px; padding: 1px 15px; ">
                  Live
                </Badge>
              </TextTitle>
              <TextDesc>{children}</TextDesc>
            </CardHeaderText>
          </>
        )}
        <SecondaryButton pill css="margin-left: auto; float: right;">
          Edit
        </SecondaryButton>
      </CardHeader>
    </CardStyle>
  )
})
