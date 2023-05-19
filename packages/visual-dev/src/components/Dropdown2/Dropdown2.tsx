import * as React from "react";
import styled, { CSSProp } from "styled-components";
import { IconKey, IconView } from "../Icon";
import * as Styles from "./Styles";
import { ButtonType, ButtonView } from "../Button/Button";
import { chevron_down } from "../Icon/SVGs";

type Dropdown2Props = OptionProps &
  StyleProps &
  Partial<React.ComponentProps<"div">>;

export interface OptionProps {
  /**
   * Text displayed in dropdown handle
   */
  text?: string;
  /**
   * Display the open dropdown menu
   */
  showMenu?: boolean;
  /**
   * Handle button type
   */
  buttonType: ButtonType;
  /**
   * Render the handle in the disabled (greyed out) state
   */
  disabled?: boolean;
  /**
   * Key of an icon to render left of the text in the handle
   */
  icon?: IconKey;
  /**
   * Show the menu able the handle instead of below
   */
  popUpwards?: boolean;
  /**
   * Onclick callback for dropdown handle, usually toggles the open state
   */
  onClickDropdown?: () => void;
  /**
   * Text displayed in place of items if no items are provided
   */
  emptyText?: string;
  /**
   * Dropdown content, almost always multiple Dropdown.Sublist or Dropdown.Item
   */
  children?: React.ReactNode;
}

export interface DropdownItemProps {
  /**
   * Callback triggered on menu item click
   */
  onClick?: () => void;
  /**
   * Custom CSS applied to item
   */
  customCSS?: CSSProp;
  /**
   * Visual content of the item, often a span or div with text
   */
  children?: React.ReactNode;
  /**
   * Item description that appears below the item's child
   */
  description?: string;
  /**
   * Secondary item description that appears to the right of the item's child
   */
  sideDescription?: string;
  /**
   * Display a checkmark before the item
   */
  checked?: boolean;
  /**
   * Text display in button when no value is selected
   */
  placeholder?: string;
}

export interface DropdownSublistProps {
  /**
   * Name of the menu sublist
   */
  name: string;
  /**
   * Custom CSS applied to sublist
   */
  customCSS?: CSSProp;
  /**
   * Items contained in the sublist, usually multiple Dropdown.Sublist or Dropdown.Item
   */
  children: React.ReactNode;
}

export interface StyleProps {
  /**
   * Custom CSS applied to dropdown handle
   */
  customCSS?: CSSProp;
}

const DropdownDiv = styled.div<Required<StyleProps>>`
  ${Styles.DropdownDiv}
  ${(props) => props.customCSS}
`;

const ArrowStyleSpan = styled.span`
  ${Styles.Arrow}
`;

export const Dropdown2View = React.forwardRef<
  React.ElementRef<"div">,
  Dropdown2Props
>((props, forwardedRef) => {
  const {
    text = "",
    showMenu = false,
    disabled = false,
    popUpwards = false,
    icon,
    onClickDropdown,
    children,
    placeholder,
    emptyText,
    buttonType,
    customCSS: customCSS = {},
    ...rest
  } = props;

  return (
    <DropdownDiv {...rest} ref={forwardedRef} customCSS={customCSS}>
      <ButtonView buttonType={buttonType}>
        {icon && (
          <IconView
            color="inherit"
            size="16px"
            icon={icon}
            style={{
              margin: -3,
              top: 2.5,
              marginRight: "var(--sq-spacing-x-small)",
            }}
          />
        )}
        {text || placeholder}
        <ArrowStyleSpan>{chevron_down}</ArrowStyleSpan>
      </ButtonView>
    </DropdownDiv>
  );
});
