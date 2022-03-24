import * as React from "react";
import styled, { CSSProp } from "styled-components";
import * as Styles from "./Styles";
import * as SVGs from "./SVGs";

export type IconProps = OptionProps &
  StyleProps &
  Omit<React.ComponentProps<"div">, "translate" | "css">;

export interface OptionProps {
  /**
   * Icon
   */
  icon: IconKey;
}

type Size = keyof typeof default_size;

export interface StyleProps {
  /**
   * Set the icon colour with valid CSS color values
   */
  color?: string;
  /**
   * Set the icon size with valid CSS size values (px, rem, em)
   */
  size?: Size | string;
  /**
   * Custom CSS styles applied to icon
   */
  customCSS?: CSSProp;
}

const default_size = {
  small: "var(--sq-icon-size-small)",
  medium: "var(--sq-icon-size-medium)",
  large: "var(--sq-icon-size-large)",
  badge: "var(--sq-icon-size-badge)",
};

const StyledSVG = styled.div<Required<StyleProps>>`
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
`;

export type IconKey = keyof typeof SVGs;

export const Icon = React.forwardRef<React.ElementRef<"div">, IconProps>(
  (props, forwardedRef) => {
    const {
      icon,
      color = "inherit",
      size = "medium",
      customCSS = {},
      ...rest
    } = props;

    return (
      <StyledSVG
        {...rest}
        size={size}
        color={color}
        ref={forwardedRef}
        customCSS={customCSS}
      >
        {Object.keys(SVGs).includes(icon) ? SVGs[icon] : SVGs["placeholder"]}
      </StyledSVG>
    );
  }
);
