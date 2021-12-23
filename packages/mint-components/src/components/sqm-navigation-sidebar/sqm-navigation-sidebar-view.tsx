import { h, VNode } from "@stencil/core";

import { createStyleSheet } from "../../styling/JSS";
import { gap } from "../../global/mixins";

export interface NavigationSidebarViewProps {}

const style = {
  ItemsContainer: {
    "min-width": "290px",
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

const sheet = createStyleSheet(style);
const styleString = sheet.toString();

export function NavigationSidebarView(
  // @ts-ignore - Stencil requires props (even if empty)
  props: NavigationSidebarViewProps,
  children: VNode
) {
  return (
    <div>
      <div class={sheet.classes.ItemsContainer}>
        <style type="text/css">
          {vanillaStyle}
          {styleString}
        </style>
        {children}
      </div>
    </div>
  );
}
