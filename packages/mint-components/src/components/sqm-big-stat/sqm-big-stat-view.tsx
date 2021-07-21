import { h, VNode } from "@stencil/core";
import jss from "jss";
import preset from "jss-preset-default";

export interface BigStatViewProps {
  statvalue: string;
  flexReverse?: boolean;
  alignment?: "left" | "right" | "center";
}

export function BigStatView(props: BigStatViewProps, children: VNode) {
  const { statvalue, flexReverse, alignment } = props;

  const style = {
    Container: {
      display: "flex",
      height: "100%",
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
      "font-size": "var(--sl-font-size-x-small)",
      "font-weight": "var(--sl-font-weight-semibold)",
      color: "var(--sl-color-gray-600)",
      "text-transform": "uppercase",
      "text-align": alignment,
    },
    Wrapper: {
      height: "100%",
    },
  };

  jss.setup(preset());
  const sheet = jss.createStyleSheet(style);
  const styleString = sheet.toString();

  return (
    <div part="stat-wrapper">
      <style type="text/css">{styleString}</style>
      <div class={sheet.classes.Container}>
        <div part="stat-value" class={sheet.classes.Stat}>
          {statvalue}
        </div>
        <div part="stat-description" class={sheet.classes.Description}>
          {children}
        </div>
      </div>
    </div>
  );
}
