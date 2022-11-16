import React from "react";
import styled, { CSSProp } from "styled-components";
import { IconView } from "../Icon/Icon";
import * as Styles from "./Styles";

type DropdownProps = OptionProps &
  StyleProps &
  Partial<React.ComponentProps<"div">>;

export interface OptionProps {
  /**
   * Dropdown content, almost always multiple Dropdown.Sublist or Dropdown.Item
   */
  children: React.ReactNode | React.ReactNode[];
}

export interface DropdownHandleProps {
  /**
   * Initial value for dropdown
   */
  currentValue: string;
  /**
   * OnClick callback for dropdown handle, usually toggles the open state
   */
  onClickHandle?: () => void;
  /**
   * Custom CSS applied to dropdown handle
   */
  customCSS?: CSSProp;
}

export interface DropdownMenuProps {
  /**
   * Controls whether the dropdown menu is open
   */
  isOpen: boolean;
  /**
   * Items contained in the sublist, usually multiple Dropdown.Sublist or Dropdown.Item
   */
  children: React.ReactNode;
  /**
   * Custom CSS applied to sublist
   */
  customCSS?: CSSProp;
}

export interface DropdownItemProps {
  /**
   * onClick for menu item. Usually to set selected.
   */
  onClickItem: () => void;
  /**
   * Name or slot for menu item
   */
  children: React.ReactNode | string | React.ReactNode[];
  /**
   * Indicates selected item. Selected item includes checkmark in menu
   */
  isSelected: boolean;
  /**
   * Custom CSS applied to menu item
   */
  customCSS?: CSSProp;
}

export interface StyleProps {
  /**
   * Custom CSS applied to dropdown handle
   */
  customCSS?: CSSProp;
}

export const MenuContainerDiv = styled.div<StyleProps>`
  ${Styles.MenuContainerDiv}
  ${(props) => props.customCSS}
`;

export const HandleDiv = styled.div<StyleProps>`
  ${Styles.HandleDiv}
  ${(props) => props.customCSS}
`;

export const MenuDiv = styled.div<StyleProps & { isOpen: boolean }>`
  ${Styles.MenuDiv}
  ${(props) => props.customCSS}
  ${(props) => (props.isOpen ? "display: block" : "display: none")}
`;

export const MenuItemDiv = styled.div<StyleProps>`
  ${Styles.MenuItemDiv}
  ${(props) => props.customCSS}
`;

const DisplayDropdownContainerView = React.forwardRef<
  React.ElementRef<"div">,
  DropdownProps
>((props, forwardedRef) => {
  const { children, customCSS } = props;
  return (
    <MenuContainerDiv ref={forwardedRef} customCSS={customCSS}>
      {children}
    </MenuContainerDiv>
  );
});

const DisplayDropdownHandleView = React.forwardRef<
  React.ElementRef<"div">,
  DropdownHandleProps
>((props, forwardedRef) => {
  const { currentValue, onClickHandle: onClickDropdown, customCSS } = props;
  return (
    <HandleDiv
      onClick={onClickDropdown}
      ref={forwardedRef}
      customCSS={customCSS}
    >
      <span>{currentValue}</span>
      <IconView size="small" icon="arrow_dropdown" cursor="pointer" />
    </HandleDiv>
  );
});

const DisplayDropdownMenuView = React.forwardRef<
  React.ElementRef<"div">,
  DropdownMenuProps
>((props, forwardedRef) => {
  const { children, customCSS, isOpen } = props;
  return (
    <MenuDiv ref={forwardedRef} customCSS={customCSS} isOpen={isOpen}>
      {children}
    </MenuDiv>
  );
});

const DisplayDropdownItemView = React.forwardRef<
  React.ElementRef<"div">,
  DropdownItemProps
>((props, forwardedRef) => {
  const { onClickItem: onClick, children, isSelected, customCSS } = props;
  return (
    <MenuItemDiv onClick={onClick} ref={forwardedRef} customCSS={customCSS}>
      <IconView
        style={{ visibility: `${isSelected ? "visible" : "hidden"}` }}
        icon="checkmark"
      />
      {children}
    </MenuItemDiv>
  );
});

export const DisplayDropdown = {
  MenuView: DisplayDropdownMenuView,
  HandleView: DisplayDropdownHandleView,
  ItemView: DisplayDropdownItemView,
  ContainerView: DisplayDropdownContainerView,
};
