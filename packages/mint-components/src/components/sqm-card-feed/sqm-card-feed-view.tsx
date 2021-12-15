import { h, VNode } from "@stencil/core";

import jss from "jss";
import preset from "jss-preset-default";

export interface CardFeedViewProps {}
export function CardFeedView(props: CardFeedViewProps, children: VNode) {
  const style = {
    Container: {
      width: "90%",
      margin: "50px auto",
      maxWidth: "800px",
      columnGap: "60px",
      columnWidth: "330px",
      "& > div": {
        display: "inline-block",
        marginBottom: "50px",
      },
    },
  };

  jss.setup(preset());
  const sheet = jss.createStyleSheet(style);
  const styleString = sheet.toString();

  console.log(props);

  const vanillaStyle = `
  ::slotted(*){
    display: inline-block;
	margin-bottom: "50px",
  }
  `;

  return (
    <div class={sheet.classes.Container}>
      <style type="text/css">
        {styleString}
        {vanillaStyle}
      </style>
      {children}
    </div>
  );
}
