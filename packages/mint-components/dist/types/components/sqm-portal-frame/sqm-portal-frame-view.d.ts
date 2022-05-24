import { VNode } from "../../stencil-public-runtime";
export interface PortalFrameViewProps {
  data: {
    footer: VNode;
    header: VNode;
  };
  callbacks: {
    rerender: Function;
  };
}
export declare function PortalFrameView(props: PortalFrameViewProps, children: VNode): any;
