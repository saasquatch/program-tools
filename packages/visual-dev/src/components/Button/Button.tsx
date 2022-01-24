import * as React from "react";
import styled, { CSSProp } from "styled-components";
import { IconKey, Icon } from "../Icon";
import { loadingAnimation, successAnimation } from "./Animations";
import * as Styles from "./Styles";

type ButtonProps = OptionProps &
  StyleProps &
  Omit<React.ComponentProps<"button">, "translate" | "css" | "loading">;

export interface OptionProps {
  /**
   * Icon on button
   */
  icon?: IconKey;
  /**
   * Icon location on button
   */
  iconLocation?: "left" | "right";
  /**
   * Custom children on button
   */
  children?: React.ReactElement | string;
}

export interface StyleProps {
  /**
   * Button type
   */
  buttonType?: "primary" | "secondary" | "text";
  /**
   * Pill-style button
   */
  pill?: boolean;
  /**
   * Render in loading state
   */
  loading?: boolean;
  /**
   * Render in critical state
   */
  critical?: boolean;
  /**
   * Render is success state
   */
  success?: boolean;
  /**
   * Button Size
   */
  size?: "small" | "medium" | "large";
  /**
   * Custom CSS applied to button
   */
  customCSS?: CSSProp;
}

const StyledButton = styled.button<
  Required<Omit<StyleProps, "loading">> & { isLoading: boolean }
>`
  ${Styles.base}
  ${(props) => Styles[props.buttonType]}
  ${(props) => props.pill && Styles.pill}
  ${(props) => props.size == "small" && Styles.small}
  ${(props) => props.size == "medium" && Styles.medium}
  ${(props) => props.size == "large" && Styles.large}
  ${(props) => props.critical && Styles[`${props.buttonType}_critical`]}
  ${(props) => props.success && Styles[`${props.buttonType}_success`]}
  ${(props) =>
    props.isLoading &&
    props.buttonType != "text" &&
    Styles[`${props.buttonType}_loading`]}
  ${(props) => props.customCSS}
`;

export const Button = React.forwardRef<React.ElementRef<"button">, ButtonProps>(
  (props, forwardedRef) => {
    const {
      buttonType: buttontype = "primary",
      pill = false,
      loading = false,
      critical = false,
      success = false,
      icon,
      iconLocation = "left",
      size = "medium",
      children,
      customCSS = {},
      ...rest
    } = props;

    return (
      <StyledButton
        {...rest}
        buttonType={buttontype}
        pill={pill}
        isLoading={loading}
        critical={critical}
        success={success}
        size={size}
        ref={forwardedRef}
        customCSS={customCSS}
      >
        {iconLocation == "left" && icon && (
          <Icon icon={icon} size={Styles.icon_size[size]} />
        )}
        <span> {children} </span>
        {iconLocation == "right" && icon && (
          <Icon icon={icon} size={Styles.icon_size[size]} />
        )}
        {loading && props.buttonType != "text" && (
          <>
            {children && (
              <span style={{ padding: Styles.anim_padding[size] }}></span>
            )}
            {loadingAnimation(
              Styles.loading_anim[size],
              buttontype == "primary"
                ? "var(--sq-action-primary)"
                : "var(--sq-action-secondary-border)"
            )}
          </>
        )}
        {buttontype == "primary" && success && (
          <>
            {children && (
              <span style={{ padding: Styles.anim_padding[size] }}></span>
            )}
            {successAnimation(Styles.checkmark_anim[size])}
          </>
        )}
      </StyledButton>
    );
  }
);
