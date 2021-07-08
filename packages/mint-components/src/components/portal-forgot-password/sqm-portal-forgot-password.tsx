import { isDemo } from "@saasquatch/component-boilerplate";
import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Prop, State } from "@stencil/core";
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

  @Prop()
  nextPageUrlParameter = "nextPage";

  constructor() {
    withHooks(this);
  }

  disconnectedCallback() {}

  render() {
    const { states, callbacks } =
      false && isDemo()
        ? usePortalForgotPasswordDemo(this)
        : usePortalForgotPassword(this);
    return <PortalForgotPasswordView states={states} callbacks={callbacks} />;
  }
}
function usePortalForgotPasswordDemo({
  nextPageUrlParameter,
}): PortalForgotPasswordViewProps {
  return {
    states: { error: "", loading: false, success: false },
    callbacks: {
      submit: async (_event) => {
        nextPageUrlParameter;
      },
    },
  };
}
