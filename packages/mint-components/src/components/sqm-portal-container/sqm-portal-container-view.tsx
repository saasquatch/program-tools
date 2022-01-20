import { h, VNode } from "@stencil/core";
import { Spacing } from "../../global/mixins";
import { createStyleSheet } from "../../styling/JSS";

interface PortalContainerViewProps {
  direction: "row" | "column";
  padding: Spacing;
  gap: string;
  display?: string;
  minWidth?: string;
  maxWidth?: string;
}

export function PortalContainerView(
  props: PortalContainerViewProps,
  children: VNode
) {
  const style = {
    Container: {
      display: props.display || "grid",
	  flexWrap: "wrap",
      "grid-template-columns":
        props.direction === "row"
          ? `repeat(auto-fill, minmax(${props.minWidth}, auto))`
          : "100%",

      "grid-gap": `var(--sl-spacing-${props.gap})`,
      padding:
        props.padding === "none" ? "0" : `var(--sl-spacing-${props.padding})`,
      maxWidth: props.maxWidth ? props.maxWidth : "",
    },
  };

  const vanillaStyle = `
  :host{
    width: 100%;
    display: block;
  }`;

  const sheet = createStyleSheet(style);
  const styleString = sheet.toString();

  return (
    <div class={sheet.classes.Container}>
      <style type="text/css">
        {vanillaStyle}
        {styleString}
      </style>
      {children}
    </div>
  );
}
