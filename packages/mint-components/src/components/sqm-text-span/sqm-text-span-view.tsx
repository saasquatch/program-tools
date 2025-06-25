import { h, VNode } from "@stencil/core";
import { createStyleSheet } from "../../styling/JSS";

export interface TextSpanViewProps {
  type: "p" | "subtext" | "h1" | "h2" | "h3" | "h4";
  fontSize?: number;
  textColor?: string;
}

export function TextSpanView(props: TextSpanViewProps, children: VNode) {
  const { type, fontSize, textColor } = props;

  const style = {
    p: {
      "font-size": fontSize ? `${fontSize}px` : "var(--sl-font-size-small)",
      "font-weight": "400",
      color: textColor || "var(--sqm-text)",
      margin: "0",
    },
    subtext: {
      "font-size": fontSize ? `${fontSize}px` : "var(--sl-font-size-x-small)",
      "font-weight": "400",
      color: textColor || "var(--sqm-text-subdued)",
      margin: "0",
    },
    h1: {
      "font-size": fontSize ? `${fontSize}px` : "var(--sl-font-size-xx-large)",
      "font-weight": "600",
      color: textColor || "var(--sqm-text)",
      margin: "0",
    },
    h2: {
      "font-size": fontSize ? `${fontSize}px` : "var(--sl-font-size-x-large)",
      "font-weight": "600",
      color: textColor || "var(--sqm-text)",
      margin: "0",
    },
    h3: {
      "font-size": fontSize ? `${fontSize}px` : "var(--sl-font-size-large)",
      "font-weight": "600",
      color: textColor || "var(--sqm-text)",
      margin: "0",
    },
    h4: {
      "font-size": fontSize ? `${fontSize}px` : "13px",
      "font-weight": "600",
      color: textColor || "var(--sqm-text)",
      margin: "0",
    },
  };

  const sheet = createStyleSheet(style);
  const styleString = sheet.toString();

  const vanillaStyle = `
    :host {
      word-wrap: break-word;
    }
    sqm-text-span {
      display: inline;
    }
  `;

  return (
    <span class={sheet.classes[type]} part="sqm-base">
      <style type="text/css">
        {vanillaStyle}
        {styleString}
      </style>
      {children}
    </span>
  );
}
