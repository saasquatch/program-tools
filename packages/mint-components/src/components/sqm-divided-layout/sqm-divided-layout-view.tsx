import { h, VNode } from "@stencil/core";
import { createStyleSheet } from "../../styling/JSS";

interface DividedLayoutViewProps {
  direction: "row" | "column";
  dividerStyle: string;
  overflow: "initial" | "scroll" | "auto" | "hidden";
}

export function DividedLayoutView(
  props: DividedLayoutViewProps,
  children: VNode
) {
  const getBorder = () => {
    if (props.direction === "row") {
      return { "border-right": props.dividerStyle || "1px solid #EAEAEA" };
    } else {
      return { "border-bottom": props.dividerStyle || "1px solid #EAEAEA" };
    }
  };

  const style = {
    LayoutContainer: {
      display: "contents",
      maxWidth: "100%",
      // First style applies when shadow DOM is disabled, second applies when shadow DOM is enabled
      "& > :not(:last-child)": {
        ...getBorder(),
      },
      "& > ::slotted(*:not(:last-child))": {
        ...getBorder(),
      },
    },
  };

  const hostStyle = `
    display: flex;
    flex: 1;
    flex-direction: ${props.direction};
    overflow: ${props.overflow};
    background-color: var(--sqm-content-background);
    ${
      props.direction === "column"
        ? "width: 100%; max-width: var(--sqm-portal-main-width);"
        : ""
    }
  `;

  const vanillaStyle = `
  :host{
    ${hostStyle}
  }
  sqm-divided-layout {
    ${hostStyle}
  }
  `;

  const sheet = createStyleSheet(style);
  const styleString = sheet.toString();

  return (
    <div class={sheet.classes.LayoutContainer}>
      <style type="text/css">
        {vanillaStyle}
        {styleString}
      </style>
      {children}
    </div>
  );
}
