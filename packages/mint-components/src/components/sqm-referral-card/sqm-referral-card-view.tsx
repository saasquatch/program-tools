import { h, VNode } from "@stencil/core";
import { Spacing } from "../../global/mixins";
import { createStyleSheet } from "../../styling/JSS";

export interface ReferralCardViewProps {
  verticalAlignment: "start" | "center" | "end";
  removeBorder?: boolean;
  backgroundColor: string;
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
}
const style = {
  Container: {
    borderRadius: "var(--sl-border-radius-large)",
    color: "var(--sl-color-neutral-900)",
    background: "var(--sl-color-neutral-0)",
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
    display: "flex",
    columnGap: "calc(2 * var(--sl-spacing-medium))",

    "& .left": {
      boxSizing: "border-box",
      width: "50%",
      "@media (max-width: 499px)": {
        width: "100%",
        // padding: "0",
        // marginBottom: "var(--sl-spacing-large)",
      },
    },
    "& .right": {
      boxSizing: "border-box",
      width: "50%",
      "@media (max-width: 499px)": {
        width: "100%",
        // padding: "0",
      },
    },

    "@media (max-width: 499px)": {
      flexDirection: "column",
      border: "none",
    },
  },
};

const sheet = createStyleSheet(style);
const styleString = sheet.toString();

const vanillaStyle = `
    :host{
      display: block;   
    }
  `;

export function ReferralCardView(props: ReferralCardViewProps) {
  return (
    <div
      part="sqm-base"
      class={sheet.classes.Container}
      style={{
        border: `${
          props.removeBorder ? "none" : "1px solid var(--sl-color-neutral-300)"
        }`,
        "padding-top": `var(--sl-spacing-${props.paddingTop})`,
        "padding-right": `var(--sl-spacing-${props.paddingRight})`,
        "padding-bottom": `var(--sl-spacing-${props.paddingBottom})`,
        "padding-left": `var(--sl-spacing-${props.paddingLeft})`,
        backgroundColor: props.backgroundColor,
      }}
    >
      <style type="text/css">
        {styleString}
        {vanillaStyle}
      </style>
      <div class={sheet.classes.EndContainer}>{props.slots.header}</div>
      <div part="sqm-column-container" class={sheet.classes.ColumnContainer}>
        <div
          class="left"
          style={{
            alignSelf: props.verticalAlignment,
          }}
        >
          {props.slots.left}
        </div>
        <div
          class="right"
          style={{
            alignSelf: props.verticalAlignment,
          }}
        >
          {props.slots.right}
        </div>
      </div>
      <div class={sheet.classes.EndContainer}>{props.slots.footer}</div>
    </div>
  );
}
