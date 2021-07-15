import { h, VNode } from "@stencil/core";
import jss from "jss";
import preset from "jss-preset-default";

export interface StatContainerProps {
  space: string;
}

export function StatContainerView(props: StatContainerProps, children: VNode) {
  const divideSpace = () => {
    return Math.floor(Number(props.space) / 2);
  };

  const style = {
    StatContainer: {
      display: "flex",
      "& > :not(:last-child)": {
        "border-right": "1px solid #EAEAEA",
        "padding-right": divideSpace(),
        "margin-right": divideSpace(),
      },
    },
  };

  jss.setup(preset());
  const sheet = jss.createStyleSheet(style);
  const styleString = sheet.toString();

  return (
    <div class={sheet.classes.StatContainer}>
      <style type="text/css">{styleString}</style>
      {children}
    </div>
  );
}
