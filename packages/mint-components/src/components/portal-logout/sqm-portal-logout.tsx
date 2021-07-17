import { isDemo } from "@saasquatch/component-boilerplate";
import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, Prop, State } from "@stencil/core";
import { usePortalLogout } from "./usePortalLogout";

/**
 * @uiName Portal Logout
 */
@Component({
  tag: "sqm-portal-logout",
  shadow: true,
})
export class PortalLogout {
  @State()
  ignored = true;

  @Prop()
  nextPage = "/";

  constructor() {
    withHooks(this);
  }

  disconnectedCallback() {}

  render() {
    isDemo() ? useLogoutDemo(this) : usePortalLogout(this);
  }
}
function useLogoutDemo({}): void {}
