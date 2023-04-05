import { h, VNode } from "@stencil/core";
import { Spacing } from "../../global/mixins";
import { createStyleSheet } from "../../styling/JSS";

export interface ReferralCardViewProps {
  verticalAlignment: "start" | "center" | "end";
  slots: {
    left: VNode;
    right: VNode;
    header: VNode;
    footer: VNode;
  };
}
const style = {
  Container: {
    border: "1px solid var(--sl-color-neutral-300)",
    borderRadius: "var(--sl-border-radius-large)",
    color: "var(--sl-color-neutral-900)",
    background: "var(--sl-color-neutral-0)",
  },
  EndContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "0 var(--sl-spacing-large)",
  },
  ColumnContainer: {
    "& p": { margin: "0" },
    display: "flex",

    "& .left": {
      boxSizing: "border-box",
      width: "50%",
      padding: "var(--sl-spacing-large)",
      paddingRight: "var(--sl-spacing-medium)",
      "@media (max-width: 499px)": {
        width: "100%",
        // padding: "0",
        // marginBottom: "var(--sl-spacing-large)",
      },
    },
    "& .right": {
      boxSizing: "border-box",
      width: "50%",
      padding: "var(--sl-spacing-large)",
      paddingLeft: "var(--sl-spacing-medium)",
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
    <div part="sqm-referral-card-container" class={sheet.classes.Container}>
      <style type="text/css">
        {styleString}
        {vanillaStyle}
      </style>
      <div class={sheet.classes.EndContainer}>{props.slots.header}</div>
      <div part="sqm-columns" class={sheet.classes.ColumnContainer}>
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
