import { h, VNode } from "@stencil/core";
import { createStyleSheet } from "../../styling/JSS";

export interface StatContainerProps {
  space: string;
  display?: "grid" | "flex";
  showBorder?: boolean;
  borderColor?: string;
}

export function StatContainerView(props: StatContainerProps, children: VNode) {
  const divideSpace = () => {
    const spaceValue = getComputedStyle(
      document.documentElement
    ).getPropertyValue(`--sl-spacing-${props.space}`);
    return `${Math.floor(parseInt(spaceValue) / 2)}rem`;
  };

  // Dependent on props, not feasiable to move out
  const style = {
    StatContainer: {
      width: "100%",
      display: props.display || "grid",
      "grid-template-columns": "repeat(auto-fill, minmax(130px, auto))",
      gap: divideSpace(),
      // First set of styles applies when shadow DOM is disabled, second set applies when shadow DOM is enabled
      "& > *": {
        "border-right": props.showBorder
          ? `1px solid ${props.borderColor ? props.borderColor : "#EAEAEA"}`
          : "none",
        "padding-right": divideSpace(),
      },
      "& > :last-child": {
        "border-right": "none",
      },
      "& > ::slotted(*)": {
        "border-right": props.showBorder
          ? `1px solid ${props.borderColor ? props.borderColor : "#EAEAEA"}`
          : "none",
        "padding-right": divideSpace(),
        height: "100%",
      },
      "& > ::slotted(*:last-child)": {
        "border-right": "none",
      },
    },
    StatFrame: {
      display: "flex",
    },
    BorderFix: {
      "border-right": "1px solid transparent",
      width: "0px",
      "margin-left": "-1px",
    },
  };

  const sheet = createStyleSheet(style);
  const styleString = sheet.toString();

  return (
    <div class={sheet.classes.StatFrame}>
      <div class={sheet.classes.StatContainer}>
        <style type="text/css">{styleString}</style>
        {children}
      </div>
      <div class={sheet.classes.BorderFix}></div>
    </div>
  );
}
