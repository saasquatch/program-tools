import * as React from "react";
import styled, { CSSProp } from "styled-components";
import { IconKey, IconView } from "../Icon";
import { loadingAnimation, successAnimation } from "./Animations";
import * as Styles from "./Styles";

export type ButtonProps = OptionProps &
  StyleProps &
  Partial<React.ComponentProps<"button">>;

export interface OptionProps {
  /**
   * Key of the icon to display in the button
   */
  icon?: IconKey;
  /**
   * Icon location in button [default "left"]
   */
  iconLocation?: "left" | "right";
  /**
   * Content to display inside the button
   */
  children?: React.ReactElement | React.ReactNode | string;
}

export type ButtonType = "primary" | "secondary" | "text";

export interface StyleProps {
  /**
   * Button type, affects background and border colour
   */
  buttonType?: ButtonType;
  /**
   * Display the button in pill style with rounded sides
   */
  pill?: boolean;
  /**
   * Render in loading state with a spinner
   */
  loading?: boolean;
  /**
   * Render in critical state with red colour scheme
   */
  critical?: boolean;
  /**
   * Render is success state with green colour scheme
   */
  success?: boolean;
  /**
   * Button size affects the button itself and interior text/icons [default "medium"]
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
  ${Styles.universal_base}
  ${(props) => Styles[props.buttonType].base}
  ${(props) => props.size == "small" && Styles.small}
  ${(props) => props.size == "medium" && Styles.medium}
  ${(props) => props.size == "large" && Styles.large}
  ${(props) => props.critical && Styles[props.buttonType].critical}
  ${(props) => props.success && Styles[props.buttonType].success}
  ${(props) =>
    props.isLoading &&
    props.buttonType != "text" &&
    Styles[props.buttonType].loading}
  ${(props) => props.customCSS}
`;

export const ButtonView = React.forwardRef<
  React.ElementRef<"button">,
  ButtonProps
>((props, forwardedRef) => {
  const {
    buttonType = "primary",
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
      buttonType={buttonType}
      pill={pill}
      isLoading={loading}
      critical={critical}
      success={success}
      size={size}
      ref={forwardedRef}
      customCSS={customCSS}
    >
      {iconLocation == "left" && icon && (
        <IconView
          cursor={"inherit"}
          icon={icon}
          size={Styles.icon_size[size]}
        />
      )}
      <span> {children} </span>
      {iconLocation == "right" && icon && (
        <IconView
          cursor={"inherit"}
          icon={icon}
          size={Styles.icon_size[size]}
        />
      )}
      {loading && props.buttonType != "text" && (
        <>
          {children && (
            <span style={{ padding: Styles.anim_padding[size] }}></span>
          )}
          {loadingAnimation(
            Styles.loading_anim[size],
            buttonType == "primary"
              ? "var(--sq-action-primary)"
              : "var(--sq-action-secondary-border)"
          )}
        </>
      )}
      {buttonType == "primary" && success && (
        <>
          {children && (
            <span style={{ padding: Styles.anim_padding[size] }}></span>
          )}
          {successAnimation(Styles.checkmark_anim[size])}
        </>
      )}
    </StyledButton>
  );
});

/**
 * @deprecated use {@link ButtonView} instead
 */
export const Button = ButtonView;
