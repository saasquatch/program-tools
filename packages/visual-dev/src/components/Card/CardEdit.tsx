import * as React from "react"
import styled, { CSSProp } from "styled-components"
import * as Styles from "./Styles"
import { Icon } from "../Icon"
import { PrimaryButton, SecondaryButton, IconButton } from "../Button"
import { Badge } from "../Badge"
import { Input } from "../Input"

type CardProps = OptionProps & StyleProps & React.ComponentProps<"div">

interface OptionProps {
  title?: string
  children?: any
  edit?: boolean
}

interface StyleProps {
  css?: CSSProp
}

const CardStyle = styled.div<Required<StyleProps>>`
  width: 850px;
  height: 74px;

  /* Surface/Surface */

  background: #ffffff;
  /* On Surface/Border */

  border: 2px solid #e2e2e2;
  box-sizing: border-box;

  border-radius: 4px;
  color: #575757;
  padding: 16px;
  ${(props) => props.css}
`
const CardHeader = styled.div`
	display: flex;
	  height: 40px;
	  vertical-align: middle

  flex-direction: column;
  align-items: center;
`

const CardHeaderIcon = styled.div`
  float: left;
  margin-right: 16px;
`
const CardHeaderText = styled.div`
  font-size: 18px;
  line-height: 20px;
  font-weight: bold;
  float: left;
`
const TextTitle = styled.div`
  font-family: Helvetica;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 20px;
`

const TextDesc = styled.div`
  font-family: Helvetica;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  /* identical to box height, or 143% */

  /* On Surface/Text Subdued */

  color: #858585;
`

export const CardEdit = React.forwardRef<React.ElementRef<"div">, CardProps>((props, forwardedRef) => {
  const { title, edit = false, children, css = {}, ...rest } = props

  return (
    <CardStyle {...rest} ref={forwardedRef} css={css}>
      <CardHeader>
        <CardHeaderIcon>
          <Icon icon="calendar" size="large" css="" color="grey" />
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
