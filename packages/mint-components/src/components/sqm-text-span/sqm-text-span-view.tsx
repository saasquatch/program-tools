import { h, VNode } from "@stencil/core";
import { createStyleSheet } from "../../styling/JSS";

export interface TextSpanView {
  type: "p" | "subtext" | "h1" | "h2" | "h3" | "h4";
}

export function TextSpanView(props: TextSpanView, children: VNode) {
  const style = {
    p: {
      "font-size": "var(--sl-font-size-small)",
      "font-weight": "400",
      color: "var(--sl-color-gray-800)",
      margin: "0",
    },
    subtext: {
      "font-size": "var(--sl-font-size-x-small)",
      "font-weight": "400",
      color: "var(--sl-color-gray-600)",
      margin: "0",
    },
    h1: {
      "font-size": "var(--sl-font-size-xx-large)",
      "font-weight": "600",
      color: "var(--sl-color-gray-800)",
      margin: "0",
    },
    h2: {
      "font-size": "var(--sl-font-size-x-large)",
      "font-weight": "600",
      color: "var(--sl-color-gray-800)",
      margin: "0",
    },
    h3: {
      "font-size": "var(--sl-font-size-large)",
      "font-weight": "600",
      color: "var(--sl-color-gray-800)",
      margin: "0",
    },
    h4: {
      "font-size": "13px",
      "font-weight": "600",
      color: "var(--sl-color-gray-800)",
      margin: "0",
    },
  };

  const sheet = createStyleSheet(style);
  const styleString = sheet.toString();

  const vanillaStyle = `
    sqm-text-span {
      display: inline;
    }
  `;

  return (
    <span class={sheet.classes[props.type]}>
      <style type="text/css">
        {vanillaStyle}
        {styleString}
      </style>
      {children}
    </span>
  );
}
