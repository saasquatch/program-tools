import { VNode, h } from "@stencil/core";
import { createStyleSheet } from "../../styling/JSS";
import { HostBlock } from "../../global/mixins";
export interface PortalFrameViewProps {
  data: {
    footer: VNode;
    header: VNode;
  };
  callbacks: {
    rerender: Function;
  };
  notFullScreen?: boolean;
  backgroundColor?: string;
  border?: string;
  headerAndFooterBackgroundColor?: string;
}

export function PortalFrameView(props: PortalFrameViewProps, children: VNode) {
  const { data, notFullScreen, border } = props;

  const style = {
    HostBlock: HostBlock,
    Frame: {
      display: "flex",
      "flex-direction": "column",
      "box-sizing": "border-box",
      "&:nth-child(2)": {
        background: props.backgroundColor,
      },
    },

    FooterWrapper: {
      width: "100%",
      "max-width": "100%",
      padding: "var(--sl-spacing-medium) var(--sl-spacing-x-large)",
      background: props.headerAndFooterBackgroundColor,
      display: "flex",
      "justify-content": "flex-end",
      "align-items": "center",
      "box-sizing": "border-box",
      borderTop: border,
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
      borderBottom: border,
      background: props.headerAndFooterBackgroundColor,
      "@media screen and (max-width: 499px)": {
        "flex-direction": "row-reverse",
        "justify-content": "flex-end",
        padding: "0",
      },
    },
  };

  const sheet = createStyleSheet(style);
  const styleString = sheet.toString();

  return (
    <div
      style={{ minHeight: notFullScreen ? "100%" : "100vh" }}
      class={sheet.classes.Frame}
      part="sqm-base"
    >
      <style type="text/css">{styleString}</style>
      <div class={sheet.classes.HeaderWrapper} part="sqm-header">
        {data.header}
        <slot name="sqm-navigation-menu" />
      </div>
      {children}
      <div class={sheet.classes.FooterWrapper} part="sqm-footer">
        {data.footer}
      </div>
    </div>
  );
}
