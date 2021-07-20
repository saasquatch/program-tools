import { h, VNode } from "@stencil/core";
import jss from "jss";
import preset from "jss-preset-default";
import { gap, Spacing } from "../../global/mixins";

interface PortalContainerViewProps {
  direction: "row" | "column";
  padding: Spacing;
  gap: string;
  minWidth?: string;
}

export function PortalContainerView(
  props: PortalContainerViewProps,
  children: VNode
) {
  const style = {
    Container: {
      display: "grid",
      "grid-template-columns":
        props.direction === "row"
          ? `repeat(auto-fill, minmax(${props.minWidth}, auto))`
          : "",

      "grid-gap": props.gap,
      padding:
        props.padding === "none"
          ? props.padding
          : `var(--sl-spacing-${props.padding})`,
    },
  };

  const vanillaStyle = `
  :host{
    width: 100%;
  }`;

  jss.setup(preset());
  const sheet = jss.createStyleSheet(style);
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
