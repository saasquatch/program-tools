import { h, VNode } from "@stencil/core";

import jss from "jss";
import preset from "jss-preset-default";

export interface CardFeedViewProps {
  width: number;
  gap: string;
}
export function CardFeedView(props: CardFeedViewProps, children: VNode) {
  const style = {
    Container: {
      columnGap: "var(--sl-spacing-" + props.gap + ")",
      columnWidth: props.width + "px",
    },
  };

  jss.setup(preset());
  const sheet = jss.createStyleSheet(style);
  const styleString = sheet.toString();

  console.log(props);

  const vanillaStyle =
    `
	:host {
		display: block;
	}
  `;

  return (
    <div class={sheet.classes.Container}>
      <style type="text/css">
        {styleString}
        {vanillaStyle}
      </style>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--sl-spacing-" + props.gap + ")",
        }}
      >
        {children}
      </div>
    </div>
  );
}
