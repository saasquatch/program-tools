import * as React from "react";
import styled, { CSSProp } from "styled-components";
import * as Styles from "./Styles";

type TabGroupProps = OptionProps &
  StyleProps &
  Omit<React.ComponentProps<"div">, "translate" | "css">;

export interface OptionProps {
  children?: React.ReactNode;
  selected?: boolean;
}

export interface StyleProps {
  color?: "primary" | "secondary";
  customCSS?: CSSProp;
}

const TabGroupStyle = styled("div")<Required<StyleProps>>`
  ${Styles.tabgroup}
  ${(props) => Styles[props.color + "_bg"]};
  ${(props) => Styles[props.color + "_text"]};
  ${(props) => props.customCSS}
`;

const TabStyle = styled("div")<Required<StyleProps & { selected: boolean }>>`
  ${Styles.tab}
  ${(props) => Styles[props.color + "_grey"]};
  ${(props) => props.selected && Styles.selected}
  ${(props) => props.customCSS}
`;

export const TabGroup = React.forwardRef<
  React.ElementRef<"div">,
  TabGroupProps
>((props, forwardedRef) => {
  const { color = "primary", children, customCSS = {}, ...rest } = props;

  return (
    <TabGroupStyle
      color={color}
      {...rest}
      ref={forwardedRef}
      customCSS={customCSS}
    >
      {children}
    </TabGroupStyle>
  );
});

type TabProps = OptionProps &
  StyleProps &
  Omit<React.ComponentProps<"div">, "translate">;

export const Tab = React.forwardRef<React.ElementRef<"div">, TabProps>(
  (props, forwardedRef) => {
    const {
      color = "primary",
      selected = false,
      children,
      customCSS = {},
      ...rest
    } = props;

    return (
      <TabStyle
        color={color}
        selected={selected}
        {...rest}
        ref={forwardedRef}
        customCSS={customCSS}
      >
        {children}
      </TabStyle>
    );
  }
);
