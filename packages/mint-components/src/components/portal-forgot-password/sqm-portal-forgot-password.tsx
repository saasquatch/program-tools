import { isDemo } from "@saasquatch/component-boilerplate";
import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, State } from "@stencil/core";
import {
  PortalForgotPasswordView,
  PortalForgotPasswordViewProps,
} from "./sqm-portal-forgot-password-view";
import { usePortalForgotPassword } from "./usePortalForgotPassword";

/**
 * @uiName Portal Forgot Password
 */
@Component({
  tag: "sqm-portal-forgot-password",
  styleUrl: "sqm-portal-forgot-password.scss",
  shadow: true,
})
export class PortalForgotPassword {
  @State()
  ignored = true;

  constructor() {
    withHooks(this);
  }

  disconnectedCallback() {}

  render() {
    const { states, refs } =
      false && isDemo()
        ? usePortalForgotPasswordDemo()
        : usePortalForgotPassword();
    return <PortalForgotPasswordView states={states} refs={refs} />;
  }
}
function usePortalForgotPasswordDemo(): PortalForgotPasswordViewProps {
  return {
    states: { error: "", loading: false },
    refs: { formRef: {} },
  };
}
