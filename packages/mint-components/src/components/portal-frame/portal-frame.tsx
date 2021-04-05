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
   * @uiName Include dropdown menu
   */
  @Prop() includeDropdown: boolean;
  /**
   * @uiName Heading text
   */
  @Prop() headertext: string;
  /**
   * @uiName Description text
   */
  @Prop() description: string;
  /**
   * @uiName Path to dashboard
   */
  @Prop() dashboardPath: string;
  /**
   * @uiName Path to profile
   */
  @Prop() profilePath: string;
  /**
   * @uiName Path to logout
   */
  @Prop() logoutPath: string;
  /**
   * @uiName Label for the logout entry of header menu
   */
  @Prop() logoutLabel: string;
  /**
   * @uiName Label for the dashboard entry of header menu
   */
  @Prop() dashboardLabel: string;
  /**
   * @uiName Label for the edit profile entry of header menu
   */
  @Prop() editProfileLabel: string;
  /**
   * @uiName Label on the header menu
   */
  @Prop() menuLabel: string;

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
      includeDropdown: true,
      styles: {
        ...props,
        headertext: "Portal Heading",
        description: "Portal Description",
        logoutLabel: "Logout",
        menuLabel: "Menu",
        editProfileLabel: "Edit Profile",
        dashboardLabel: "Dashboard"
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
