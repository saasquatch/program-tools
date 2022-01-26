import { h, VNode } from "@stencil/core";
import { Spacing } from "../../global/mixins";
import { createStyleSheet } from "../../styling/JSS";

export interface PortalSectionProps {
  labelMargin: Spacing;
  padding: Spacing;
  label: VNode;
  content: VNode;
  align?: "left" | "center" | "right";
}

export function PortalSectionView(props: PortalSectionProps) {
  const style = {
    LabelContainer: {
      "margin-bottom":
        props.labelMargin === "none"
          ? props.labelMargin
          : `var(--sl-spacing-${props.labelMargin})`,
    },
    SectionContainer: {
      textAlign: props.align || "left",
      padding:
        props.padding === "none" ? "0" : `var(--sl-spacing-${props.padding})`,
    },
  };

  const sheet = createStyleSheet(style);
  const styleString = sheet.toString();

  return (
    <div class={sheet.classes.SectionContainer}>
      <style type="text/css">{styleString}</style>
      <div class={sheet.classes.LabelContainer}>{props.label}</div>
      {props.content}
    </div>
  );
}
