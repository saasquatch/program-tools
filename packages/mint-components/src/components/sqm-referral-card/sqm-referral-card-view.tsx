import { h, VNode } from "@stencil/core";
import { createStyleSheet } from "../../styling/JSS";

export interface ReferralCardViewProps {
  verticalAlignment: "start" | "center" | "end";
  includeBorder?: boolean;
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
  const { includeBorder = true } = props;
  const onlyLeft = props.slots.left && !props.slots.right;
  const onlyRight = props.slots.left && !props.slots.right;

  return (
    <div
      part="sqm-base"
      class={sheet.classes.Container}
      style={{
        border: `${
          includeBorder ? "1px solid var(--sl-color-neutral-300);" : "none;"
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
        {props.slots.left}

        {props.slots.right}
      </div>
      <div class={sheet.classes.EndContainer}>{props.slots.footer}</div>
    </div>
  );
}
