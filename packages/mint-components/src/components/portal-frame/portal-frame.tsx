import { Component, h, Prop, State } from "@stencil/core";
import { withHooks } from "@saasquatch/stencil-hooks";
import { isDemo } from "@saasquatch/component-boilerplate";
import { PortalFrameView, PortalFrameViewProps } from "./portal-frame-view";
import { usePortalFrame, PortalFrameProps } from "./usePortalFrame";

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

  @Prop() includeDropdown: boolean;
  @Prop() headertext: string;
  @Prop() description: string;

  @Prop() dashboardPath: string;
  @Prop() profilePath: string;
  @Prop() logoutPath: string;

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  render() {
    const props = isDemo() ? usePortalFrameDemo(this) : usePortalFrame(this);
    return (
      <PortalFrameView {...props}>
        <slot />
      </PortalFrameView>
    );
  }
}

function usePortalFrameDemo(props: PortalFrameProps): PortalFrameViewProps {
  return {
    states: {
      includeDropdown: true,
      styles: {
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
    ref: { current: undefined },
  };
}
