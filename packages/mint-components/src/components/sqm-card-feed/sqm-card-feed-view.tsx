import { h, VNode } from "@stencil/core";
import { createStyleSheet } from "../../styling/JSS";


export interface CardFeedViewProps {
  width: number;
  gap: number;
}

export function CardFeedView(props: CardFeedViewProps, children: VNode) {
  const style = {
    Container: {
      columnGap: props.gap + "px",
      columnWidth: props.width + "px",
      "& > div": {
        marginBottom: "24px",
      },
    },
  };

  const sheet = createStyleSheet(style);
  const styleString = sheet.toString();

  console.log(props);

  const vanillaStyle = `
    :host{
      display: block;   
    }

  `;

  return (
    <div>
      <style type="text/css">
        {styleString}
        {vanillaStyle}
      </style>
      <div class={sheet.classes.Container}>{children}</div>
    </div>
  );
}
