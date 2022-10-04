import * as React from "react";
import styled, { CSSProp } from "styled-components";
import * as Styles from "./Styles";
import * as SVGs from "./SVGs";

export type IconProps = OptionProps &
  StyleProps &
  Partial<React.ComponentProps<"div">>;

export interface OptionProps {
  /**
   * Icon key
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
      ? `display: flex !important;
         align-items: center;
         justify-content: center;
         `
      : ""}

  & > svg {
    cursor: ${(props) => (props.cursor ? props.cursor : "default")};
    width: ${(props) =>
      default_size.hasOwnProperty(props.size)
        ? default_size[props.size as Size]
        : props.size};
  }
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
      >
        {Object.keys(SVGs).includes(icon) ? SVGs[icon] : SVGs["placeholder"]}
      </SVGStyleSpan>
    );
  }
);

/**
 * @deprecated use {@link IconView} instead
 */
export const Icon = IconView;
