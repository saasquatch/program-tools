import { h, VNode } from "@stencil/core";
import { Spacing } from "../../global/mixins";
import { createStyleSheet } from "../../styling/JSS";

interface PortalContainerViewProps {
  direction: "row" | "column";
  padding: Spacing;
  gap: string;
  center?: boolean;
  display?: string;
  minWidth?: string;
  maxWidth?: string;
  flexWrap?: string;
  backgroundColor?: string;
  justifyContent?:
    | "start"
    | "center"
    | "end"
    | "space-between"
    | "space-around"
    | "space-evenly";
}

export function PortalContainerView(
  props: PortalContainerViewProps,
  children: VNode
) {
  const style = {
    Container: {
      boxSizing: "border-box",
      display: props.display || "grid",
      flexWrap: props.flexWrap || "wrap",
      "grid-template-columns":
        props.direction === "row"
          ? `repeat(auto-fill, minmax(${props.minWidth}, auto))`
          : "100%",

      "grid-gap": `var(--sl-spacing-${props.gap})`,
      padding:
        props.padding === "none" ? "0" : `var(--sl-spacing-${props.padding})`,
      maxWidth: props.maxWidth,
      margin: props.center && "auto",
      justifyContent: props.justifyContent,
      backgroundColor: props.backgroundColor || "inherit",
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
    <div class={sheet.classes.Container} part={"sqm-base"}>
      <style type="text/css">
        {vanillaStyle}
        {styleString}
      </style>
      {children}
    </div>
  );
}
