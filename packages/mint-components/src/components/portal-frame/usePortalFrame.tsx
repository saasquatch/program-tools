import { useTick } from "@saasquatch/component-boilerplate";
import { VNode } from "@stencil/core";
import { PortalFrameViewProps } from "./portal-frame-view";

export function usePortalFrame(
  footerContent: VNode,
  headerContent: VNode,
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
  };
}
