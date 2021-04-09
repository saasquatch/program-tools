import { VNode, h } from "@stencil/core";

export interface PortalFrameViewProps {
  states: {
    styles: {
      headertext: string;
      description: string;
    };
  };
  data: {
    email: VNode;
  };
  callbacks: {
    rerender: Function;
  };
}

export function PortalFrameView(props: PortalFrameViewProps, children: VNode) {
  const { states, data } = props;
  const { styles } = states;
  return (
    <div class="Frame">
      <div class="HeaderWrapper">
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span
            style={{
              fontSize: "var(--sl-font-size-large)",
              fontWeight: "bold",
            }}
          >
            {styles.headertext}
          </span>
          <span style={{ fontSize: "var(--sl-font-size-small)" }}>
            {styles.description}
          </span>
        </div>
        <slot name="sqm-navigation-menu" />
      </div>
      {children}
      <div class="FooterWrapper">
        {data.email}
      </div>
    </div>
  );
}
