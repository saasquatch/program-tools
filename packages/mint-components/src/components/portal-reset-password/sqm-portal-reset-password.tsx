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
  styleUrl: "sqm-portal-reset-password.scss",
  shadow: true,
})
export class PortalResetPassword {
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
      oobCodeValidating: false,
      oobCodeValid: true,
    },
    callbacks: {
      submit: async (_event) => {
        nextPage;
        nextPageUrlParameter;
      },
      continueCb: (_event) => {},
    },
  };
}
