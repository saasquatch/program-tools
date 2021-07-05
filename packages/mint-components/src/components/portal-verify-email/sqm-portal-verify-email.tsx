import { isDemo } from "@saasquatch/component-boilerplate";
import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, State } from "@stencil/core";
import {
  PortalVerifyEmailView,
  PortalVerifyEmailViewProps,
} from "./sqm-portal-verify-email-view";
import { usePortalVerifyEmail } from "./usePortalVerifyEmail";

/**
 * @uiName Portal Verify Email
 */
@Component({
  tag: "sqm-portal-verify-email",
  styleUrl: "sqm-portal-verify-email.scss",
  shadow: true,
})
export class PortalVerifyEmail {
  @State()
  ignored = true;

  constructor() {
    withHooks(this);
  }

  disconnectedCallback() {}

  render() {
    const { states, callbacks } =
      false && isDemo() ? usePortalVerifyEmailDemo() : usePortalVerifyEmail();
    return <PortalVerifyEmailView states={states} callbacks={callbacks} />;
  }
}
function usePortalVerifyEmailDemo(): PortalVerifyEmailViewProps {
  return {
    states: { error: "", loading: false, verified: false },
    callbacks: { verify: () => {} },
  };
}
