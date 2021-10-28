import * as React from "react"
import styled, { CSSProp } from "styled-components"
import * as Styles from "./Styles"
import { Icon } from "../Icon"
import { PrimaryButton, SecondaryButton } from "../Button"

type CardProps = OptionProps & StyleProps & Omit<React.ComponentProps<"div">, "translate">

interface OptionProps {
  title: string
  children: any
}

interface StyleProps {
  css?: CSSProp
}

const CardStyle = styled.div<Required<StyleProps>>`
  ${Styles.card}
  ${(props) => props.css}
`
const CardHeader = styled.div`
  ${Styles.cardHeader}
`
const CardHeaderIcon = styled.div`
  ${Styles.cardHeaderIcon}
`
const CardHeaderText = styled.div`
  ${Styles.cardHeaderText}
`
const CardText = styled.div`
  ${Styles.cardText}
`
const CardFooter = styled.div`
  ${Styles.cardFooter}
`

export const Card = React.forwardRef<React.ElementRef<"div">, CardProps>((props, forwardedRef) => {
  const { title, children, css = {}, ...rest } = props

  return (
    <CardStyle {...rest} ref={forwardedRef} css={css}>
      <CardHeader>
        <CardHeaderIcon>
          <Icon icon="calendar" size="large" css="" color="var(--sq-text-subdued)" />
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
