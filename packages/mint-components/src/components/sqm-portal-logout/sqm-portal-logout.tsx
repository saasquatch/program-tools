import { isDemo } from "@saasquatch/component-boilerplate";
import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, Prop, State } from "@stencil/core";
import { usePortalLogout } from "./usePortalLogout";

/**
 * @uiName Microsite Logout
 * @compatibility Built for instant access
 */
@Component({
  tag: "sqm-portal-logout",
  shadow: true,
})
export class PortalLogout {
  @State()
  ignored = true;

  /**
   * Redirect participants to this page when they log out.
   *
   * @uiName Logout Redirect Path
   * @uiWidget pageSelect
   */
  @Prop()
  nextPage: string = "/";

  constructor() {
    withHooks(this);
  }

  disconnectedCallback() {}

  render() {
    isDemo() ? useLogoutDemo(this) : usePortalLogout(this);
  }
}

function useLogoutDemo({}): void {}
