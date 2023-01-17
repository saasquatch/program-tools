import * as React from "react";
import styled, { CSSProp } from "styled-components";
import * as Styles from "./Styles";

type TabGroupProps = OptionProps &
  StyleProps &
  Partial<React.ComponentProps<"div">>;

export interface OptionProps {
  /**
   * Tab group content, typically a number of Tab components
   */
  children?: React.ReactNode;
  /**
   * True if the given tab is selected
   */
  selected?: boolean;
}

export interface StyleProps {
  /**
   * Tab color scheme, primary or secondary
   */
  color?: "primary" | "secondary";
  /**
   * Custom CSS applied to the tab container
   */
  customCSS?: CSSProp;
}

const TabGroupStyle = styled("div")<Required<StyleProps>>`
  ${Styles.tabgroup}
  ${(props) => Styles[(props.color + "_bg") as keyof typeof Styles]};
  ${(props) => Styles[(props.color + "_text") as keyof typeof Styles]};
  ${(props) => props.customCSS}
`;

const TabStyle = styled("div")<Required<StyleProps & { selected: boolean }>>`
  ${Styles.tab}
  ${(props) => Styles[(props.color + "_grey") as keyof typeof Styles]};
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

type TabProps = OptionProps & StyleProps & Partial<React.ComponentProps<"div">>;

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
