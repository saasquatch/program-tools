import { useTick } from "@saasquatch/component-boilerplate";
import { VNode } from "@stencil/core";
import { PortalFrameViewProps } from "./sqm-portal-frame-view";
import { PortalFrame } from "./sqm-portal-frame";

export function usePortalFrame(
  footerContent: VNode,
  headerContent: VNode,
  props: PortalFrame
): PortalFrameViewProps {
  const [, rerender] = useTick();

  return {
    data: {
      footer: footerContent,
      header: headerContent,
    },
    callbacks: {
      rerender,
    },
    backgroundColor: props.backgroundColor,
    border: props.border,
    headerAndFooterBackgroundColor: props.headerAndFooterBackgroundColor,
  };
}
