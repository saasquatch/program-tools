import { h, VNode } from "@stencil/core";
import { createStyleSheet } from "../../styling/JSS";

interface DividedLayoutViewProps {
  direction: "row" | "column";
  contentAreaWidth?: string | null;
  dividerStyle: string;
  backgroundColor?: string;
  borderless?: boolean;
}

export function DividedLayoutView(
  props: DividedLayoutViewProps,
  children: VNode
) {
  console.log("background color is ", props.backgroundColor);
  const getBorder = () => {
    if (props.direction === "row") {
      return { "border-right": props.dividerStyle || "1px solid #EAEAEA" };
    } else {
      return { "border-bottom": props.dividerStyle || "1px solid #EAEAEA" };
    }
  };

  const style = {
    LayoutContainer: {
      background: props.backgroundColor,
      display: "contents",
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
    box-sizing: border-box;
    flex-direction: ${props.direction};
    background-color: var(--sqm-portal-background);
    color: var(--sqm-text);
    overflow-x: clip;
    ${
      props.direction === "column"
        ? "width: 100%; max-width: var(--sqm-portal-main-width);"
        : ""
    }
    ${
      props.contentAreaWidth !== null
        ? `max-width: ${props.contentAreaWidth} !important;`
        : ""
    }
  `;

  const vanillaStyle = `
  :host{
    ${hostStyle}
  }
  @media screen and (max-width: 570px) {
    :host {
      display: flex;
      flex-direction: column;
    }
  }
  sqm-divided-layout {
    ${hostStyle}
  }
  `;

  const sheet = createStyleSheet(style);
  const styleString = sheet.toString();

  return (
    <div class={sheet.classes.LayoutContainer} part="sqm-base">
      <style type="text/css">
        {vanillaStyle}
        {styleString}
      </style>
      {children}
    </div>
  );
}
