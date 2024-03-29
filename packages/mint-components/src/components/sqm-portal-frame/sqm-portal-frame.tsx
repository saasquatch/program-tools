import { Component, h, Prop, State, VNode } from "@stencil/core";
import { withHooks } from "@saasquatch/stencil-hooks";
import { isDemo } from "@saasquatch/component-boilerplate";
import { PortalFrameView, PortalFrameViewProps } from "./sqm-portal-frame-view";
import { usePortalFrame } from "./usePortalFrame";
import deepmerge from "deepmerge";
import { DemoData } from "../../global/demo";

/**
 * @uiName Microsite Frame
 * @slots [{"name":"header","title":"Header Content"},{"name":"footer","title":"Footer Content"},{"name":"","title":"Body Content"}]
 */
@Component({
  tag: "sqm-portal-frame",
  shadow: true,
})
export class PortalFrame {
  @State()
  ignored = true;

  /**
   * @undocumented
   */
  @Prop() notFullScreen?: boolean = false;

  /**
   * @undocumented
   * @uiType object
   */
  @Prop() demoData?: DemoData<PortalFrameViewProps>;

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  render() {
    const footerContent = <slot name="footer" />;
    const headerContent = <slot name="header" />;
    const props = isDemo()
      ? usePortalFrameDemo(footerContent, headerContent, this)
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
  headerContent: VNode,
  props: PortalFrame
): PortalFrameViewProps {
  return deepmerge(
    {
      notFullScreen: true,
      data: {
        footer: footerContent ? (
          footerContent
        ) : (
          <span>example@example.com</span>
        ),
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
    },
    props.demoData || {},
    { arrayMerge: (_, a) => a }
  );
}
