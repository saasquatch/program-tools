import { Component, h, State, VNode } from "@stencil/core";
import { withHooks } from "@saasquatch/stencil-hooks";
import { isDemo } from "@saasquatch/component-boilerplate";
import { PortalFrameView, PortalFrameViewProps } from "./sqm-portal-frame-view";
import { usePortalFrame } from "./usePortalFrame";

/**
 * @uiName Portal Frame
 */
@Component({
  tag: "sqm-portal-frame",
  styleUrl: "sqm-portal-frame.scss",
  shadow: true,
})
export class PortalFrame {
  @State()
  ignored = true;

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  render() {
    const footerContent = <slot name="footer" />;
    const headerContent = <slot name="header" />;
    const props = isDemo()
      ? usePortalFrameDemo(footerContent, headerContent)
      : usePortalFrame(footerContent, headerContent);
    return (
      <PortalFrameView {...props}>
        <slot />
      </PortalFrameView>
    );
  }
}

function usePortalFrameDemo(
  footerContent: VNode,
  headerContent: VNode
): PortalFrameViewProps {
  return {
    data: {
      footer: footerContent ? footerContent : <span>example@example.com</span>,
      header: headerContent ? (
        headerContent
      ) : (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span
            style={{
              fontSize: "var(--sl-font-size-large)",
              fontWeight: "bold",
            }}
          >
            Portal Header
          </span>
          <span style={{ fontSize: "var(--sl-font-size-small)" }}>
            A description for the portal
          </span>
        </div>
      ),
    },
    callbacks: {
      rerender: () => {},
    },
  };
}
