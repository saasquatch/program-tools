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
   * @uiName Email Redirect
   * @uiWidget pageSelect
   */
  @Prop()
  redirectPath: string = "/resetPassword";

  /**
   * @uiName Email Field Label
   */
  @Prop()
  emailLabel: string = "Email";

  /**
   * @uiName Password Reset Button Text
   */
  @Prop()
  submitLabel: string = "Request Password Reset";

  /**
   * @uiName Login Redirect Path
   * @uiWidget pageSelect
   */
  @Prop() loginPath: string = "/login";

  /**
   * @uiName Header Text
   * @uiWidget textArea
   */
  @Prop() headerText: string =
    "Enter your email below to receive a password reset link.";

  /**
   * Sign In Link Text
   */
  @Prop() loginText: string = "Sign In";

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
            Sign In
          </sl-button>
        </slot>
      ),
      messageSlot: (
        <slot name="messageSlot">
          Enter your email below to receive a password reset link.
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
