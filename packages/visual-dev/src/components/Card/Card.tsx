import * as React from "react"
import styled, { CSSProp } from "styled-components"
import * as Styles from "./Styles"
import { Icon } from "../Icon"
import { PrimaryButton, SecondaryButton } from "../Button"

type CardProps = OptionProps & StyleProps & React.ComponentProps<"div">

interface OptionProps {
  title: string
  children: any
}

interface StyleProps {
  css?: CSSProp
}

const CardStyle = styled.div<Required<StyleProps>>`
  ${Styles.base}
  color: #575757;
  font-family: Helvetica;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  padding: 8px;
  ${(props) => props.css}
`
const CardHeader = styled.div`
	display: flex;
	  height: 40px;	vertical-align: middle

  flex-direction: column;
  align-items: center;
  padding: 8px;
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
const CardText = styled.div`
  height: 94px;
  font-size: 14px;
  padding: 8px;
`

const CardFooter = styled.div`
  position: relative;
  bottom: 0px;
`

export const Card = React.forwardRef<React.ElementRef<"div">, CardProps>((props, forwardedRef) => {
  const { title, children, css = {}, ...rest } = props

  return (
    <CardStyle {...rest} ref={forwardedRef} css={css}>
      <CardHeader>
        <CardHeaderIcon>
          <Icon icon="calendar" size="large" css="" color="grey" />
        </CardHeaderIcon>
        <CardHeaderText>{title}</CardHeaderText>
      </CardHeader>
      <CardText> {children}</CardText>
      <CardFooter>
        <SecondaryButton size="small" pill css="width: 124px; margin-right: 8px;">
          Learn More
        </SecondaryButton>
        <PrimaryButton size="small" pill css="width: 124px;">
          Create
        </PrimaryButton>
      </CardFooter>
    </CardStyle>
  )
})
