import React from "react";
import styled, { CSSProp } from "styled-components";
import { IconView } from "../Icon";

type DropdownProps = StyleProps & Partial<React.ComponentProps<"div">>;

export interface StyleProps {
  /**
   * Custom CSS applied to dropdown handle
   */
  customCSS?: CSSProp;
}

export const MenuContainerDiv = styled.div`
  position: relative;
  width: min-content;
  cursor: pointer;
`;

export const HandleDiv = styled.div`
  color: var(--sq-text);
  font-size: var(--sq-font-size-regular);
  width: max-content;
  display: flex;
  align-items: center;
`;

export const MenuDiv = styled.div`
  position: absolute;
  background-color: var(--sq-surface);
  border: 1px solid var(--sq-border);
  border-radius: var(--sq-border-radius-normal);
  box-shadow: 3px 3px 7px rgba(0, 0, 0, 0.08);
  min-width: 80px;
  transform: translate(-45%, -45%);
`;

export const MenuItemDiv = styled.div`
  font-size: var(--sq-font-size-regular);
  padding: var(--sq-spacing-x-small) var(--sq-spacing-small);
  box-sizing: border-box;
  cursor: pointer;
  min-width: 200px;
  width: 100%;
  max-width: 300px;
  display: flex;
  align-items: center;
  word-wrap: break-word;
  overflow: hidden;
  &:hover {
    background: #fafafa;
  }
`;

export interface TableDropdownProps {
  currentValue: string;
  children: React.ReactNode | React.ReactNode[];
}

export interface TableDropdownItemViewProps {
  onClick: () => void;
  children: React.ReactNode | string | React.ReactNode[];
  isSelected: boolean;
}

export interface TableDropdownHandleView {
  currentValue: string;
}

export const TableDropdown = (props: TableDropdownProps) => {
  const { children, currentValue } = props;
  return (
    <MenuContainerDiv>
      <PopperController
        referenceSlot={<TableDropdownHandleView {...{ currentValue }} />}
        Component={() => <MenuDiv>{children}</MenuDiv>}
      ></PopperController>
    </MenuContainerDiv>
  );
};

export const TableDropdownHandleView = (props: TableDropdownHandleView) => {
  const { currentValue } = props;
  return (
    <HandleDiv>
      <span>{currentValue}</span>
      <IconView size="small" icon="arrow_dropdown" cursor="pointer" />
    </HandleDiv>
  );
};

export const TableDropdownItemView = (props: TableDropdownItemViewProps) => {
  const { onClick, children, isSelected } = props;
  return (
    <MenuItemDiv onClick={() => onClick()}>
      <IconView
        style={{ visibility: `${isSelected ? "visible" : "hidden"}` }}
        icon="checkmark"
      />
      {children}
    </MenuItemDiv>
  );
};

TableDropdown.ItemView = TableDropdownItemView;
