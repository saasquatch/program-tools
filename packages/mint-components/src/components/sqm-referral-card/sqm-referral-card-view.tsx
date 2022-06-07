import { h, VNode } from "@stencil/core";
import { Spacing } from "../../global/mixins";
import { createStyleSheet } from "../../styling/JSS";

export interface ReferralCardViewProps {
  verticalAlignment: "start" | "center" | "end";
  padding?: Spacing;
  backgroundColor?: string;
  borderColor?: string;
  textColor?: string;
  borderRadius?: number;
  slots: {
    left: VNode;
    right: VNode;
  };
}
const style = {
  Container: {
    display: "flex",
    "& .left": {
      boxSizing: "border-box",
      width: "50%",
      padding: "var(--sl-spacing-large)",
      paddingRight: "var(--sl-spacing-medium)",
      "@media (max-width: 499px)": {
        width: "100%",
        padding: "0",
        marginBottom: "var(--sl-spacing-xx-large)",
      },
    },
    "& .right": {
      boxSizing: "border-box",
      width: "50%",
      padding: "var(--sl-spacing-large)",
      paddingLeft: "var(--sl-spacing-medium)",
      "@media (max-width: 499px)": {
        width: "100%",
        padding: "0",
      },
    },
    border: "1px solid var(--sl-color-neutral-300)",
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
  console.log(props.padding);
  return (
    <div>
      <style type="text/css">
        {styleString}
        {vanillaStyle}
      </style>
      <style>{`

          /* 
          Selects any element placed inside a slot
           - resets css variable inheritence for fonts
          */
          ::slotted(*) {
            ${props.textColor && `color: ${props.textColor};`}
            --sl-color-neutral-900: ${props.textColor};
          }`}</style>
      <div
        class={sheet.classes.Container}
        style={{
          color: props.textColor || "var(--sl-color-neutral-900)",
          padding: props.padding ? `var(--sl-spacing-${props.padding})` : "0",
          borderColor: props.borderColor || "var(--sl-color-neutral-300)",
          borderRadius: props.borderRadius
            ? `${props.borderRadius}px`
            : "var(--sl-border-radius-large)",
          backgroundColor: props.backgroundColor || "var(--sl-color-neutral-0)",
        }}
      >
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
    </div>
  );
}
