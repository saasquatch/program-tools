import { VNode, h } from "@stencil/core";

export interface PortalFrameViewProps {
  data: {
    footer: VNode;
    header: VNode;
  };
  callbacks: {
    rerender: Function;
  };
}

export function PortalFrameView(props: PortalFrameViewProps, children: VNode) {
  const { data } = props;
  return (
    <div class="Frame">
      <div class="HeaderWrapper">
        {data.header}
        <slot name="sqm-navigation-menu" />
      </div>
      {children}
      <div class="FooterWrapper">{data.footer}</div>
    </div>
  );
}
