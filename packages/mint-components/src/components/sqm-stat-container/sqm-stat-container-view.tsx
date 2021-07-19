import { h, VNode } from "@stencil/core";
import jss from "jss";
import preset from "jss-preset-default";

export interface StatContainerProps {
  space: string;
}

export function StatContainerView(props: StatContainerProps, children: VNode) {
  const divideSpace = () => {
    return Math.floor(parseInt(props.space) / 2);
  };

  const style = {
    StatContainer: {
      width: "100%",
      display: "grid",
      "grid-template-columns": "repeat(auto-fill, minmax(120px, auto))",
      gap: divideSpace(),
      "& > *": {
        "border-right": "1px solid #EAEAEA",
        "padding-right": divideSpace(),
      },
      "& > :last-child": {
        "border-right": "1px solid #ffffff",
      },
    },
    StatFrame: {
      display: "flex",
    },
    BorderFix: {
      "border-right": "1px solid #ffffff",
      width: "0px",
      "margin-left": "-1px",
    },
  };

  jss.setup(preset());
  const sheet = jss.createStyleSheet(style);
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
