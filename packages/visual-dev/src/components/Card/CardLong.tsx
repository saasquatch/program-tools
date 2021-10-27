import * as React from "react"
import styled, { CSSProp } from "styled-components"
import * as Styles from "./Styles"
import { Icon } from "../Icon"
import { PrimaryButton, SecondaryButton } from "../Button"

type CardProps = OptionProps & StyleProps & React.ComponentProps<"div">

interface OptionProps {
  title: string
  footer: any
  children: any
}

interface StyleProps {
  css?: CSSProp
}

const CardStyle = styled.div<Required<StyleProps>>`
  width: 450px;
  height: 211px;

  /* Surface/Surface */

  background: #ffffff;
  /* On Surface/Border */

  border: 2px solid #e2e2e2;
  box-sizing: border-box;
  border-radius: 4px;

  color: #575757;
  font-family: Helvetica;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  ${(props) => props.css}
`
const CardHeader = styled.div`
	vertical-align: middle

	font-family: Helvetica;
	font-style: normal;
	font-weight: bold;
	font-size: 18px;
	line-height: 20px;

  flex-direction: column;
  align-items: center;
  padding: 20px;
  padding-bottom: 0;
`

const CardText = styled.div`
  height: 61px;
  font-size: 14px;
  padding: 20px;
`

const CardFooter = styled.div`
  position: relative;
  bottom: 0px;
  background: #f9f9f9;
  height: 26px;
  padding: 20px;
`

export const CardLong = React.forwardRef<React.ElementRef<"div">, CardProps>((props, forwardedRef) => {
  const { title, footer, children, css = {}, ...rest } = props

  return (
    <CardStyle {...rest} ref={forwardedRef} css={css}>
      <CardHeader>{title}</CardHeader>
      <CardText>{children}</CardText>
      <CardFooter>{footer }</CardFooter>
    </CardStyle>
  )
})
