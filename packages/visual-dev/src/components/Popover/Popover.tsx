import * as React from 'react';
import styled from 'styled-components'
import { Button, ButtonProps } from '../Button'

type Position = "top" | "bottom" | "right" | "left"

export interface PopoverProps {
  show: boolean
  relativePosition: Position
  children: React.ReactNode
  overrideX?: number
  overrideY?: number
}

export interface SectionProps {
  children: React.ReactNode
}

const StyledSection = styled.div`
  box-sizing: border-box;
  padding: 12px 24px;

  &:not(:last-child) {
    border-bottom: 1px solid var(--sq-border);
  }
`

const Section: React.FC<SectionProps> = ({children}) => {
  return <StyledSection>{children}</StyledSection>
}

export interface ActionProps extends Omit<ButtonProps, 'buttonType'> {}

const StyledAction = styled(Button)`
  padding: 0px;
  box-sizing: border-box;
  font-size: var(--sq-font-size-small);
  text-decoration: none;
  color: var(--sq-action-primary); 
`

const Action: React.FC<ActionProps> = ({children, ...rest}) => (
  <StyledAction buttonType="text" {...rest as any}>{children}</StyledAction>
)

const StyledContainer = styled.div`
  max-width: 300px;
  width: fit-content;
  box-sizing: border-box;
  border-radius: 10px;
  border: 1px solid var(--sq-border);
  color: var(--sq-text);
  font-size: var(--sq-font-size-small);
  line-height: var(--sq-line-height-regular);
  font-family: var(--sq-font-family-sans);
  box-shadow: 3px 3px 7px 0px #00000014;
`

export const Popover: React.FC<PopoverProps>
  & { Section: typeof Section }
  & { Action: typeof Action } = ({
  show,
  relativePosition,
  overrideX,
  overrideY,
  children
}) => {
  if (React.Children.count(children) > 1) {
    return <StyledContainer>{children}</StyledContainer>
  } else {
    return (
      <StyledContainer>
        <StyledSection style={{padding: "8px 16px"}}>{children}</StyledSection>
      </StyledContainer>
    )
  }
}


Popover.Section = Section
Popover.Action = Action
