import { h, VNode } from "@stencil/core";
import { createStyleSheet } from "../../styling/JSS";

export interface StatContainerProps {
  space: string;
  display?: "grid" | "flex";
  alignment?: "left" | "right" | "center";
  hideBorder?: boolean;
  gap?: string;
}

export function StatContainerView(props: StatContainerProps, children: VNode) {
  const divideSpace = () => {
    const spaceValue = getComputedStyle(
      document.documentElement
    ).getPropertyValue(`--sl-spacing-${props.space}`);
    return `${Math.floor(parseInt(spaceValue) / 2)}rem`;
  };

  // take alignment variable and convert it to CSS flexbox alignment
  const alignment =
    props.alignment === "center"
      ? "center"
      : props.alignment === "right"
      ? "flex-end"
      : "flex-start";

  // Dependent on props, not feasible to move out
  const style = {
    StatContainer: {
      width: "100%",
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: alignment,
      flexDirection: "row",
      gap: `var(--sl-spacing-${props.gap})`,

      // Apply border styles conditionally based on the hideBorder prop
      "& > *": {
        "border-right": props.hideBorder
          ? "none"
          : "1px solid var(--sqm-text-subdued)",
        "padding-right": divideSpace(),
      },
      "& > :last-child": {
        "border-right": "none",
      },
      "& > ::slotted(*)": {
        "border-right": props.hideBorder
          ? "none"
          : "1px solid var(--sqm-text-subdued)",
        "padding-right": divideSpace(),
      },
      "& > ::slotted(*:last-child)": {
        "border-right": "none",
      },

      "@media screen and (max-width: 430px)": {
        "& > ::slotted(*)": {
          borderRight: "none",
        },
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
    <div class={sheet.classes.StatFrame} part="sqm-base">
      <div class={sheet.classes.StatContainer} part="sqm-inner-container">
        <style type="text/css">{styleString}</style>
        {children}
      </div>
      <div class={sheet.classes.BorderFix} part="sqm-border"></div>
    </div>
  );
}
