import * as React from "react";
import styled, { CSSProp } from "styled-components";
import { Icon, IconKey } from "../Icon";
import * as Styles from "./Styles";

type ButtonProps = OptionProps &
  StyleProps &
  Omit<React.ComponentProps<"button">, "translate" | "css">;

export interface OptionProps {
  /**
   * Icon on button
   */
  icon: IconKey;
  /**
   * Icon location on button
   */
  icon_css?: CSSProp;
}

export interface StyleProps {
  /**
   * Render button as a circle
   */
  circle?: boolean;
  /**
   * Button is a primary button
   */
  primary?: boolean;
  /**
   * Render without border
   */
  borderless?: boolean;
  /**
   * Button size
   */
  size?: "mini" | "small" | "medium" | "large";
  /**
   * Custom CSS to apply to button
   */
  customCSS?: CSSProp;
}

const Button = styled.button<Required<StyleProps>>`
  ${Styles.icon.base}
  ${(props) => props.borderless && Styles.icon.borderless}
  ${(props) => props.circle && Styles.icon.circle}
  ${(props) => props.primary && Styles.primary.base}
  ${(props) => props.size == "mini" && Styles.icon[props.size]}
  ${(props) => props.customCSS}
`;
export const IconButton = React.forwardRef<
  React.ElementRef<"button">,
  ButtonProps
>((props, forwardedRef) => {
  const {
    icon,
    borderless = false,
    primary = false,
    circle = false,
    size = "medium",
    children,
    icon_css = {},
    customCSS = {},
    ...rest
  } = props;

  return (
    <Button
      {...rest}
      circle={circle}
      primary={primary}
      borderless={borderless}
      size={size}
      ref={forwardedRef}
      customCSS={customCSS}
    >
      <Icon
        icon={icon}
        size={Styles.icon_only_size[size]}
        customCSS={icon_css}
      />
    </Button>
  );
});
