import * as React from "react";
import styled, { CSSProp } from "styled-components";
import { Icon, IconKey } from "../Icon";
import * as Styles from "./Styles";

type ButtonProps = OptionProps & StyleProps & Omit<React.ComponentProps<"button">, "translate">;

export interface OptionProps {
  icon: IconKey;
  icon_css?: CSSProp;
}

export interface StyleProps {
  circle?: boolean;
  primary?: boolean;
  borderless?: boolean;
  size?: "mini" | "small" | "medium" | "large";
  css?: CSSProp;
}

const Button = styled.button<Required<StyleProps>>`
  ${Styles.icon}
  ${(props) => props.borderless && Styles.borderless}
  ${(props) => props.circle && Styles.circle}
  ${(props) => props.primary && Styles.primary}
  ${(props) => props.size == "mini" && Styles.icon_mini}
  ${(props) => props.size == "small" && Styles.icon_small}
  ${(props) => props.size == "medium" && Styles.icon_medium}
  ${(props) => props.size == "large" && Styles.icon_large}
  ${(props) => props.css}
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
    css = {},
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
      css={css}
    >
      <Icon icon={icon} size={Styles.icon_only_size[size]} css={icon_css} />
    </Button>
  );
});
