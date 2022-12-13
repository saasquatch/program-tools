import React from "react";
import styled, { CSSProp } from "styled-components";
import * as Styles from "./Styles";

export type ScrollNavViewProps = OptionProps &
  StyleProps &
  Partial<React.ComponentProps<"span">>;

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

export interface ScrollNavItemViewProps {
  children: React.ReactNode[] | React.ReactNode;
  onClick: () => void;
  customCSS?: CSSProp;
}

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

const ScrollNavView = (props: ScrollNavViewProps) => {
  const { currentSection, customCSS = {}, children } = props;
  return (
    <ContainerDiv current={currentSection} customCSS={customCSS}>
      {children}
    </ContainerDiv>
  );
};

const ScrollNavItemView = (props: ScrollNavItemViewProps) => {
  const { children, customCSS = {}, onClick } = props;
  return (
    <ItemDiv onClick={onClick} customCSS={customCSS}>
      {children}
    </ItemDiv>
  );
};

const ScrollNavNamespace = Object.assign(ScrollNavView, {
  ItemView: ScrollNavItemView,
});
export { ScrollNavNamespace as ScrollNavView };
