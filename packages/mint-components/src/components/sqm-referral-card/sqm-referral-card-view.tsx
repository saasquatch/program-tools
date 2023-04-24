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
    display: "grid",
    gridAutoColumns: "minmax(0, 1fr)",
    gridAutoFlow: "column",
    gap: "calc(2 * var(--sl-spacing-medium))",

    // "& > ::slotted(*)": {
    //   boxSizing: "border-box",
    //   flex: "1 1 0",
    // },

    // "& .left": {
    //   boxSizing: "border-box",
    //   width: "50%",
    //   "@media (max-width: 499px)": {
    //     width: "100%",
    //   },
    // },
    // "& .right": {
    //   boxSizing: "border-box",
    //   width: "50%",
    //   "@media (max-width: 499px)": {
    //     width: "100%",
    //   },
    // },

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
  const onlyLeft = props.slots.left && !props.slots.right;
  const onlyRight = props.slots.left && !props.slots.right;

  console.log("left", props.slots.left);
  console.log("right", props.slots.right);

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
      <div
        part="sqm-column-container"
        class={sheet.classes.ColumnContainer}
        style={{
          alignItems: props.verticalAlignment,
        }}
      >
        {/* <div
          class="left"
          style={{
            alignSelf: props.verticalAlignment,
            width: onlyLeft ? "100%" : "",
          }}
        > */}
        {props.slots.left}
        {/* </div>
        <div
          class="right"
          style={{
            alignSelf: props.verticalAlignment,
            width: onlyRight ? "100%" : "",
          }}
        > */}
        {props.slots.right}
        {/* </div> */}
      </div>
      <div class={sheet.classes.EndContainer}>{props.slots.footer}</div>
    </div>
  );
}
