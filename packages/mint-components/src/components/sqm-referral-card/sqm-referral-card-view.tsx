import { h, VNode } from "@stencil/core";
import { Spacing } from "../../global/mixins";
import { createStyleSheet } from "../../styling/JSS";

export interface ReferralCardViewProps {
  padding: Spacing;
  verticalAlignment: "start" | "center" | "end";
  slots: {
    left: VNode;
    right: VNode;
  };
}

export function ReferralCardView(props: ReferralCardViewProps) {
  const style = {
    Container: {
      display: "flex",
      color: "var(--sl-color-neutral-900)",
      background: "var(--sl-color-neutral-0)",
      "& .left": {
        width: "50%",
        padding: "var(--sl-spacing-" + props.padding + ")",
        paddingRight: "var(--sl-spacing-medium)",
        alignSelf: props.verticalAlignment,
        "@media (max-width: 499px)": {
          width: "100%",
          padding: "0",
          marginBottom: "var(--sl-spacing-xx-large)",
        },
      },
      "& .right": {
        width: "50%",
        padding: "var(--sl-spacing-" + props.padding + ")",
        paddingLeft: "var(--sl-spacing-medium)",
        alignSelf: props.verticalAlignment,
        "@media (max-width: 499px)": {
          width: "100%",
          padding: "0",
        },
      },
      border: "1px solid var(--sl-color-neutral-300)",
      borderRadius: "var(--sl-border-radius-large)",
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

  return (
    <div>
      <style type="text/css">
        {styleString}
        {vanillaStyle}
      </style>
      <div class={sheet.classes.Container}>
        <div class="left">{props.slots.left}</div>
        <div class="right">{props.slots.right}</div>
      </div>
    </div>
  );
}
