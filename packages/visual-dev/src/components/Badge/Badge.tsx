import * as React from "react";
import styled, { CSSProp } from "styled-components";
import * as Styles from "./Styles";
import { IconKey, IconView } from "../Icon";

type BadgeProps = OptionProps &
  StyleProps &
  Partial<React.ComponentProps<"div">>;

export interface OptionProps {
  /**
   * Key of the icon to display in the badge
   */
  icon?: IconKey;
}

export interface StyleProps {
  /**
   * Badge variant, defines badge colour
   */
  status: "info" | "success" | "critical" | "warning";
  /**
   * Display the badge with the pill style with rounded sides
   */
  pill?: boolean;
  /**
   * Custom CSS applied to badge
   */
  customCSS?: CSSProp;
}

const BadgeDiv = styled.div<StyleProps>`
  ${Styles.base}
  ${(props) => Styles[props.status]}
  border-radius: ${(props) =>
    props.pill ? "var(--sq-spacing-xxx-large)" : "var(--sq-spacing-xx-small)"};
  ${(props) => props.customCSS}
`;

export const BadgeView = React.forwardRef<React.ElementRef<"div">, BadgeProps>(
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
      <BadgeDiv
        {...rest}
        status={status}
        pill={pill}
        ref={forwardedRef}
        customCSS={customCSS}
      >
        {icon && (
          <IconView
            icon={icon}
            color="inherit"
            size="var(--sq-icon-size-badge)"
            customCSS="+ span { margin-left: var(--sq-spacing-x-small); }"
          />
        )}
        {children && <span>{children}</span>}
      </BadgeDiv>
    );
  }
);

/**
 * @deprecated use {@link BadgeView} instead
 */
export const Badge = BadgeView;
