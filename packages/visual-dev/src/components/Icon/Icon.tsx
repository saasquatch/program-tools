import * as React from "react";
import styled, { css, CSSProp } from "styled-components";
import * as Styles from "./Styles";
import * as SVGs from "./SVGs";
import { tooltip as TooltipStyles } from "../Tooltip/Styles";

export type IconProps = OptionProps &
  TooltipStyleProps &
  StyleProps &
  Partial<React.ComponentProps<"div">>;

export interface OptionProps {
  /**
   * Icon key
   */
  icon: IconKey;
  /**
   * Add a tooltip to icon
   */
  tooltip?: string | React.ReactNode | React.ReactNode[];
  /**
   * Set tooltip direction - defaults to top
   */
  tooltipDirection?: "top" | "left" | "bottom" | "right";
}

type Size = keyof typeof default_size;

export interface StyleProps {
  /**
   * Set the icon colour with valid CSS color values
   */
  color?: string;
  /**
   * Set the icon size with valid CSS size values (px, rem, em) or predefined small, medium, large, badge [default "medium"]
   */
  size?: Size | string;
  /**
   * Set the mouse cursor
   */
  cursor?: string;
  /**
   * Align icon to center
   */
  center?: boolean;
  /**
   * Custom CSS styles applied to icon
   */
  customCSS?: CSSProp;
  /**
   * Add a tooltip to icon
   */
  tooltip?: string | React.ReactNode | React.ReactNode[];
}

const default_size = {
  small: "var(--sq-icon-size-small)",
  medium: "var(--sq-icon-size-medium)",
  large: "var(--sq-icon-size-large)",
  badge: "var(--sq-icon-size-badge)",
};

const SVGStyleSpan = styled.span<Required<StyleProps>>`
  ${Styles.base}

  color: ${(props) => props.color};
  width: ${(props) =>
    default_size.hasOwnProperty(props.size)
      ? default_size[props.size as Size]
      : props.size};
  height: ${(props) =>
    default_size.hasOwnProperty(props.size)
      ? default_size[props.size as Size]
      : props.size};
  ${(props) => props.customCSS}

  ${(props) =>
    props.center
      ? css`
          display: flex !important;
          align-items: center;
          justify-content: center;
        `
      : ""}
  
  /* tooltip function */
  ${(props) =>
    props.tooltip &&
    css`
      ${Styles.tooltipIconStyles}
      &:hover ${TooltipDiv} {
        visibility: visible;
        opacity: 1;
      }
    `}

  & > svg {
    cursor: ${(props) => (props.cursor ? props.cursor : "default")};
    width: ${(props) =>
      default_size.hasOwnProperty(props.size)
        ? default_size[props.size as Size]
        : props.size};
  }
`;

export interface TooltipStyleProps {
  /**
   * Max width of the tooltip, use a valid CSS size value (px, %)
   */
  tooltipMaxWidth?: string;
  /**
   * Custom CSS styles applied to tooltip
   */
  tooltipCustomCSS?: CSSProp;
}

const TooltipDiv = styled.div<Required<TooltipStyleProps>>`
  ${TooltipStyles}

  visibility: hidden;
  opacity: 0;
  transition: opacity 150ms ease-in-out 400ms, visibility 600ms;

  max-width: ${(props) =>
    props.tooltipMaxWidth ? props.tooltipMaxWidth : "144px"};

  ${(props) => props.tooltipCustomCSS}
`;

export type IconKey = keyof typeof SVGs;

export const IconView = React.forwardRef<React.ElementRef<"div">, IconProps>(
  (props, forwardedRef) => {
    const {
      icon,
      color = "inherit",
      size = "medium",
      cursor = "default",
      center = false,
      customCSS = {},
      tooltip = "",
      tooltipDirection = "top",
      tooltipMaxWidth = "",
      tooltipCustomCSS = {},
      ...rest
    } = props;

    return (
      <SVGStyleSpan
        {...rest}
        size={size}
        color={color}
        ref={forwardedRef}
        customCSS={customCSS}
        cursor={cursor}
        center={center}
        tooltip={tooltip}
      >
        {tooltip && (
          <TooltipDiv
            className={tooltipDirection}
            tooltipMaxWidth={tooltipMaxWidth}
            tooltipCustomCSS={tooltipCustomCSS}
          >
            {tooltip}
          </TooltipDiv>
        )}
        {Object.keys(SVGs).includes(icon) ? SVGs[icon] : SVGs["placeholder"]}
      </SVGStyleSpan>
    );
  }
);

/**
 * @deprecated use {@link IconView} instead
 */
export const Icon = IconView;
