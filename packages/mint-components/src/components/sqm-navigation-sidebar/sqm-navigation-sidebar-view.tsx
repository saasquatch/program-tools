import { h, VNode } from "@stencil/core";

import { createStyleSheet } from "../../styling/JSS";
import { gap } from "../../global/mixins";

export interface NavigationSidebarViewProps {
  mobileItemsSlot: any;
}

const style = {
  ItemsContainer: {
    "min-width": "290px",
    "max-width": "320px",
    "box-sizing": "border-box",
    padding: "20px 15px",
    ...gap({ direction: "column" as const, size: "4px" }),
    "@media screen and (max-width: 799px)": {
      minWidth: "0px",
      display: "none",
    },
  },
};

const vanillaStyle = `
  @media screen and (max-width: 799px) {
    :host {
      max-width: max-content !important;
      min-width: max-content !important;
      position: sticky !important;
      top: 0 !important;
      z-index: 100 !important;
    }

    .container {
      position: sticky;
      top: 0;
    }
  }
  :host {    
    width: 30vw;
    min-width: max-content;
    max-width: 320px;
  }
`;

const sheet = createStyleSheet(style);
const styleString = sheet.toString();

export function NavigationSidebarView(
  props: NavigationSidebarViewProps,
  children: VNode
) {
  return (
    <div class="container">
      <sqm-hamburger-menu>
        <div>{props.mobileItemsSlot}</div>
      </sqm-hamburger-menu>
      <div class={sheet.classes.ItemsContainer}>
        <style type="text/css">
          {vanillaStyle}
          {styleString}
        </style>
        <div>{children}</div>
      </div>
    </div>
  );
}
