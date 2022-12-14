import React from "react";
import styled, { CSSProp } from "styled-components";
import * as Styles from "./Styles";

export type ScrollNavViewProps = OptionProps &
  StyleProps &
  Partial<React.ComponentProps<"div">>;

export interface OptionProps {
  /**
   * For adding scroll nav items
   */
  children: React.ReactNode[] | React.ReactNode;
  /**
   * To indicate the current section that the page is on
   */
  currentSection: number;
}

export type ScrollNavItemViewProps = {
  children: React.ReactNode[] | React.ReactNode;
  onClick: () => void;
  customCSS?: CSSProp;
} & Partial<React.ComponentProps<"div">>;

export interface StyleProps {
  /**
   * Custom CSS applied to the target
   */
  customCSS?: CSSProp;
}

const ItemDiv = styled.div<StyleProps>`
  ${Styles.ItemDiv}
  ${(props) => props.customCSS}
`;

const ContainerDiv = styled.div<StyleProps & { current: number }>`
  ${Styles.ContainerDiv}

  ${ItemDiv}:nth-child( ${(props) => props.current}) {
    border-left: 2px solid var(--sq-action-primary);
  }
  ${(props) => props.customCSS}
`;

const ScrollNavView = React.forwardRef<
  React.ElementRef<"div">,
  ScrollNavViewProps
>((props, forwardedRef) => {
  const { currentSection, customCSS = {}, children, ...rest } = props;
  return (
    <ContainerDiv
      {...rest}
      current={currentSection}
      customCSS={customCSS}
      ref={forwardedRef}
    >
      {children}
    </ContainerDiv>
  );
});

const ScrollNavItemView = React.forwardRef<
  React.ElementRef<"div">,
  ScrollNavItemViewProps
>((props, forwardedRef) => {
  const { children, customCSS = {}, onClick, ...rest } = props;
  return (
    <ItemDiv
      {...rest}
      onClick={onClick}
      customCSS={customCSS}
      ref={forwardedRef}
    >
      {children}
    </ItemDiv>
  );
});

const ScrollNavNamespace = Object.assign(ScrollNavView, {
  ItemView: ScrollNavItemView,
});
export { ScrollNavNamespace as ScrollNavView };
