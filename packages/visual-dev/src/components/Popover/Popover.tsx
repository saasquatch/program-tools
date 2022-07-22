import * as React from "react";
import styled from "styled-components";
import { Button, ButtonProps } from "../Button";
import * as Styles from "./Styles";

// type Position = "top" | "bottom" | "right" | "left";

export type PopoverProps = PopoverOptions &
  Partial<React.ComponentProps<"div">>;
export interface PopoverOptions {
  /**
   * Choose if popover is rendered
   */
  show?: boolean;
  /**
   * Content displayed inside the popover
   */
  children: React.ReactNode;
  /**
   * X offset of the popover relative to the element it originates from
   */
  relativeX?: string;
  /**
   * Y offset of the popover relative to the element it originates from
   */
  relativeY?: string;
}

export interface SectionProps {
  /**
   * Content to display inside the popover section
   */
  children: React.ReactNode;
}

const StyledSectionDiv = styled.div`
  ${Styles.StyledSection}
`;

const SectionView: React.FC<SectionProps> = ({ children }) => {
  return <StyledSectionDiv>{children}</StyledSectionDiv>;
};

export interface ActionProps extends Omit<ButtonProps, "buttonType"> {}

const StyledActionButton = styled(Button)`
  ${Styles.StyledAction}
`;

const ActionView: React.FC<ActionProps> = ({ children, ...rest }) => (
  <StyledActionButton buttonType="text" {...(rest as any)}>
    {children}
  </StyledActionButton>
);

const StyledContainerDiv = styled.div<
  Pick<PopoverProps, "show" | "relativeY" | "relativeX">
>`
  display: ${({ show }) => (show ? "block" : "none")};

  transform: translate(
    ${({ relativeX }) => relativeX},
    ${({ relativeY }) => relativeY}
  );

  ${Styles.StyledContainer}
`;

const PopoverView: React.FC<PopoverProps> = ({
  show = true,
  relativeY = "0px",
  relativeX = "0px",
  children,
}) => {
  if (React.Children.count(children) > 1) {
    return (
      <StyledContainerDiv
        show={show}
        relativeX={relativeX}
        relativeY={relativeY}
      >
        {children}
      </StyledContainerDiv>
    );
  } else {
    return (
      <StyledContainerDiv
        show={show}
        relativeX={relativeX}
        relativeY={relativeY}
      >
        <StyledSectionDiv style={{ padding: "8px 16px" }}>
          {children}
        </StyledSectionDiv>
      </StyledContainerDiv>
    );
  }
};

const PopoverNamespace = Object.assign(PopoverView, {
  SectionView: SectionView,
  ActionView: ActionView,
});

/**
 * @deprecated use {@link ListView} instead
 */
const PopoverNamespaceDeprecated = Object.assign(PopoverView, {
  Section: SectionView,
  Action: ActionView,
});

export { PopoverNamespace as PopoverView };

/**
 * @deprecated use {@link ListView} instead
 */
export { PopoverNamespaceDeprecated as Popover };
