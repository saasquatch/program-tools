import { isDemo } from "@saasquatch/component-boilerplate";
import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Prop, State } from "@stencil/core";
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
  shadow: true,
})
export class PortalVerifyEmail {
  @State()
  ignored = true;

  @Prop()
  nextPage = "/";

  @Prop()
  nextPageUrlParameter = "nextPage";

  constructor() {
    withHooks(this);
  }

  disconnectedCallback() {}

  render() {
    const { states, callbacks } = isDemo()
      ? usePortalVerifyEmailDemo(this)
      : usePortalVerifyEmail(this);
    return <PortalVerifyEmailView states={states} callbacks={callbacks} />;
  }
}
function usePortalVerifyEmailDemo({
  nextPage,
  nextPageUrlParameter,
}): PortalVerifyEmailViewProps {
  return {
    states: { error: "", loading: false, verified: false },
    callbacks: {
      failed: () => {
        nextPage;
        nextPageUrlParameter;
      },
      gotoNextPage: () => {},
    },
  };
}
