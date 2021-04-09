import { useTick } from "@saasquatch/component-boilerplate";
import { PortalFrame } from "./portal-frame";
import { PortalFrameViewProps } from "./portal-frame-view";

export function usePortalFrame(props: PortalFrame): PortalFrameViewProps {
  const [, rerender] = useTick();

  return {
    states: {
      styles: {
        headertext: props.headertext,
        description: props.description,
      },
    },
    data: {
      email: props.email,
    },
    callbacks: {
      rerender,
    },
  };
}
