import { isDemo, navigation } from "@saasquatch/component-boilerplate";
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

  @Prop()
  emailLabel = "Email";

  @Prop()
  submitLabel = "Request Password Reset";

  constructor() {
    withHooks(this);
  }

  disconnectedCallback() {}

  render() {
    const { states, callbacks } = isDemo()
      ? usePortalForgotPasswordDemo(this)
      : usePortalForgotPassword(this);

    const content = {
      secondaryButton: (
        <slot name="secondaryButton">
          <sl-button
            type="text"
            disabled={states.loading}
            onClick={() => navigation.push("/login")}
          >
            Sign In
          </sl-button>
        </slot>
      ),
      messageSlot: (
        <slot name="messageSlot">
          <p>Enter your email below to receive a password reset link.</p>
        </slot>
      ),
      emailLabel: this.emailLabel,
      submitLabel: this.submitLabel,
    };
    return (
      <PortalForgotPasswordView
        states={states}
        callbacks={callbacks}
        content={content}
      />
    );
  }
}
function usePortalForgotPasswordDemo({
  nextPageUrlParameter,
}): Partial<PortalForgotPasswordViewProps> {
  return {
    states: { error: "", loading: false, success: false },
    callbacks: {
      submit: async (_event) => {
        nextPageUrlParameter;
      },
    },
  };
}
