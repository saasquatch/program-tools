import * as React from "react";
import styled, { CSSProp } from "styled-components";
import { IconKey, Icon } from "../Icon";
import * as Styles from "./Styles";

type PopoverProps = OptionProps &
  StyleProps &
  Omit<React.ComponentProps<"div">, "translate" | "css">;

interface OptionProps {
  notification?: boolean;
  icon?: IconKey;
  children?: any;
}

interface StyleProps {
  customCSS?: CSSProp;
}

const PopoverDiv = styled.div<Required<StyleProps> & { notification: boolean }>`
  ${(props) =>
    props.notification
      ? `
  min-width: 182px;
  max-width: 255px;
  padding: var(--sq-spacing-x-small) var(--sq-spacing-small);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: inline-flex;
  align-items: center;
  `
      : `
  min-width: 252px;
  max-width: 368px;
  padding: var(--sq-spacing-medium) var(--sq-spacing-xx-large);
  word-wrap: break-word;
  display: inline-block;
  align-items: center;
  `}

  ${Styles.PopoverActionDiv}
  ${(props) => props.customCSS}
`;

export const Popover = React.forwardRef<React.ElementRef<"div">, PopoverProps>(
  (props, forwardedRef) => {
    const {
      icon,
      notification = false,
      children,
      customCSS = {},
      ...rest
    } = props;

    return (
      <PopoverDiv
        notification={notification}
        {...rest}
        ref={forwardedRef}
        customCSS={customCSS}
      >
        {icon ? (
          <span style={{ height: "100%" }}>
            <Icon
              size="20px"
              customCSS="float: left; margin-right: 5px; "
              icon={icon}
            />
          </span>
        ) : (
          ""
        )}
        {children}
      </PopoverDiv>
    );
  }
);

const ActionDiv = styled.div<Required<StyleProps>>`
  ${(props) => props.customCSS}
`;

export const Action = React.forwardRef<React.ElementRef<"div">, PopoverProps>(
  (props, forwardedRef) => {
    const { children, customCSS = {}, ...rest } = props;

    return (
      <ActionDiv
        {...rest}
        className="action"
        ref={forwardedRef}
        customCSS={customCSS}
      >
        {children}
      </ActionDiv>
    );
  }
);

const DividerDiv = styled.div<Required<StyleProps>>`
  ${Styles.PopoverDividerDiv}
  ${(props) => props.customCSS}
`;

export const Divider = React.forwardRef<React.ElementRef<"div">, PopoverProps>(
  (props, forwardedRef) => {
    const { children, customCSS = {}, ...rest } = props;

    return <DividerDiv {...rest} ref={forwardedRef} customCSS={customCSS} />;
  }
);
