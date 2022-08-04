import * as React from "react";
import styled, { CSSProp } from "styled-components";
import { IconKey, IconView } from "../Icon";
import { chevron_down, chevron_up } from "../Icon/SVGs";
import * as Styles from "./Styles";

type DropdownProps = OptionProps &
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
   * Pill styled handle with rounded sides
   */
  pill?: boolean;
  /**
   * Center align text in the handle
   */
  center?: boolean;
  /**
   * Make the handle vertically narrow
   */
  narrow?: boolean;
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

interface ButtonProps {
  pill?: boolean;
  center?: boolean;
  narrow?: boolean;
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
   * Secondary item description that appears tot the right of the item's child
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

const DropdownDiv = styled("div")<Required<StyleProps>>`
  ${Styles.DropdownDiv}
  ${(props) => props.customCSS}
`;

const DropdownButtonDiv = styled("div")<
  Required<
    ButtonProps & {
      showMenu: boolean;
      popUpwards: boolean;
      borderRadius: string;
    }
  >
>`
  ${Styles.ButtonDiv}
  border-radius: ${(props) =>
    props.pill
      ? "var(--sq-border-radius-pill)"
      : "var(--sq-border-radius-normal)"};
  text-align: ${(props) => (props.center ? "center" : "left")};
  line-height: ${(props) => (props.narrow ? "10px" : "16px")};
  color: ${(props) =>
    props.disabled ? "var(--sq-text-subdued)" : "var(--sq-text-on-secondary)"};
  background: ${(props) => (props.disabled ? "#e5e5e5" : "var(--sq-surface)")};
  ${(props) =>
    !props.disabled &&
    props.showMenu &&
    "border-color: var(--sq-text-interactive);"}
  ${(props) =>
    props.showMenu &&
    (props.popUpwards ? "border-top: none;" : "border-bottom: none;")}
  ${(props) => `border-radius: ${props.borderRadius};`}
  &:hover {
    ${(props) => props.disabled && "cursor: not-allowed;"};
  }
`;

const DropdownContentDiv = styled("div")<
  Pick<DropdownProps, "pill" | "popUpwards"> & { borderRadius: string }
>`
  ${Styles.ContentDiv}
  border-radius: ${(props) => props.borderRadius};

  ${(props) =>
    props.popUpwards
      ? `top: 0; transform: translateY(-100%); border-bottom: none;`
      : `border-top: none`}
`;

const DropdownItemDiv = styled("div")<Required<StyleProps>>`
  ${Styles.ItemDiv}
  ${(props) => props.customCSS}
`;

const SublistDiv = styled("div")<Required<StyleProps>>`
  ${Styles.SublistDiv}
  ${(props) => props.customCSS}
`;

const DropdownSubItemDiv = styled("div")`
  ${Styles.subitem}
`;

const DropdownSublistDiv = styled("div")`
  ${Styles.DropdownSublistDiv}
`;

const ArrowStyleSpan = styled("span")`
  ${Styles.arrow}
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

const PlaceHolderSpan = styled("span")`
  ${Styles.PlaceHolderSpan}
`;

const EmptyTextSpan = styled("span")`
  ${Styles.EmptyTextSpan}
`;

const borderPresets = {
  pill: {
    top: {
      open: "var(--sq-border-radius-pill) var(--sq-border-radius-pill) 0 0",
      closed: "var(--sq-border-radius-pill)",
    },
    bottom: {
      open: "0 0 var(--sq-border-radius-pill) var(--sq-border-radius-pill)",
      closed: "var(--sq-border-radius-pill)",
    },
  },
  normal: {
    top: {
      open: "var(--sq-border-radius-normal) var(--sq-border-radius-normal) 0 0",
      closed: "var(--sq-border-radius-normal)",
    },
    bottom: {
      open: "0 0 var(--sq-border-radius-normal) var(--sq-border-radius-normal)",
      closed: "var(--sq-border-radius-normal)",
    },
  },
};

const DropdownView = React.forwardRef<React.ElementRef<"div">, DropdownProps>(
  (props, forwardedRef) => {
    const {
      text = "",
      showMenu = false,
      pill = false,
      center = false,
      narrow = false,
      disabled = false,
      popUpwards = false,
      icon,
      onClickDropdown,
      children,
      placeholder,
      emptyText,
      customCSS: customCSS = {},
      ...rest
    } = props;

    console.log(children);
    console.log(emptyText);

    return (
      <DropdownDiv {...rest} ref={forwardedRef} customCSS={customCSS}>
        <DropdownButtonDiv
          pill={pill}
          center={center}
          narrow={narrow}
          disabled={disabled}
          onClick={onClickDropdown}
          showMenu={!disabled && showMenu}
          popUpwards={popUpwards}
          borderRadius={
            borderPresets[pill ? "pill" : "normal"][
              popUpwards ? "bottom" : "top"
            ][showMenu ? "open" : "closed"]
          }
        >
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
          {text || <PlaceHolderSpan>{placeholder}</PlaceHolderSpan>}
          <ArrowStyleSpan>
            {showMenu ? chevron_up : chevron_down}
          </ArrowStyleSpan>
        </DropdownButtonDiv>
        {showMenu && (
          <DropdownContentDiv
            popUpwards={popUpwards}
            borderRadius={
              borderPresets[pill ? "pill" : "normal"][
                popUpwards ? "top" : "bottom"
              ][showMenu ? "open" : "closed"]
            }
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

const DropdownNamespace = Object.assign(DropdownView, {
  SublistView: SublistView,
  ItemView: ItemView,
});

/**
 * @deprecated use {@link DropdownView} instead
 */
const DropdownNamespaceDeprecated = Object.assign(DropdownView, {
  Sublist: SublistView,
  Item: ItemView,
});

export { DropdownNamespace as DropdownView };

/**
 * @deprecated use {@link DropdownView} instead
 */
export { DropdownNamespaceDeprecated as Dropdown };
