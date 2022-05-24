import * as React from "react";
import styled, { CSSProp } from "styled-components";
import { IconKey, IconView } from "../Icon";
import { chevron_down, chevron_up } from "../Icon/SVGs";
import * as Styles from "./Styles";

type DropdownProps = OptionProps &
  StyleProps &
  Omit<React.ComponentProps<"div">, "translate" | "css">;

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

const DropdownButtonDiv = styled("div")<Required<ButtonProps>>`
  ${Styles.ButtonDiv}
  border-radius: ${(props) => (props.pill ? "100px" : "4px")};
  text-align: ${(props) => (props.center ? "center" : "left")};
  line-height: ${(props) => (props.narrow ? "10px" : "16px")};
  color: ${(props) =>
    props.disabled
      ? "var(--sq-action-secondary-border)"
      : "var(--sq-text-on-secondary)"};
  background: ${(props) =>
    props.disabled ? "var(--sq-surface-subdued)" : "var(--sq-surface)"};
  &:hover {
    ${(props) =>
      !props.disabled &&
      "box-shadow: inset 0 0 0 1px var(--sq-action-secondary-hovered);"}
    ${(props) => props.disabled && "cursor: not-allowed;"};
  }
`;
const DropdownContentDiv = styled("div")<
  Pick<DropdownProps, "pill" | "popUpwards">
>`
  ${Styles.ContentDiv}
  border-radius: ${(props) => (props.pill ? "20px" : "4px")};

  ${(props) =>
    props.popUpwards
      ? `margin-bottom: var(--sq-spacing-x-small); top: 0; transform: translateY(-100%) translateY(calc(var(--sq-spacing-x-small) * -1)); ;`
      : "margin-top: var(--sq-spacing-x-small);"}
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
      customCSS: customCSS = {},
      ...rest
    } = props;

    return (
      <DropdownDiv {...rest} ref={forwardedRef} customCSS={customCSS}>
        <DropdownButtonDiv
          pill={pill}
          center={center}
          narrow={narrow}
          disabled={disabled}
          onClick={onClickDropdown}
        >
          {icon && (
            <IconView
              color="inherit"
              size="16px"
              icon={icon}
              style={{ margin: -3, top: 2.5, marginRight: "8px" }}
            />
          )}
          {text}{" "}
          <ArrowStyleSpan>
            {showMenu ? chevron_up : chevron_down}
          </ArrowStyleSpan>
        </DropdownButtonDiv>
        {showMenu && (
          <DropdownContentDiv pill={pill} popUpwards={popUpwards}>
            {children}
          </DropdownContentDiv>
        )}
      </DropdownDiv>
    );
  }
);

const ItemView = React.forwardRef<React.ElementRef<"div">, DropdownItemProps>(
  (props, forwardedRef) => {
    const { onClick, children, customCSS = {}, ...rest } = props;

    return (
      <DropdownItemDiv
        onClick={onClick}
        {...rest}
        ref={forwardedRef}
        customCSS={customCSS}
      >
        {children}
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
