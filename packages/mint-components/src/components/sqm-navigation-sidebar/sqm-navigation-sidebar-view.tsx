import { h, VNode } from "@stencil/core";

import jss from "jss";
import preset from "jss-preset-default";
import { gap } from "../../global/mixins";

export interface NavigationSidebarViewProps {}

const style = {
  ItemsContainer: {
    width: "100%",
    "max-width": "320px",
    "box-sizing": "border-box",
    padding: "20px 15px",
    ...gap({ direction: "column" as const, size: "4px" }),
  },
};

const vanillaStyle = `
  :host{    
    width: 30vw;
    min-width: min-content;
    max-width: 320px;
  }
`;

jss.setup(preset());
const sheet = jss.createStyleSheet(style);
const styleString = sheet.toString();

export function NavigationSidebarView(
  // @ts-ignore - Stencil requires props (even if empty)
  props: NavigationSidebarViewProps,
  children: VNode
) {
  return (
    <div class={sheet.classes.ItemsContainer}>
      <style type="text/css">
        {vanillaStyle}
        {styleString}
      </style>
      {children}
    </div>
  );
}
