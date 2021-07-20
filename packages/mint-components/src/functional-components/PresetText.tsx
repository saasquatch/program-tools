import { h, VNode } from "@stencil/core";
import jss from "jss";
import preset from "jss-preset-default";

export interface PresetTextProps {
  type: "p" | "pLight" | "h1" | "h2" | "h3" | "h4";
}

export function PresetText(props: PresetTextProps, children: VNode) {
  const style = {
    p: {
      "font-size": "14px",
      "line-height": "16px",
      "font-weight": "400",
      color: "#555555",
      margin: "0",
    },
    pLight: {
      "font-size": "12px",
      "line-height": "14px",
      "font-weight": "400",
      color: "#777777",
      margin: "0",
    },
    h1: {
      "font-size": "36px",
      "line-height": "40px",
      "font-weight": "600",
      color: "#555555",
      margin: "0",
    },
    h2: {
      "font-size": "24px",
      "line-height": "26px",
      "font-weight": "600",
      color: "#555555",
      margin: "0",
    },
    h3: {
      "font-size": "18px",
      "line-height": "16px",
      "font-weight": "600",
      color: "#555555",
      margin: "0",
    },
    h4: {
      "font-size": "13px",
      "line-height": "15px",
      "font-weight": "600",
      color: "#555555",
      margin: "0",
    },
  };

  jss.setup(preset());
  const sheet = jss.createStyleSheet(style);
  const styleString = sheet.toString();

  return (
    <div class={sheet.classes[props.type]}>
      <style type="text/css">{styleString}</style>
      {children}
    </div>
  );
}
