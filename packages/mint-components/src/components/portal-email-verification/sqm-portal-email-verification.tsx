import { isDemo } from "@saasquatch/component-boilerplate";
import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Prop, State } from "@stencil/core";
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

  @Prop()
  nextPageUrlParameter = "nextPage";

  constructor() {
    withHooks(this);
  }

  disconnectedCallback() {}

  render() {
    const { states, callbacks } =
      false && isDemo()
        ? usePortalEmailVerificationDemo(this)
        : usePortalEmailVerification(this);
    return (
      <PortalEmailVerificationView states={states} callbacks={callbacks} />
    );
  }
}
function usePortalEmailVerificationDemo({
  nextPageUrlParameter,
}): PortalEmailVerificationViewProps {
  return {
    states: { error: "", loading: false, success: false },
    callbacks: {
      submit: async (_event) => {
        nextPageUrlParameter;
      },
    },
  };
}
