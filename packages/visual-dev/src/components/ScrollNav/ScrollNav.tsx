import React from "react";
import styled, { CSSProp } from "styled-components";
import * as Styles from "./Styles";

export type ScrollNavViewProps = OptionProps &
  StyleProps &
  Partial<React.ComponentProps<"span">>;

export interface OptionProps {
  /**
   * Todo - add description
   */
  children: React.ReactNode[] | React.ReactNode;
  currentSection: number;
}

export interface ScrollNavItemViewProps {
  children: React.ReactNode[] | React.ReactNode;
  onClick: () => void;
}

export interface ScrollNavProps {
  current: number;
  children: React.ReactNode | React.ReactNode[];
}

export interface StyleProps {
  /**
   * Custom CSS applied to input container
   */
  customCSS?: CSSProp;
}

const ItemDiv = styled.div<StyleProps>`
  ${Styles.ItemDiv}
`;

const ContainerDiv = styled.div<
  StyleProps & {
    currentSection: number;
  }
>`
  ${Styles.ContainerDiv}

  ${ItemDiv}:nth-child( ${(props) => props.currentSection}) {
    border-left: 2px solid var(--sq-action-primary);
  }
`;

export const ScrollNavView = (props: ScrollNavViewProps) => {
  const { currentSection, children } = props;
  return (
    <ContainerDiv currentSection={currentSection}>{children}</ContainerDiv>
  );
};

export const ScrollNavItemView = (props: ScrollNavItemViewProps) => {
  const { children, onClick } = props;
  return <ItemDiv onClick={onClick}>{children}</ItemDiv>;
};

ScrollNavView.ItemView = ScrollNavItemView;

/*

const ScrollNav = (props: ScrollNavProps) => {
  const current = props.current || 1;
  return (
    <ScrollNavView
      {...{
        indicatorOffset: (current - 1) * 36,
        indicatorHeight: 32,
      }}
    >
      {props.children}
    </ScrollNavView>
  );
};

ScrollNav.Item = ScrollNavItemView;

*/
