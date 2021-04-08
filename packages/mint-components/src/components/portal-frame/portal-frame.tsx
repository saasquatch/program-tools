import { Component, h, Prop, State } from "@stencil/core";
import { withHooks } from "@saasquatch/stencil-hooks";
import { isDemo } from "@saasquatch/component-boilerplate";
import { PortalFrameView, PortalFrameViewProps } from "./portal-frame-view";
import { usePortalFrame } from "./usePortalFrame";
import { getProps } from "../../utils/utils";

/**
 * @uiName Portal Frame
 */
@Component({
  tag: "sqm-portal-frame",
  styleUrl: "portal-frame.scss",
  shadow: true,
})
export class PortalFrame {
  @State()
  ignored = true;

  /**
   * @uiName Heading text
   */
  @Prop() headertext: string;
  /**
   * @uiName Description text
   */
  @Prop() description: string;
  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  render() {
    const props = isDemo()
      ? usePortalFrameDemo(getProps(this))
      : usePortalFrame(getProps(this));
    return (
      <PortalFrameView {...props}>
        <slot />
      </PortalFrameView>
    );
  }
}

function usePortalFrameDemo(props: PortalFrame): PortalFrameViewProps {
  return {
    states: {
      styles: {
        ...props,
        headertext: "Portal Heading",
        description: "Portal Description",
      },
    },
    data: {
      email: "example@example.com",
    },
    callbacks: {
      rerender: () => {},
    },
  };
}
