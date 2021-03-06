import * as React from "react";
import styled from "styled-components";
import { CSSProperties, SyntheticEvent } from "react";

type Margin = "0 16px";

type FontWeight = "400" | "500" | "600" | "700";

interface TLSProps {
  margin?: Margin;
  blue?: boolean;
  icon?: string;
  inline?: boolean;
  orange?: boolean;
}

interface TLProps extends TLSProps {
  // See: https://github.com/typescript-cheatsheets/react#useful-react-prop-type-examples
  children: React.ReactNode;
  onClick: (e: SyntheticEvent) => Promise<void>;
  fontWeight?: FontWeight;
  top?: number;
  fontSize?: number;
  customStyle?: CSSProperties;
  disabled?: boolean;
  orange?: boolean;
  type?: "button" | "submit" | "reset";
}

interface IProps {
  fontWeight?: FontWeight;
  top?: number;
  fontSize?: number;
}

const ButtonDiv = styled.div`
  text-align: center;
  padding: 6px 0;
`;

const Icon = styled.i<IProps>`
  display: inline;
  text-decoration: none;
  font-family: "Helvetica Neue", Helvetica, sans-serif;
  color: #7c7c7c;
  font-size: ${(props) => (props.fontSize ? `${props.fontSize}px` : `16px`)};
  margin-right: 5px;
  font-weight: ${(props) => props.fontWeight};
  position: relative;
  top: ${(props) => `${props.top}px`};
  cursor: pointer;
`;

export const TextLinkStyle = styled.button<TLSProps>`
  font-family: "Helvetica Neue", Helvetica, sans-serif;
  padding: 0;
  border: none;
  font-size: ${(props) => (props.icon ? `14px` : `13px`)};
  margin: ${(props) => props.margin};
  background: transparent;
  outline: none;
  cursor: pointer;
  color: ${(props) =>
    props.disabled
      ? `#E2E2E2`
      : (props) =>
          props.blue
            ? `#0088cc`
            : (props) => (props.orange ? `#F5A841` : `#7C7C7C`)};
  font-weight: bold;
  text-decoration: none;
  ${(props) =>
    props.inline &&
    `line-height: 13px;
    padding: 0 5px;`}
  ${ButtonDiv} & {
    margin: ${(props) => (props.disabled ? "0" : "0 8px")};
  }
  &:focus {
    outline: none;
  }
`;

interface TLWProps {
  orange?: boolean;
  blue?: boolean;
  disabled?: boolean;
}

const TextLinkWrapper = styled.span<TLWProps>`
  cursor: pointer;
  &:hover ${Icon}, &:active ${Icon}, &:focus ${Icon} {
    text-decoration: none;
    color: ${(props) =>
      props.disabled
        ? `#E2E2E2`
        : (props) =>
            props.blue
              ? `#2f71a9`
              : (props) => (props.orange ? `#F5A841` : `#606060`)};
    outline: none;
  }
  // prettier-ignore
  &:hover ${TextLinkStyle}, &:active ${TextLinkStyle}, &:focus ${TextLinkStyle} {
    color: ${(props) =>
    props.disabled
      ? `#E2E2E2`
      : (props) =>
          props.blue
            ? `#2f71a9`
            : (props) => (props.orange ? `#F5A841` : `#606060`)};
    text-decoration: ${(props) => (props.disabled ? `none` : `underline`)};
    outline: none;
  }
`;

export const TextLink = ({
  children,
  icon,
  margin,
  blue,
  onClick,
  fontWeight,
  top,
  inline,
  fontSize,
  customStyle,
  disabled,
  orange,
  type,
}: TLProps) => {
  return (
    <TextLinkWrapper
      onClick={onClick}
      blue={blue}
      style={customStyle}
      disabled={disabled}
      orange={orange}
    >
      {icon && (
        <Icon
          className={icon}
          fontWeight={fontWeight}
          top={top}
          fontSize={fontSize}
        />
      )}
      <TextLinkStyle
        type={type ? type : "button"}
        margin={margin}
        blue={blue}
        icon={icon}
        inline={inline}
        disabled={disabled}
        orange={orange}
      >
        {children}
      </TextLinkStyle>
    </TextLinkWrapper>
  );
};
