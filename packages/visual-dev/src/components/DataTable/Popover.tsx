import * as React from "react";
import styled, { CSSProp } from "styled-components";
import { IconKey, Icon } from "../Icon";

type PopoverProps = OptionProps &
  StyleProps &
  Omit<React.ComponentProps<"div">, "translate"|"css">;

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
  padding: 8px 12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: inline-flex;
  align-items: center;
  `
      : `
  min-width: 252px;
  max-width: 368px;
  padding: 16px 36px;
  word-wrap: break-word;
  display: inline-block;
  align-items: center;
  `}

  background: #ffffff;
  border: 1px solid #e2e2e2;
  box-sizing: border-box;
  box-shadow: 3px 3px 7px rgba(0, 0, 0, 0.08);
  border-radius: 10px;
  div + div.action {
    margin-top: 10px;
  }
  ${(props) => props.customCSS}
`;

export const Popover = React.forwardRef<React.ElementRef<"div">, PopoverProps>(
  (props, forwardedRef) => {
    const { icon, notification = false, children, customCSS = {}, ...rest } = props;

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
  white-space: inherit;
  overflow: inherit;
  text-overflow: inherit;
  font-family: Helvetica;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  color: #575757;
  ${(props) => props.customCSS}
`;

export const Action = React.forwardRef<React.ElementRef<"div">, PopoverProps>(
  (props, forwardedRef) => {
    const { children, customCSS = {}, ...rest } = props;

    return (
      <ActionDiv className="action" {...rest} ref={forwardedRef} customCSS={customCSS}>
        {children}
      </ActionDiv>
    );
  }
);

const DividerDiv = styled.div<Required<StyleProps>>`
  height: 1px;
  margin: 16px -36px;
  background: #e2e2e2;
  ${(props) => props.customCSS}
`;

export const Divider = React.forwardRef<React.ElementRef<"div">, PopoverProps>(
  (props, forwardedRef) => {
    const { children, customCSS = {}, ...rest } = props;

    return <DividerDiv {...rest} ref={forwardedRef} customCSS={customCSS} />;
  }
);
