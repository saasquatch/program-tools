import * as React from "react";
import styled, { CSSProp, css } from "styled-components";
import { IconKey, IconView } from "../Icon";
import * as Styles from "./Styles";
import { ButtonType, ButtonView } from "../Button/Button";

type Dropdown2Props = OptionProps &
  StyleProps &
  Partial<React.ComponentProps<"div">>;

export interface OptionProps {
  /**
   * Display the open dropdown menu
   */
  showMenu?: boolean;
  /**
   * Show the menu able the handle instead of below
   */
  popUpwards?: boolean;
  /**
   *  Justification of dropdown menu
   */
  menuPosition?: "left" | "center" | "right";
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
  children?: string | React.ReactNode | React.ReactNode[];
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
  /**
   * Render the handle in the disabled (greyed out) state
   */
  disabled?: boolean;
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
    css`
      top: 0;
      transform: translateY(-100%);
    `}

  ${(props) => Styles.MenuPosition[props.menuPosition ?? "right"]}
`;

const EmptyTextSpan = styled("span")`
  ${Styles.EmptyTextSpan}
`;

const Dropdown2View = React.forwardRef<React.ElementRef<"div">, Dropdown2Props>(
  (props, forwardedRef) => {
    const {
      showMenu = false,
      popUpwards = false,
      menuPosition = "right",
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
          <DropdownContentDiv
            popUpwards={popUpwards}
            menuPosition={menuPosition}
          >
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
      disabled = false,
      customCSS = {},
      onClickDropdown,
      children,
      ...rest
    } = props;
    return (
      <ButtonView
        disabled={disabled}
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

const SublistDiv = styled("div")<Required<StyleProps>>`
  ${Styles.SublistDiv}
  ${(props) => props.customCSS}
`;

const DropdownSubItemDiv = styled("div")`
  ${Styles.SubItemDiv}
`;

const DropdownSublistDiv = styled("div")`
  ${Styles.DropdownSublistDiv}
`;

const SublistView = React.forwardRef<
  React.ElementRef<"div">,
  DropdownSublistProps
>((props, forwardedRef) => {
  const { name, children, customCSS = {}, ...rest } = props;

  return (
    <SublistDiv {...rest} ref={forwardedRef} customCSS={customCSS}>
      <DropdownSublistDiv>{name}</DropdownSublistDiv>
      <DropdownSubItemDiv>{children}</DropdownSubItemDiv>
    </SublistDiv>
  );
});

const DropdownNamespace = Object.assign(Dropdown2View, {
  SublistView: SublistView,
  ItemView: ItemView,
  HandleView: HandleView,
});

export { DropdownNamespace as Dropdown2View };
