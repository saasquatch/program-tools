import { useTick } from "@saasquatch/component-boilerplate";
import { VNode } from "@stencil/core";
import { PortalFrame } from "./portal-frame";
import { PortalFrameViewProps } from "./portal-frame-view";

export function usePortalFrame(props: PortalFrame, footerContent: VNode): PortalFrameViewProps {
  const [, rerender] = useTick();

  return {
    states: {
      styles: {
        headertext: props.headertext,
        description: props.description,
      },
    },
    data: {
      email: footerContent,
    },
    callbacks: {
      rerender,
    },
  };
}
