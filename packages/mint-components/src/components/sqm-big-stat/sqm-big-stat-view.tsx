import { h, VNode } from "@stencil/core";
import jss from "jss";
import preset from "jss-preset-default";

export interface BigStatViewProps {
  value: number;
  statvalue: string;
  loading:boolean;
  flexReverse?: boolean;
  alignment?: "left" | "right" | "center";
}

export function BigStatView(props: BigStatViewProps, children: VNode) {
  const { statvalue, flexReverse, alignment } = props;

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
      "font-size": "var(--sl-font-size-x-large)",
      "text-align": alignment,
    },
    Description: {
      "font-size": "var(--sl-font-size-small)",
      "font-weight": "var(--sl-font-weight-normal)",
      color: "var(--sl-color-gray-600)",
      "text-transform": "uppercase",
      "text-align": alignment,
    },
  };

  jss.setup(preset());
  const sheet = jss.createStyleSheet(style);
  const styleString = sheet.toString();

  return (
    <div part="stat-wrapper" class={sheet.classes.Container}>
      <style type="text/css">{styleString}</style>
      <div part="stat-value" class={sheet.classes.Stat}>
        {statvalue}
      </div>
      <div part="stat-description" class={sheet.classes.Description}>
        {children}
      </div>
    </div>
  );
}
