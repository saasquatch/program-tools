import React from "react";
import styled, { CSSProp } from "styled-components";

import * as Styles from "./Styles";

type TooltipProps = OptionProps &
  StyleProps &
  Omit<React.ComponentProps<"div">, "translate" | "css">;

export type directions = "top" | "left" | "bottom" | "right";
export interface OptionProps {
  text?: string;
  direction?: directions;
  showTooltip?: boolean;
  children?: React.ReactNode;
}

export interface StyleProps {
  maxWidth?: string;
  customCSS?: CSSProp;
}

const TooltipDiv = styled.div`
  ${Styles.base}
`;

const TooltipTip = styled.div<Required<StyleProps>>`
  ${Styles.tooltip};

  max-width: ${(props) => (props.maxWidth ? props.maxWidth : "144px")};

  ${(props) => props.customCSS}
`;

export const Tooltip = React.forwardRef<React.ElementRef<"div">, TooltipProps>(
  (props, forwardedRef) => {
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
      <TooltipDiv {...rest} ref={forwardedRef}>
        {children}
        {showTooltip && (
          <TooltipTip
            maxWidth={maxWidth}
            customCSS={customCSS}
            className={direction}
          >
            {text}
          </TooltipTip>
        )}
      </TooltipDiv>
    );
  }
);
