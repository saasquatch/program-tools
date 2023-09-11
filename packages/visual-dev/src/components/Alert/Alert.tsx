import * as React from "react";
import styled, { CSSProp } from "styled-components";
import { IconView } from "../Icon";
import * as Styles from "./Styles";

export type AlertProps = OptionProps &
  StyleProps &
  Partial<React.ComponentProps<"div">>;

export interface OptionProps {
  /**
   * Title displayed at top of alert
   */
  title?: string | React.ReactNode;
  /**
   * Content displayed inside alert below title
   */
  children: React.ReactNode;

  /**
   * Slot to overwrite the existing default icons
   */
  iconSlot?: React.ReactNode;
}

export interface StyleProps {
  /**
   * Alert type that affects border, background, and text colours
   */
  type:
    | "default_style"
    | "critical"
    | "warning"
    | "success"
    | "info"
    | "textWarning"
    | "textCritical";
  /**
   * Custom CSS applied to alert
   */
  customCSS?: CSSProp;
}

const AlertDiv = styled.div<Required<StyleProps>>`
  ${Styles.AlertDiv}
  ${props => Styles[props.type]}
  ${props => props.customCSS}
`;

const icons = {
  default_style: <IconView icon={"help"} color="var(--sq-text)" size="23px" />,
  critical: (
    <IconView icon={"alert"} color="var(--sq-surface-critical)" size="23px" />
  ),
  textCritical: (
    <IconView
      icon={"alert_alt"}
      color="var(--sq-surface-critical)"
      size="23px"
    />
  ),
  warning: (
    <IconView icon={"alert"} color="var(--sq-surface-warning)" size="23px" />
  ),
  textWarning: (
    <IconView
      icon={"alert_alt"}
      color="var(--sq-surface-warning)"
      size="23px"
    />
  ),
  success: (
    <IconView
      icon={"checkmark_circle"}
      color="var(--sq-surface-success)"
      size="23px"
    />
  ),
  info: <IconView icon={"help"} color="var(--sq-on-surface-info)" size="23px" />
};

export const AlertView = React.forwardRef<React.ElementRef<"div">, AlertProps>(
  (props, forwardedRef) => {
    const {
      type: variant,
      iconSlot,
      title,
      children,
      customCSS = {},
      ...rest
    } = props;
    const textBannerWithNoTitle =
      (!title && variant === "textWarning") ||
      variant === "textCritical" ||
      !title;
    return (
      <AlertDiv
        {...rest}
        type={variant}
        ref={forwardedRef}
        customCSS={customCSS}
      >
        {iconSlot ? iconSlot : icons[variant]}
        <div>
          <strong>{title}</strong>
          <div
            style={{
              paddingTop: textBannerWithNoTitle
                ? "var(--sq-spacing-xxx-small)"
                : "0px",
            }}
          >
            {children}
          </div>
        </div>
      </AlertDiv>
    );
  }
);

/**
 * @deprecated use {@link AlertView} instead
 */
export const Alert = AlertView;
