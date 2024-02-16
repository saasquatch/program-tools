import { isDemo } from "@saasquatch/component-boilerplate";
import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Prop, State } from "@stencil/core";
import deepmerge from "deepmerge";
import { DemoData } from "../../global/demo";
import {
  PortalEmailVerificationView,
  PortalEmailVerificationViewProps,
} from "./sqm-portal-email-verification-view";
import { usePortalEmailVerification } from "./usePortalEmailVerification";

/**
 * @uiName Microsite Email Verification
 */
@Component({
  tag: "sqm-portal-email-verification",
  shadow: true,
})
export class PortalEmailVerification {
  @State()
  ignored = true;

  /**
   * Redirect participants to this page from their verification email.
   *
   * @uiName Email redirect
   * @uiWidget pageSelect
   */
  @Prop()
  redirectPath: string = "/verifyEmail";

  /**
   * @uiName Email verification header text
   */
  @Prop() emailVerificationHeader: string = "Verify your email";

  /**
   * @uiName Re-send email button text
   */
  @Prop() resendEmailButtonText: string = "Re-send Email";

  /**
   * @uiName Email verification body text
   * @uiWidget textArea
   */
  @Prop() verifyMessage: string =
    "A verification email was sent to {email}. Please verify your email to continue to the portal. Resending an email will invalidate the previous email.";

  /**
   * @uiName Email verification status text
   * @uiWidget textArea
   */
  @Prop() verificationStatusMessage: string =
    "Checking verification status in {countdown}";

  /**
   * @uiName Email verification checking text
   * @uiWidget textArea
   */
  @Prop() verificationLoadingMessage: string = "Checking verification status";

  /**
   * @uiName Email verification resent text
   * @uiWidget textArea
   */
  @Prop() verificationResentMessage: string =
    "Your verification email has been resent successfully";

  /**
   * @uiName Network error message
   * Displayed when your verification email fails to send due to a network error. The participant can try refreshing the page.
   */
  @Prop() networkErrorMessage: string =
    "An error occurred while verifying your password. Please refresh the page.";

  /**
   * @undocumented
   * @uiType object
   */
  @Prop() demoData?: DemoData<PortalEmailVerificationViewProps>;

  constructor() {
    withHooks(this);
  }

  disconnectedCallback() {}

  render() {
    const { states, callbacks, content } = isDemo()
      ? usePortalEmailVerificationDemo(this)
      : usePortalEmailVerification(this);
    return (
      <PortalEmailVerificationView
        states={states}
        callbacks={callbacks}
        content={content}
      />
    );
  }
}
function usePortalEmailVerificationDemo(
  props: PortalEmailVerification
): PortalEmailVerificationViewProps {
  return deepmerge(
    {
      states: { error: "", loading: false, success: false, countdown: 10 },
      callbacks: {
        submit: async (_event) => {},
      },
      content: {
        email: "test@example.com",
        verifyMessage: props.verifyMessage,
        emailVerificationHeader: props.emailVerificationHeader,
        resendEmailButtonText: props.resendEmailButtonText,
        verificationLoadingMessage: props.verificationLoadingMessage,
        verificationStatusMessage: props.verificationStatusMessage,
        verificationResentMessage: props.verificationResentMessage,
      },
    },
    props.demoData || {},
    { arrayMerge: (_, a) => a }
  );
}
