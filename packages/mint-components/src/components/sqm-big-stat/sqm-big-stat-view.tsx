import { h, VNode } from "@stencil/core";
import { createStyleSheet } from "../../styling/JSS";

export interface BigStatViewProps {
  value: number;
  statvalue: string;
  loading: boolean;
  flexReverse?: boolean;
  alignment?: "left" | "right" | "center";
  labelSlot?: VNode;
  statTextColor?: string;
  statFontSize?: number;
  descriptionTextColor?: string;
  descriptionFontSize?: number;
  statFontWeight?: number;
}

export function BigStatView(props: BigStatViewProps) {
  const {
    statvalue,
    flexReverse,
    alignment,
    statTextColor,
    statFontSize,
    descriptionTextColor,
    descriptionFontSize,
    statFontWeight,
  } = props;

  // Dependent on props, not feasible to move out
  const style = {
    Container: {
      display: "flex",
      "flex-direction": `${flexReverse ? "column-reverse" : "column"}`,
      "align-items": `${
        alignment === "left"
          ? "flex-start"
          : alignment === "right"
          ? "flex-end"
          : "center"
      }`,
    },
    Stat: {
      "font-size": statFontSize
        ? `${statFontSize}px`
        : "var(--sl-font-size-xx-large)",
      "text-align": alignment,
      color: statTextColor || "var(--sqm-text)",
      lineHeight: "35px",
      fontWeight: statFontWeight || "var(--sl-font-weight-normal)",
    },
    Description: {
      "font-size": descriptionFontSize
        ? `${descriptionFontSize}px`
        : "var(--sl-font-size-small)",
      "font-weight": "var(--sl-font-weight-normal)",
      color: descriptionTextColor || "var(--sqm-text)",
      "text-align": alignment,
      lineHeight: "20px",
    },
  };

  const sheet = createStyleSheet(style);
  const styleString = sheet.toString();

  return (
    <div part="stat-wrapper" class={sheet.classes.Container}>
      <style type="text/css">{styleString}</style>
      <div part="stat-value" class={sheet.classes.Stat}>
        {statvalue}
      </div>
      <div part="stat-description" class={sheet.classes.Description}>
        {props.labelSlot}
      </div>
    </div>
  );
}
