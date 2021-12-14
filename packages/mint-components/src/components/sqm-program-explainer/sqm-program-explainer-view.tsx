import { h, VNode } from "@stencil/core";

import jss from "jss";
import preset from "jss-preset-default";

export interface ProgramExplainerViewProps {}

const style = {
  Container: {
    display: "flex",
    "@media (max-width: 1024px)": {
      flexDirection: "column",
    },
  },
  Card: {
    padding: "24px",
    background: "#F3F0EC",
    color: "black",
  },
  Title: {
    fontSize: "28px",
    lineHeight: "36px",
    fontWeight: "700",
  },
  Description: {
    fontSize: "16px",
    lineHeight: "28px",
    fontWeight: "400",
    marginTop: "8px",
  },
};

jss.setup(preset());
const sheet = jss.createStyleSheet(style);
const styleString = sheet.toString();

export function ProgramExplainerView(
  // @ts-ignore - Stencil requires props (even if empty)
  props: NavigationSidebarViewProps,
  children: VNode
) {
  return (
    <div>
      <style type="text/css">{styleString}</style>
      <div class={sheet.classes.Card}>
        <div class={sheet.classes.Title}>Klip Rewards</div>
      </div>
      <div class={sheet.classes.Container}>{children}</div>
      <div class={sheet.classes.Card}>
        <div class={sheet.classes.Title}>
          Earn rewards with our loyalty program
        </div>
        <div class={sheet.classes.Description}>
          Earn points by completing tasks like uploading your first video or
          sharing videos with friends. Use your points to redeem rewards like
          one free month of Klip Enterprise or two plane tickets to anywhere in
          North America.
        </div>
      </div>
    </div>
  );
}
