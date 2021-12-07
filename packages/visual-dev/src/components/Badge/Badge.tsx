import * as React from "react";
import styled, { CSSProp } from "styled-components";
import * as Styles from "./Styles";
import { IconKey, Icon } from "../Icon";

type BadgeProps = OptionProps &
  StyleProps &
  Omit<React.ComponentProps<"div">, "translate">;

export interface OptionProps {
  icon?: IconKey;
}

export interface StyleProps {
  status: "info" | "success" | "critical" | "warning";
  pill?: boolean;
  css?: CSSProp;
}

const BadgeStyled = styled.div<StyleProps>`
  ${Styles.base}
  ${(props) => Styles[props.status]}
  padding: ${(props) => (props.pill ? "4px 20px" : "4px 12px")};
  border-radius: ${(props) => (props.pill ? "50px" : "4px")};
  ${(props) => props.css}
`;

export const Badge = React.forwardRef<React.ElementRef<"div">, BadgeProps>(
  (props, forwardedRef) => {
    const { status, pill = false, icon, children, css = {}, ...rest } = props;

    return (
      <BadgeStyled
        {...rest}
        status={status}
        pill={pill}
        ref={forwardedRef}
        css={css}
      >
        {icon && (
          <Icon
            icon={icon}
            color="inherit"
            size="var(--sq-icon-size-badge)"
            style={{ margin: -2 }}
            css="+ span { margin-left: 5px; }"
          />
        )}
        {children && <span>{children}</span>}
      </BadgeStyled>
    );
  }
);
