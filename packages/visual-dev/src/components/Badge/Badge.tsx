import * as React from "react";
import styled, { CSSProp } from "styled-components";
import * as Styles from "./Styles";
import { IconKey, Icon } from "../Icon";

type BadgeProps = OptionProps &
  StyleProps &
  Omit<React.ComponentProps<"div">, "translate" | "css">;

export interface OptionProps {
  /**
   * Icon included in badge
   */
  icon?: IconKey;
}

export interface StyleProps {
  /**
   * Badge variant
   */
  status: "info" | "success" | "critical" | "warning";
  /**
   * Pill style badge
   */
  pill?: boolean;
  /**
   * Custom CSS applied to badge
   */
  customCSS?: CSSProp;
}

const BadgeStyled = styled.div<StyleProps>`
  ${Styles.base}
  ${(props) => Styles[props.status]}
  padding: ${(props) =>
    props.pill
      ? "var(--sq-spacing-xx-small) var(--sq-spacing-large)"
      : "var(--sq-spacing-xx-small) 12px"};
  border-radius: ${(props) =>
    props.pill ? "var(--sq-spacing-xxx-large)" : "var(--sq-spacing-xx-small)"};
  ${(props) => props.customCSS}
`;

export const Badge = React.forwardRef<React.ElementRef<"div">, BadgeProps>(
  (props, forwardedRef) => {
    const {
      status,
      pill = false,
      icon,
      children,
      customCSS = {},
      ...rest
    } = props;

    return (
      <BadgeStyled
        {...rest}
        status={status}
        pill={pill}
        ref={forwardedRef}
        customCSS={customCSS}
      >
        {icon && (
          <Icon
            icon={icon}
            color="inherit"
            size="var(--sq-icon-size-badge)"
            style={{ margin: -2 }}
            customCSS="+ span { margin-left: 5px; }"
          />
        )}
        {children && <span>{children}</span>}
      </BadgeStyled>
    );
  }
);
