import { h, VNode } from "@stencil/core";

import jss from "jss";
import preset from "jss-preset-default";

export interface CardFeedViewProps {
}
export function CardFeedView(
  props: CardFeedViewProps,
  children: VNode
) {
  const style = {
    Container: {
      display: "flex",
      flexDirection: "row",
      "@media (max-width: 768px)": {
        flexDirection: "column",
      },
    },
  };

  jss.setup(preset());
  const sheet = jss.createStyleSheet(style);
  const styleString = sheet.toString();

  console.log(props);

  return (
    <div>
      hello world
	  {children}
    </div>
  );
}
