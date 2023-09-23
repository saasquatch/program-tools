import * as React from "react";
import styled, { CSSProp } from "styled-components";
import * as Styles from "./Styles";
import { IconView } from "../Icon";

type StatusProps = OptionProps &
  StyleProps &
  Partial<React.ComponentProps<"div">>;

export interface OptionProps {
  /**
   * Optional icon slot
   */
  iconSlot?: React.ReactNode;
  /**
   * Optional status text
   */
  statusText?: string;
  /**
   * Optional description text
   */
  descriptionText?: string;
}

export interface StyleProps {
  /**
   * Status variant, defines icon
   */
  status:
    | "approved"
    | "pending"
    | "declined"
    | "counter"
    | "redeemed"
    | "invalid";
  /**
   * Custom CSS applied to badge
   */
  customCSS?: CSSProp;
}

const getIcon = (status: StyleProps["status"]) => {
  switch (status) {
    case "approved":
      return {
        text: "Approved",
        icon: "checkmark_circle_filled",
        iconColor: "var(--sq-surface-success)",
      };
    case "pending":
      return {
        text: "Pending",
        icon: "pending",
        iconColor: "var(--iui-serenity-gray)",
      };
    case "declined":
      return {
        text: "Declined",
        icon: "declined",
        iconColor: "var(--sq-surface-critical)",
      };

    case "counter":
      return {
        text: "Counter",
        icon: "counter",
        iconColor: "var(--sq-icon-warning)",
      };

    case "redeemed":
      return {
        text: "Redeemed",
        icon: "redeemed",
        iconColor: "var(--sq-focused)",
      };
    case "invalid":
      return {
        text: "Invalid",
        icon: "alert_alt",
        iconColor: "var(--sq-decorative-orange)",
      };
  }
};

const StatusDiv = styled.div<StyleProps>`
  ${Styles.base}

  ${(props: any) => props.customCSS}
`;

const IconDiv = styled.div`
  ${Styles.iconContainer}
`;

const StatusTextP = styled.p`
  ${Styles.statusText}
`;

const DescriptionTextP = styled.p`
  ${Styles.descriptionText}
`;

export const StatusView = React.forwardRef<
  React.ElementRef<"div">,
  StatusProps
>((props, forwardedRef) => {
  const {
    status,
    customCSS = {},
    iconSlot,
    descriptionText,
    statusText,
    ...rest
  } = props;

  const { text, icon, iconColor } = getIcon(status);

  return (
    <StatusDiv
      {...rest}
      status={status}
      ref={forwardedRef}
      customCSS={customCSS}
    >
      <IconDiv>
        {/* @ts-ignore */}
        {iconSlot ? iconSlot : <IconView icon={icon} color={iconColor} />}
        <StatusTextP>{statusText ? statusText : text}</StatusTextP>
      </IconDiv>
      {descriptionText && (
        <DescriptionTextP>{descriptionText}</DescriptionTextP>
      )}
    </StatusDiv>
  );
});
