import * as React from "react";
import styled, { CSSProp } from "styled-components";
import { IconView, IconKey } from "../Icon";
import * as Styles from "./Styles";

type ButtonProps = OptionProps &
  StyleProps &
  Omit<React.ComponentProps<"button">, "translate" | "css">;

export interface OptionProps {
  /**
   * Key of the icon to display in the button
   */
  icon: IconKey;
  /**
   * CSS to apply to the icon in the button directly
   */
  icon_css?: CSSProp;
}

export interface StyleProps {
  /**
   * Render button as a circle (otherwise rectangle with rounded corners)
   */
  circle?: boolean;
  /**
   * Button is a primary button with orange colour scheme
   */
  primary?: boolean;
  /**
   * Render without border
   */
  borderless?: boolean;
  /**
   * Button size affects the button itself and the interior icon [default "medium"]
   */
  size?: "mini" | "small" | "medium" | "large";
  /**
   * Custom CSS to apply to the button
   */
  customCSS?: CSSProp;
}

const StyledButton = styled.button<Required<StyleProps>>`
  ${Styles.icon.base}
  ${(props) => props.borderless && Styles.icon.borderless}
  ${(props) => props.circle && Styles.icon.circle}
  ${(props) => props.primary && Styles.primary.base}
  ${(props) => props.size == "mini" && Styles.icon[props.size]}
  ${(props) => props.customCSS}
`;

export const IconButtonView = React.forwardRef<
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
    <StyledButton
      {...rest}
      circle={circle}
      primary={primary}
      borderless={borderless}
      size={size}
      ref={forwardedRef}
      customCSS={customCSS}
    >
      <IconView
        icon={icon}
        size={Styles.icon_only_size[size]}
        customCSS={icon_css}
      />
    </StyledButton>
  );
});

/**
 * @deprecated use {@link IconButtonView} instead
 */
export const IconButton = IconButtonView;
