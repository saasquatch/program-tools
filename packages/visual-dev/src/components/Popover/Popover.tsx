import * as React from "react";
import styled from "styled-components";
import { Button, ButtonProps } from "../Button";
import * as Styles from "./Styles";

// type Position = "top" | "bottom" | "right" | "left";

export type PopoverProps = PopoverOptions &
  Omit<React.ComponentProps<"div">, "translate" | "css">;
export interface PopoverOptions {
  /**
   * Display popover
   */
  show?: boolean;
  /**
   * Popover content
   */
  children: React.ReactNode;
  /**
   * X offset
   */
  relativeX?: string;
  /**
   * Y offset
   */
  relativeY?: string;
}

export interface SectionProps {
  /**
   * Section content
   */
  children: React.ReactNode;
}

const StyledSection = styled.div`
  ${Styles.StyledSection}
`;

const Section: React.FC<SectionProps> = ({ children }) => {
  return <StyledSection>{children}</StyledSection>;
};

export interface ActionProps extends Omit<ButtonProps, "buttonType"> {}

const StyledAction = styled(Button)`
  ${Styles.StyledAction}
`;

const Action: React.FC<ActionProps> = ({ children, ...rest }) => (
  <StyledAction buttonType="text" {...(rest as any)}>
    {children}
  </StyledAction>
);

const StyledContainer = styled.div<
  Pick<PopoverProps, "show" | "relativeY" | "relativeX">
>`
  display: ${({ show }) => (show ? "block" : "none")};

  transform: translate(
    ${({ relativeX }) => relativeX},
    ${({ relativeY }) => relativeY}
  );

  ${Styles.StyledContainer}
`;

export const Popover: React.FC<PopoverProps> & { Section: typeof Section } & {
  Action: typeof Action;
} = ({ show = true, relativeY = "0px", relativeX = "0px", children }) => {
  if (React.Children.count(children) > 1) {
    return (
      <StyledContainer show={show} relativeX={relativeX} relativeY={relativeY}>
        {children}
      </StyledContainer>
    );
  } else {
    return (
      <StyledContainer show={show} relativeX={relativeX} relativeY={relativeY}>
        <StyledSection style={{ padding: "8px 16px" }}>
          {children}
        </StyledSection>
      </StyledContainer>
    );
  }
};

Popover.Section = Section;
Popover.Action = Action;
