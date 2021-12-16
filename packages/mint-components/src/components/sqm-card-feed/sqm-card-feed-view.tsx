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
      "& > div": {
        display: "inline-block!important",
        marginBottom: "var(--sl-spacing-" + props.gap + ")",
      },
    },
  };

  jss.setup(preset());
  const sheet = jss.createStyleSheet(style);
  const styleString = sheet.toString();

  console.log(props);

  const vanillaStyle =
    `
	::slotted(*){
		display: block!important;
		margin-bottom: var(--sl-spacing-` +
    props.gap +
    `);
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
