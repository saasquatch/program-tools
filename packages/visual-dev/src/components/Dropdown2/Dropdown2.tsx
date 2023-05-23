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
   * Display the open dropdown menu
   */
  showMenu?: boolean;
  /**
   * Render the handle in the disabled (greyed out) state
   */
  disabled?: boolean;
  /**
   * Show the menu able the handle instead of below
   */
  popUpwards?: boolean;
  /**
   * Text displayed in place of items if no items are provided
   */
  emptyText?: string;
  /**
   * Dropdown content, almost always multiple Dropdown.Sublist or Dropdown.Item
   */
  children?: React.ReactNode;
  /**
   * Slot for the dropdown handle
   */
  handleSlot?: React.ReactNode;
}

export interface HandleProps {
  /**
   * Text displayed in dropdown handle
   */
  children: string | React.ReactNode | React.ReactNode[];
  /**
   * Key of an icon to render left of the text in the handle
   */
  icon?: IconKey;
  /**
   * Handle button type
   */
  buttonType?: ButtonType;
  /**
   * Onclick callback for dropdown handle, usually toggles the open state
   */
  onClickDropdown?: () => void;
  /**
   * Custom CSS applied to item
   */
  customCSS?: CSSProp;
  /**
   * Text display in button when no value is selected
   */
  placeholder?: string;
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

const DropdownContentDiv = styled("div")<Dropdown2Props>`
  ${Styles.ContentDiv}

  ${(props) =>
    props.popUpwards &&
    `top: 2px; transform: translateY(calc(-100% + -1*var(--sq-spacing-x-small)));`}
`;

const EmptyTextSpan = styled("span")`
  ${Styles.EmptyTextSpan}
`;

const Dropdown2View = React.forwardRef<React.ElementRef<"div">, Dropdown2Props>(
  (props, forwardedRef) => {
    const {
      showMenu = false,
      disabled = false,
      popUpwards = false,
      children,
      placeholder,
      emptyText,
      customCSS: customCSS = {},
      handleSlot = <div></div>,
      ...rest
    } = props;

    return (
      <DropdownDiv {...rest} ref={forwardedRef} customCSS={customCSS}>
        {handleSlot}
        {showMenu && (
          <DropdownContentDiv popUpwards={popUpwards}>
            {children ||
              (emptyText && (
                <ItemView>
                  <EmptyTextSpan>{emptyText}</EmptyTextSpan>
                </ItemView>
              ))}
          </DropdownContentDiv>
        )}
      </DropdownDiv>
    );
  }
);

const HandleView = React.forwardRef<React.ElementRef<"button">, HandleProps>(
  (props, forwardedRef) => {
    const {
      placeholder,
      icon,
      buttonType = "primary",
      customCSS = {},
      onClickDropdown,
      children,
      ...rest
    } = props;
    return (
      <ButtonView
        buttonType={buttonType}
        ref={forwardedRef}
        onClick={onClickDropdown}
        customCSS={customCSS}
        {...rest}
      >
        {icon && (
          <IconView
            color="inherit"
            size="16px"
            icon={icon}
            customCSS={{
              marginTop: "var(--sq-spacing-x-small)",
              marginRight: "var(--sq-spacing-x-small)",
            }}
          />
        )}
        {children || placeholder}
        <IconView
          size="14px"
          icon="chevron_down"
          customCSS={{
            marginTop: "var(--sq-spacing-xxx-small)",
            marginLeft: "var(--sq-spacing-x-small)",
          }}
        />
      </ButtonView>
    );
  }
);

const DropdownItemDiv = styled("div")<Required<StyleProps>>`
  ${Styles.ItemDiv}
  ${(props) => props.customCSS}
`;

const ItemTitleContainerDiv = styled("div")`
  ${Styles.ItemTitleContainerDiv}
`;

const ItemSideDescriptionSpan = styled("span")`
  ${Styles.ItemSideDescriptionSpan}
`;

const ItemDescriptionP = styled("p")`
  ${Styles.ItemDescriptionP}
`;

const ItemView = React.forwardRef<React.ElementRef<"div">, DropdownItemProps>(
  (props, forwardedRef) => {
    const {
      onClick,
      children,
      checked,
      description,
      sideDescription,
      customCSS = {},
      ...rest
    } = props;

    return (
      <DropdownItemDiv
        onClick={onClick}
        {...rest}
        ref={forwardedRef}
        customCSS={customCSS}
      >
        <ItemTitleContainerDiv>
          {checked && <IconView icon="checkmark" size="18px" />}
          {children}
          {sideDescription && (
            <ItemSideDescriptionSpan>{sideDescription}</ItemSideDescriptionSpan>
          )}
        </ItemTitleContainerDiv>
        {description && <ItemDescriptionP>{description}</ItemDescriptionP>}
      </DropdownItemDiv>
    );
  }
);

const DropdownNamespace = Object.assign(Dropdown2View, {
  // SublistView: SublistView,
  ItemView: ItemView,
  HandleView: HandleView,
});

/**
 * @deprecated use {@link Dropdown2View} instead
 */
const DropdownNamespaceDeprecated = Object.assign(Dropdown2View, {
  // Sublist: SublistView,
  ItemView: ItemView,
  HandleView: HandleView,
});

export { DropdownNamespace as Dropdown2View };

/**
 * @deprecated use {@link Dropdown2View} instead
 */
export { DropdownNamespaceDeprecated as Dropdown };
