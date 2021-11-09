import * as React from "react";
import styled, { CSSProp } from "styled-components";
import { IconKey, Icon } from "../Icon";
import { loadingAnimation } from "./Animations";
import * as Styles from "./Styles";

type ButtonProps = OptionProps &
  StyleProps &
  Omit<React.ComponentProps<"button">, "translate">;

interface OptionProps {
  icon?: IconKey;
  iconLocation?: "left" | "right";
  children?: React.ReactElement | string;
}

interface StyleProps {
  buttontype?: "primary" | "secondary";
  pill?: boolean;
  loading?: boolean;
  critical?: boolean;
  success?: boolean;
  size?: "small" | "medium" | "large";
  css?: CSSProp;
}

const StyledButton = styled.button<Required<StyleProps>>`
  ${Styles.base}
  ${(props) =>
    props.buttontype == "primary" ? Styles.primary : Styles.secondary}
  ${(props) => props.pill && Styles.pill}
  ${(props) => props.size == "small" && Styles.small}
  ${(props) => props.size == "medium" && Styles.medium}
  ${(props) => props.size == "large" && Styles.large}
  ${(props) => props.critical && Styles.secondary_critical}
  ${(props) => props.success && Styles.secondary_success}
  ${(props) => props.loading && Styles.secondary_loading}
  ${(props) => props.css}
`;

export const Button = React.forwardRef<React.ElementRef<"button">, ButtonProps>(
  (props, forwardedRef) => {
    const {
      buttontype = "primary",
      pill = false,
      loading = false,
      critical = false,
      success = false,
      icon,
      iconLocation = "left",
      size = "medium",
      children,
      css = {},
      ...rest
    } = props;

    return (
      <StyledButton
        {...rest}
        buttontype={buttontype}
        pill={pill}
        loading={loading}
        critical={critical}
        success={success}
        size={size}
        ref={forwardedRef}
        css={css}
      >
        {iconLocation == "left" && icon && (
          <Icon icon={icon} size={Styles.icon_size[size]} />
        )}
        <span> {children} </span>
        {iconLocation == "right" && icon && (
          <Icon icon={icon} size={Styles.icon_size[size]} />
        )}
        {loading && (
          <>
            {children && (
              <span style={{ padding: Styles.anim_padding[size] }}></span>
            )}
            {loadingAnimation(
              Styles.loading_anim[size],
              "var(--sq-action-secondary-border)"
            )}
          </>
        )}
      </StyledButton>
    );
  }
);
