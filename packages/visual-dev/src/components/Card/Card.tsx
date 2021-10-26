import * as React from "react"
import styled, { CSSProp } from "styled-components"
import * as Styles from "./Styles"
import { Icon } from "../Icon"

type AvatarProps = OptionProps & StyleProps & React.ComponentProps<"div">

interface OptionProps {}

interface StyleProps {
  css?: CSSProp
}

const CardStyle = styled.div<Required<StyleProps>>`
  ${Styles.base}
  ${(props) => props.css}
`
const CardTitle = styled.div`
  padding: 16px;
`
const CardTitleText = styled.span`
  color: #575757;
  font-family: Helvetica;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 20px;
`

export const Card = React.forwardRef<React.ElementRef<"div">, AvatarProps>((props, forwardedRef) => {
  const { css = {}, ...rest } = props

  return (
    <CardStyle {...rest} ref={forwardedRef} css={css}>
      <CardTitle>
        {/* <Icon icon="calendar" size="large" css="" color="grey" /> */}
        <CardTitleText>TITLE</CardTitleText>
      </CardTitle>
      asd
    </CardStyle>
  )
})
