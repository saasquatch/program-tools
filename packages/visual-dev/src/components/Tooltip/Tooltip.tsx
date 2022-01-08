import React from "react";
import styled, { CSSProp } from "styled-components";

import * as Styles from "./Styles";

type TooltipProps = OptionProps &
  StyleProps &
  Omit<React.ComponentProps<"div">, "translate"|"css">;

export type directions = "top" | "left" | "bottom" | "right";
export interface OptionProps {
  text?: string;
  direction?: directions;
  showTooltip?: boolean;
  children?: React.ReactNode;
}

export interface StyleProps {
  customCSS?: CSSProp;
}

const TooltipDiv = styled.div<Required<StyleProps>>`
  ${Styles.base}
  ${(props) => props.customCSS}
`;

const TooltipTip = styled.div`
  ${Styles.tooltip}
`;

export const Tooltip = React.forwardRef<React.ElementRef<"div">, TooltipProps>(
  (props, forwardedRef) => {
    const {
      text = "",
      direction = "top",
      showTooltip = false,
      children,
      customCSS = {},
      ...rest
    } = props;

    return (
      <TooltipDiv {...rest} ref={forwardedRef} customCSS={customCSS}>
        {children}
        {showTooltip && <TooltipTip className={direction}>{text}</TooltipTip>}
      </TooltipDiv>
    );
  }
);
