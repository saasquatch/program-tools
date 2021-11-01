import { VNode, h } from "@stencil/core";
import jss from "jss";
import preset from "jss-preset-default";
import { HostBlock } from "../../global/mixins";
export interface PortalFrameViewProps {
  data: {
    footer: VNode;
    header: VNode;
  };
  callbacks: {
    rerender: Function;
  };
}

const style = {
  HostBlock: HostBlock,
  ":host": {
    "min-height": "100vh",
  },

  Frame: {
    "min-height": "100vh",
    display: "flex",
    "flex-direction": "column",
    "box-sizing": "border-box",
  },

  FooterWrapper: {
    width: "100%",
    "max-width": "100%",
    padding: "var(--sl-spacing-medium) var(--sl-spacing-x-large)",
    background: "var(--sqm-footer-background)",
    display: "flex",
    "justify-content": "flex-end",
    "align-items": "center",
    "box-sizing": "border-box",

    "margin-top": "auto",
  },

  HeaderWrapper: {
    width: "100%",
    "max-width": "100%",
    "box-sizing": "border-box",
    display: "flex",
    "justify-content": "space-between",
    padding: "var(--sl-spacing-small) var(--sl-spacing-large)",
    "align-items": "center",

    "background-color": "var(--sqm-header-background)",

    "@media screen and (max-width: 499px)": {
      "flex-direction": "row-reverse",
      "justify-content": "flex-end",
      padding: "0",
    },
  },
};

jss.setup(preset());
const sheet = jss.createStyleSheet(style);
const styleString = sheet.toString();

export function PortalFrameView(props: PortalFrameViewProps, children: VNode) {
  const { data } = props;
  return (
    <div class={sheet.classes.Frame}>
      <style type="text/css">{styleString}</style>
      <div class={sheet.classes.HeaderWrapper}>
        {data.header}
        <slot name="sqm-navigation-menu" />
      </div>
      {children}
      <div class={sheet.classes.FooterWrapper}>{data.footer}</div>
    </div>
  );
}
