import * as React from "react";
import styled from "styled-components";
import { Button, ButtonProps } from "../Button";
import * as Styles from "./Styles";

// type Position = "top" | "bottom" | "right" | "left";

export type PopoverProps = PopoverOptions &
  Omit<React.ComponentProps<"div">, "translate" | "css">;
export interface PopoverOptions {
  show: boolean;
  // relativePosition: Position
  children: React.ReactNode;
  relativeX: string;
  relativeY: string;
}

export interface SectionProps {
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
  top: ${({ relativeY }) => relativeY};
  left: ${({ relativeX }) => relativeX};

  ${Styles.StyledContainer}
`;

export const Popover: React.FC<PopoverProps> & { Section: typeof Section } & {
  Action: typeof Action;
} = ({
  show,
  // relativePosition,
  relativeY,
  relativeX,
  children,
}) => {
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
