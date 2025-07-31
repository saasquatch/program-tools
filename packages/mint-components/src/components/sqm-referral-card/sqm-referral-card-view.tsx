import { h, VNode } from "@stencil/core";
import { createStyleSheet } from "../../styling/JSS";

export interface ReferralCardViewProps {
  verticalAlignment: "start" | "center" | "end";
  hideBorder?: boolean;
  borderColor?: string;
  borderRadius?: number;
  textColor?: string;
  backgroundColor?: string;
  slots: {
    left: VNode;
    right: VNode;
    header: VNode;
    footer: VNode;
  };
  paddingTop?: string;
  paddingRight?: string;
  paddingBottom?: string;
  paddingLeft?: string;
  limitWidth?: boolean;
  hasHeader: boolean;
  hasFooter: boolean;
}

const vanillaStyle = `
    :host{
      display: block;   
    }
  `;

export function ReferralCardView(props: ReferralCardViewProps) {
  const style = {
    Container: {
      borderRadius: props.borderRadius || "var(--sqm-border-radius-normal)",
      color: props.textColor || "var(--sqm-text)",
      background: props.backgroundColor || "var(--sqm-portal-background)",
      display: "flex",
      flexDirection: "column",
      rowGap: "var(--sl-spacing-large)",
    },
    EndContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    ColumnContainer: {
      "& p": { margin: "0" },
      display: "grid",
      gridAutoColumns: "minmax(0, 1fr)",
      gridAutoFlow: "column",
      gap: "calc(2 * var(--sl-spacing-medium))",

      "@media (max-width: 499px)": {
        gridAutoFlow: "unset",
        gridAutoColumns: "unset",
        gridTemplateColumns: "1fr",
        border: "none",
      },
    },
  };

  const sheet = createStyleSheet(style);
  const styleString = sheet.toString();

  const borderColor = props.borderColor || "var(--sqm-border-color)";
  return (
    <div
      part="sqm-base"
      class={sheet.classes.Container}
      style={{
        border: `${
          props.hideBorder
            ? "none"
            : `var(--sqm-border-thickness) solid ${borderColor}`
        }`,

        "padding-top": `var(--sl-spacing-${props.paddingTop})`,
        "padding-right": `var(--sl-spacing-${props.paddingRight})`,
        "padding-bottom": `var(--sl-spacing-${props.paddingBottom})`,
        "padding-left": `var(--sl-spacing-${props.paddingLeft})`,
        backgroundColor: props.backgroundColor,
        maxWidth: `${props.limitWidth ? "600px" : "none"}`,
        margin: `${props.limitWidth ? "auto" : "none"}`,
      }}
    >
      <style type="text/css">
        {styleString}
        {vanillaStyle}
      </style>
      {props.hasHeader && (
        <div class={sheet.classes.EndContainer}>{props.slots.header}</div>
      )}
      <div
        part="sqm-column-container"
        class={sheet.classes.ColumnContainer}
        style={{
          alignItems: props.verticalAlignment,
        }}
      >
        {props.slots.left}

        {props.slots.right}
      </div>
      {props.hasFooter && (
        <div class={sheet.classes.EndContainer}>{props.slots.footer}</div>
      )}
    </div>
  );
}
