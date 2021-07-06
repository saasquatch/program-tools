import { isDemo } from "@saasquatch/component-boilerplate";
import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, State } from "@stencil/core";
import {
  PortalResetPasswordView,
  PortalResetPasswordViewProps,
} from "./sqm-portal-reset-password-view";
import { usePortalResetPassword } from "./usePortalResetPassword";

/**
 * @uiName Portal Reset Password
 */
@Component({
  tag: "sqm-portal-reset-password",
  styleUrl: "sqm-portal-reset-password.scss",
  shadow: true,
})
export class PortalResetPassword {
  @State()
  ignored = true;

  constructor() {
    withHooks(this);
  }

  disconnectedCallback() {}

  render() {
    const { states, refs } =
      false && isDemo()
        ? usePortalResetPasswordDemo()
        : usePortalResetPassword();
    return <PortalResetPasswordView states={states} refs={refs} />;
  }
}
function usePortalResetPasswordDemo(): PortalResetPasswordViewProps {
  return {
    states: { error: "", loading: false, reset: false },
    refs: { formRef: (_node) => {} },
  };
}
