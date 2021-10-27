import * as React from "react"
import root from "react-shadow/styled-components"
import styled from "styled-components"
import * as Styles from "./Styles"
import { IconKey, Icon } from "../Icon"

type InputProps = OptionProps & React.ComponentProps<"input">

interface OptionProps {
  id: string
  value?: any
  onChange?: any
  options?: any
  icon?: IconKey
}

const ShadowDom = styled(root.div)``

const RadioLabel = styled.label<{ isChecked: boolean }>`
  ${Styles.RadioLabelStyle}
  ${(props) => (props.isChecked ? "border: 2px solid var(--sq-action-primary-hovered);" : "&:hover {border: 2px solid var(--sq-text-subdued);}")}
`
const RadioInput = styled.input`
  ${Styles.RadioInputStyle}
`

const RightSegment = styled.div`
  ${Styles.RightSegmentStyle}
`

const RadioText = styled.div`
  ${Styles.RadioTextStyle}
`

const LeftSegment = styled.div<{ isChecked: boolean }>`
  ${Styles.LeftSegmentStyle}
  ${(props) => (props.isChecked ? "color: var(--sq-action-primary-hovered);" : "")}
`

const RadioGrid = styled.div`
  ${Styles.RadioGridStyle}
`

export const RadioCard = React.forwardRef<React.ElementRef<"input">, InputProps>((props, forwardedRef) => {
  const { value, onChange, options, icon = "calendar", ...rest } = props

  let icon_color
  value ? (icon_color = "var(--sq-action-primary-hovered)") : ""

  return (
    <div>
      <RadioLabel htmlFor={rest.id} isChecked={value}>
        <RadioInput type="radio" checked={value} {...rest} ref={forwardedRef} />
        <LeftSegment isChecked={value}>
          <Icon icon={icon} size="40px" color={icon_color} />
        </LeftSegment>
        <RightSegment>
          <RadioText>
            {options.title ? <div style={{ fontWeight: "bold", marginBottom: 4 }}> {options.title} </div> : ""}
            {options.text ? <div style={{ color: "var(--sq-text-subdued)" }}> {options.text} </div> : ""}
          </RadioText>
        </RightSegment>
      </RadioLabel>
    </div>
  )
})

export const RadioCardGroup = React.forwardRef<React.ElementRef<"div">, InputProps>((props) => {
  const { children } = props

  return (
    <ShadowDom>
      <RadioGrid>{children}</RadioGrid>
    </ShadowDom>
  )
})
