import { h, VNode } from "@stencil/core";
import jss from "jss";
import preset from "jss-preset-default";

export interface TextSpanView {
  type: "p" | "subtext" | "h1" | "h2" | "h3" | "h4";
}

export function TextSpanView(props: TextSpanView, children: VNode) {
  const style = {
    p: {
      "font-size": "14px",
      "font-weight": "400",
      color: "#555555",
      margin: "0",
    },
    subtext: {
      "font-size": "12px",
      "font-weight": "400",
      color: "#777777",
      margin: "0",
    },
    h1: {
      "font-size": "36px",
      "font-weight": "600",
      color: "#555555",
      margin: "0",
    },
    h2: {
      "font-size": "24px",
      "font-weight": "600",
      color: "#555555",
      margin: "0",
    },
    h3: {
      "font-size": "18px",
      "font-weight": "600",
      color: "#555555",
      margin: "0",
    },
    h4: {
      "font-size": "13px",
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
