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
 * @uiName Portal Forgot Password
 */
@Component({
  tag: "sqm-portal-forgot-password",
  shadow: true,
})
export class PortalForgotPassword {
  @State()
  ignored = true;

  /**
   * @uiName Base path of reset password email link
   */
  @Prop()
  redirectPath: string = "/resetPassword";

  /**
   * @uiName Email label
   */
  @Prop()
  emailLabel: string = "Email";

  /**
   * @uiName Password reset button text
   */
  @Prop()
  submitLabel: string = "Request Password Reset";

  /**
   * @uiName Routing path to login page
   */
  @Prop() loginPath: string = "/login";

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
