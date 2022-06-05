import { h, VNode } from "@stencil/core";
import { FontSize } from "../../global/mixins";
import { createStyleSheet } from "../../styling/JSS";

export interface BigStatViewProps {
  value: number;
  statvalue: string;
  loading: boolean;
  flexReverse?: boolean;
  alignment?: "left" | "right" | "center";
  labelSlot?: VNode;
  statColor?: string;
  statDescriptionColor?: string;
  statFontSize?: FontSize;
  statDescriptionFontSize?: FontSize;
}

export function BigStatView(props: BigStatViewProps) {
  const {
    statvalue,
    statColor,
    statFontSize,
    flexReverse,
    alignment,
    statDescriptionColor,
    statDescriptionFontSize,
  } = props;
  // Dependent on props, not feasiable to move out
  const style = {
    Container: {
      display: "flex",
      height: "inherit",
      "justify-content": "space-between",
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
      fontSize: statFontSize ? statFontSize : "var(--sl-font-size-x-large)",
      textAlign: alignment,
      color: statColor,
    },
    Description: {
      fontSize: statDescriptionFontSize
        ? statDescriptionFontSize
        : "var(--sl-font-size-small)",
      fontWeight: "var(--sl-font-weight-normal)",

      color: statDescriptionColor
        ? statDescriptionColor
        : "var(--sl-color-gray-600)",
      textTransform: "uppercase",
      textAlign: alignment,
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
