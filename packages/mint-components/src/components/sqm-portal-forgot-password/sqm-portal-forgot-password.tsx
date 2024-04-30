import { isDemo, navigation } from "@saasquatch/component-boilerplate";
import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Prop, State } from "@stencil/core";
import deepmerge from "deepmerge";
import { DemoData } from "../../global/demo";
import {
  PortalForgotPasswordView,
  PortalForgotPasswordViewProps,
} from "./sqm-portal-forgot-password-view";
import { usePortalForgotPassword } from "./usePortalForgotPassword";

/**
 * @uiName Microsite Forgot Password
 */
@Component({
  tag: "sqm-portal-forgot-password",
  shadow: true,
})
export class PortalForgotPassword {
  @State()
  ignored = true;

  /**
   * Redirect participants to this page after they verify their email.
   *
   * @uiName Email redirect
   * @uiWidget pageSelect
   */
  @Prop()
  redirectPath: string = "/resetPassword";

  /**
   * @uiName Email field label
   */
  @Prop()
  emailLabel: string = "Email";

  /**
   * @uiName Password reset button text
   */
  @Prop()
  submitLabel: string = "Request Password Reset";

  /**
   * @uiName Login redirect path
   * @uiWidget pageSelect
   */
  @Prop() loginPath: string = "/login";

  /**
   * @uiName Header text
   * @uiWidget textArea
   */
  @Prop() headerText: string =
    "Enter your email below to receive a password reset link.";

  /**
   * @uiName Sign in link text
   */
  @Prop() loginText: string = "Sign In";

  /**
   * @uiName Network error message
   * Displayed when the forgot password action fails due to a network error. The participant can try refreshing the page.
   */
  @Prop() networkErrorMessage: string =
    "An error occurred while loading this page. Please refresh the page.";

  /**
   * @uiName Email verification sent text
   */
  @Prop() successAlertText: string =
    "If an account with that email exists, a password reset email will be sent.";

  /**
   * @undocumented
   * @uiType object
   */
  @Prop() demoData?: DemoData<PortalForgotPasswordViewProps>;

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
            onClick={() => navigation.push(states.loginPath)}
          >
            {this.loginText}
          </sl-button>
        </slot>
      ),
      messageSlot: <slot name="messageSlot">{this.headerText}</slot>,
      emailLabel: this.emailLabel,
      submitLabel: this.submitLabel,
      successAlertText: this.successAlertText,
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
function usePortalForgotPasswordDemo(
  props: PortalForgotPassword
): Partial<PortalForgotPasswordViewProps> {
  return deepmerge(
    {
      states: { error: "", loading: false, success: false },
      callbacks: {
        submit: async (_event) => {},
      },
    },
    props.demoData || {},
    { arrayMerge: (_, a) => a }
  );
}
