import { h, Host, VNode } from "@stencil/core";
import jss from "jss";
import preset from "jss-preset-default";

interface DividedLayoutViewProps {
  direction: "row" | "column";
}

export function DividedLayoutView(
  props: DividedLayoutViewProps,
  children: VNode
) {
  const getBorder = () => {
    if (props.direction === "row") {
      return { "border-right": "1px solid #EAEAEA" };
    } else {
      return { "border-bottom": "1px solid #EAEAEA" };
    }
  };

  const style = {
    LayoutContainer: {
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
    flex-direction: ${props.direction};
    background-color: var(--st-portal-background);
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

  jss.setup(preset());
  const sheet = jss.createStyleSheet(style);
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
