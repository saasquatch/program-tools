import * as React from "react";
import styled, { CSSProp } from "styled-components";
import { IconKey, Icon } from "../Icon";
import { chevron_down, chevron_up } from "../Icon/SVGs";
import * as Styles from "./Styles";

type DropdownProps = OptionProps &
  StyleProps &
  Omit<React.ComponentProps<"div">, "translate" | "css">;

export interface OptionProps {
  text?: string;
  showMenu?: boolean;
  pill?: boolean;
  center?: boolean;
  narrow?: boolean;
  disabled?: boolean;
  icon?: IconKey;
  popUpwards?: boolean;
  onClickDropdown?: () => void;
  children?: React.ReactNode;
}

interface ButtonProps {
  pill?: boolean;
  center?: boolean;
  narrow?: boolean;
  disabled?: boolean;
}

interface DropdownItemProps {
  onClick?: () => void;
  customCSS?: CSSProp;
  children?: React.ReactNode;
}

interface DropdownSublistProps {
  name: string;
  customCSS?: CSSProp;
  children: React.ReactNode;
}

export interface StyleProps {
  customCSS?: CSSProp;
}

const DropdownContainer = styled("div")<Required<StyleProps>>`
  ${Styles.base}
  ${(props) => props.customCSS}
`;

const DropdownButton = styled("div")<Required<ButtonProps>>`
  ${Styles.button}
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
const DropdownContent = styled("div")<
  Pick<DropdownProps, "pill" | "popUpwards">
>`
  ${Styles.content}
  border-radius: ${(props) => (props.pill ? "20px" : "4px")};

  ${(props) =>
    props.popUpwards
      ? `margin-bottom: var(--sq-spacing-x-small); top: 0; transform: translateY(-100%) translateY(calc(var(--sq-spacing-x-small) * -1)); ;`
      : "margin-top: var(--sq-spacing-x-small);"}
`;

const DropdownItemStyle = styled("div")<Required<StyleProps>>`
  ${Styles.item}
  ${(props) => props.customCSS}
`;

const SublistContent = styled("div")<Required<StyleProps>>`
  ${Styles.subcontent}
  ${(props) => props.customCSS}
`;

const DropdownSubItemStyle = styled("div")`
  ${Styles.subitem}
`;

const DropdownSublistStyle = styled("div")`
  ${Styles.sublist}
`;

const ArrowStyle = styled("span")`
  ${Styles.arrow}
`;

export const Dropdown = React.forwardRef<
  React.ElementRef<"div">,
  DropdownProps
>((props, forwardedRef) => {
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
    <DropdownContainer {...rest} ref={forwardedRef} customCSS={customCSS}>
      <DropdownButton
        pill={pill}
        center={center}
        narrow={narrow}
        disabled={disabled}
        onClick={onClickDropdown}
      >
        {icon && (
          <Icon
            color="inherit"
            size="16px"
            icon={icon}
            style={{ margin: -3, top: 2.5, marginRight: "8px" }}
          />
        )}
        {text} <ArrowStyle>{showMenu ? chevron_up : chevron_down}</ArrowStyle>
      </DropdownButton>
      {showMenu && (
        <DropdownContent pill={pill} popUpwards={popUpwards}>
          {children}
        </DropdownContent>
      )}
    </DropdownContainer>
  );
});

export const DropdownItem = React.forwardRef<
  React.ElementRef<"div">,
  DropdownItemProps
>((props, forwardedRef) => {
  const { onClick, children, customCSS = {}, ...rest } = props;

  return (
    <DropdownItemStyle
      onClick={onClick}
      {...rest}
      ref={forwardedRef}
      customCSS={customCSS}
    >
      {children}
    </DropdownItemStyle>
  );
});

export const DropdownSublist = React.forwardRef<
  React.ElementRef<"div">,
  DropdownSublistProps
>((props, forwardedRef) => {
  const { name, children, customCSS = {}, ...rest } = props;

  return (
    <SublistContent {...rest} ref={forwardedRef} customCSS={customCSS}>
      <DropdownSublistStyle>{name}</DropdownSublistStyle>
      <DropdownSubItemStyle>{children}</DropdownSubItemStyle>
    </SublistContent>
  );
});
