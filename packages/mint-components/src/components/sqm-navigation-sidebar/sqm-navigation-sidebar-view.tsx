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
const sheet = createStyleSheet(style);
const styleString = sheet.toString();

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


export function NavigationSidebarView(
  props: NavigationSidebarViewProps,
  children: VNode
) {
  return <sqm-hamburger-menu>{children}</sqm-hamburger-menu>;
}
