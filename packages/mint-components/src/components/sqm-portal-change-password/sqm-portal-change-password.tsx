import { Component, h, State } from "@stencil/core";
import { withHooks } from "@saasquatch/stencil-hooks";
import { PortalChangePasswordView } from "./sqm-portal-change-password-view";
import { usePortalChangePassword } from "./usePortalChangePassword";

/**
 * @uiName Portal Profile
 */
@Component({
  tag: "sqm-portal-change-password",
  shadow: true,
})
export class PortalChangePassword {
  @State()
  ignored = true;

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  render() {
    const { states, callbacks } = usePortalChangePassword(this);
    return <PortalChangePasswordView states={states} callbacks={callbacks} />;
  }
}
