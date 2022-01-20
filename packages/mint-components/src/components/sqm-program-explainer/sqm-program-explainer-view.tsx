import { h, VNode } from "@stencil/core";

import { createStyleSheet } from "../../styling/JSS";

export interface ProgramExplainerViewProps {
  header: string;
  textColor: string;
  backgroundColor: string;
}
export function ProgramExplainerView(
  props: ProgramExplainerViewProps,
  children: VNode
) {
  const style = {
    Container: {
      display: "flex",
      flexDirection: "row",
      color: props.textColor || "var(--sl-color-neutral-900)",
      background: props.backgroundColor || "var(--sl-color-neutral-0)",
      "@media (max-width: 499px)": {
        flexDirection: "column",
      },
    },
    Header: {
      padding: "var(--sl-spacing-large)",
    },
    Card: {
      padding: "var(--sl-spacing-large)",
    },
    Title: {
      fontSize: "var(--sl-font-size-x-large)",
      fontWeight: "var(--sl-font-weight-bold)",
      lineHeight: "var(--sl-line-height-dense)",
    },
    Description: {
      fontSize: "var(--sl-font-size-medium)",
      marginTop: "var(--sl-spacing-x-small)",
    },
  };

  const sheet = createStyleSheet(style);
  const styleString = sheet.toString();

  const vanillaStyle = `
  ::slotted(*){
    display: flex;
    width: 100%;
  }
  @media (max-width: 499px) {
    ::slotted(*){
      display: block;
    }
  }`;

  return (
    <div>
      <style type="text/css">
        {styleString}
        {vanillaStyle}
      </style>
      <div class={sheet.classes.Header}>
        <div class={sheet.classes.Title}>{props.header}</div>
      </div>
      <div class={sheet.classes.Container}>{children}</div>
    </div>
  );
}
