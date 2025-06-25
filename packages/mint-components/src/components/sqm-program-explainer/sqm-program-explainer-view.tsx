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
      color: props.textColor || "var(--sqm-text)",
      background: props.backgroundColor || "",
    },
    Header: {
      fontSize: "var(--sl-font-size-x-large)",
      fontWeight: "var(--sl-font-weight-bold)",
      lineHeight: "var(--sl-line-height-dense)",
      marginBottom: "var(--sl-spacing-large)",
      textAlign: "center",
    },
    Grid: {
      display: "flex",
      flexDirection: "row",
      gap: "var(--sl-spacing-large)",
      "@media (max-width: 499px)": {
        flexDirection: "column",
      },
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
    <div class={sheet.classes.Container} part="sqm-base">
      <style type="text/css">
        {styleString}
        {vanillaStyle}
      </style>
      <div class={sheet.classes.Header}>
        <div class={sheet.classes.Header} part="sqm-header">
          {props.header}
        </div>
      </div>
      <div class={sheet.classes.Grid} part="sqm-grid-container">
        {children}
      </div>
    </div>
  );
}
