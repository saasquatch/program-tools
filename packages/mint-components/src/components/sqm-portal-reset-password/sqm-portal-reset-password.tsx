import { isDemo } from "@saasquatch/component-boilerplate";
import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Prop, State } from "@stencil/core";
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
  shadow: true,
})
export class PortalResetPassword {
  @State()
  ignored = true;

  @Prop()
  nextPage = "/";

  @Prop()
  nextPageUrlParameter = "nextPage";

  @Prop()
  confirmPassword: boolean = false;

  constructor() {
    withHooks(this);
  }

  disconnectedCallback() {}

  render() {
    const { states, callbacks } = isDemo()
      ? usePortalResetPasswordDemo(this)
      : usePortalResetPassword(this);
    return <PortalResetPasswordView states={states} callbacks={callbacks} />;
  }
}
function usePortalResetPasswordDemo({
  nextPage,
  nextPageUrlParameter,
}): PortalResetPasswordViewProps {
  return {
    states: {
      error: "",
      loading: false,
      reset: false,
      confirmPassword: true,
      oobCodeValidating: false,
      oobCodeValid: true,
    },
    callbacks: {
      submit: async (_event: any) => {
        nextPage;
        nextPageUrlParameter;
      },
      failed: () => {},
      gotoNextPage: () => {},
    },
  };
}
