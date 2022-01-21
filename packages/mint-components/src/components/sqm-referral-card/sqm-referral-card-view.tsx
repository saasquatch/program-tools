import { h, VNode } from "@stencil/core";
import { Spacing } from "../../global/mixins";
import { createStyleSheet } from "../../styling/JSS";

export interface ReferralCardViewProps {
  header: string;
  description: string;
  padding: Spacing;
  verticalAlignment: "top" | "center";
  slots: { left: VNode; right: VNode };
}

export function ReferralCardView(
  props: ReferralCardViewProps,
  children: VNode
) {
  const style = {
    Container: {
      display: "flex",

      "& .left": {
        width: "50%",
        padding: "var(--sl-spacing-" + props.padding + ")",
      },
      "& .right": {
        width: "50%",
        padding: "var(--sl-spacing-" + props.padding + ")",
      },
      border: "1px solid var(--sl-color-neutral-300)",
      borderRadius: "var(--sl-border-radius-large)",
    },

    Text: {
      textAlign: "center",
      marginBottom: "var(--sl-spacing-large)",
      "& .header": {
        fontSize: "var(--sl-font-size-large)",
        fontWeight: "var(--sl-font-weight-semibold)",
        color: "var(--sl-color-neutral-900)",
      },
      "& .description": {
        color: "var(--sl-color-neutral-600)",
      },
    },
  };

  const sheet = createStyleSheet(style);
  const styleString = sheet.toString();

  console.log(props);

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
      <div class={sheet.classes.Text}>
        <div class="header">{props.header}</div>
        <div class="description">{props.description}</div>
      </div>
      <div class={sheet.classes.Container}>
        <div class="left">{props.slots.left}</div>
        <div class="right">{props.slots.right}</div>
      </div>
    </div>
  );
}
