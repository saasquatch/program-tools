import * as React from "react";
import styled, { CSSProp } from "styled-components";
import { Icon, IconKey } from "../Icon";
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
  pill?: boolean;
  loading?: boolean;
  critical?: boolean;
  success?: boolean;
  size?: "small" | "medium" | "large";
  css?: CSSProp;
}

const Button = styled.button<Required<StyleProps>>`
  ${Styles.base}
  ${Styles.text}
  ${(props) => props.pill && Styles.pill}
  ${(props) => props.size == "small" && Styles.text_small}
  ${(props) => props.size == "medium" && Styles.text_medium}
  ${(props) => props.size == "large" && Styles.text_large}
  ${(props) => props.critical && Styles.text_critical}
  ${(props) => props.success && Styles.text_success}
  ${(props) => props.css}
`;

export const TextButton = React.forwardRef<
  React.ElementRef<"button">,
  ButtonProps
>((props, forwardedRef) => {
  const {
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
    <Button
      {...rest}
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
    </Button>
  );
});
