import React from "react";
import styled, { CSSProp } from "styled-components";

import * as Styles from "./Styles";

type TooltipProps = OptionProps &
  StyleProps &
  Omit<React.ComponentProps<"div">, "translate" | "css">;

export type directions = "top" | "left" | "bottom" | "right";
export interface OptionProps {
  /**
   * Text displayed inside the tooltip
   */
  text?: string;
  /**
   * Where the tooltip appears in relation to the element it is attached to
   */
  direction?: directions;
  /**
   * Display/hide the tooltip
   */
  showTooltip?: boolean;
  /**
   * Element the tooltip is attached to
   */
  children?: React.ReactNode;
}

export interface StyleProps {
  /**
   * Max width of the tooltip, use a valid CSS size value (px, %)
   */
  maxWidth?: string;
  /**
   * Custom CSS applied to tooltip
   */
  customCSS?: CSSProp;
}

const WrapperDiv = styled.div`
  ${Styles.base}
`;

const TooltipDiv = styled.div<Required<StyleProps>>`
  ${Styles.tooltip};

  max-width: ${(props) => (props.maxWidth ? props.maxWidth : "144px")};

  ${(props) => props.customCSS}
`;

export const TooltipView = React.forwardRef<
  React.ElementRef<"div">,
  TooltipProps
>((props, forwardedRef) => {
  const {
    text = "",
    direction = "top",
    showTooltip = false,
    children,
    maxWidth = "",
    customCSS = {},
    ...rest
  } = props;

  return (
    <WrapperDiv {...rest} ref={forwardedRef}>
      {children}
      {showTooltip && (
        <TooltipDiv
          maxWidth={maxWidth}
          customCSS={customCSS}
          className={direction}
        >
          {text}
        </TooltipDiv>
      )}
    </WrapperDiv>
  );
});

/**
 * @deprecated use {@link TooltipView} instead
 */
export const Tooltip = TooltipView;
