import { isDemo } from "@saasquatch/component-boilerplate";
import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, State } from "@stencil/core";
import {
  PortalEmailVerificationView,
  PortalEmailVerificationViewProps,
} from "./sqm-portal-email-verification-view";
import { usePortalEmailVerification } from "./usePortalEmailVerification";

/**
 * @uiName Portal Email Verification
 */
@Component({
  tag: "sqm-portal-email-verification",
  styleUrl: "sqm-portal-email-verification.scss",
  shadow: true,
})
export class PortalEmailVerification {
  @State()
  ignored = true;

  constructor() {
    withHooks(this);
  }

  disconnectedCallback() {}

  render() {
    const { states, refs } =
      false && isDemo()
        ? usePortalEmailVerificationDemo()
        : usePortalEmailVerification();
    return <PortalEmailVerificationView states={states} refs={refs} />;
  }
}
function usePortalEmailVerificationDemo(): PortalEmailVerificationViewProps {
  return {
    states: { error: "", loading: false },
    refs: { formRef: {} },
  };
}
