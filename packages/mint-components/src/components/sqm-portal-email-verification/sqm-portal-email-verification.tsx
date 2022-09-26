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
   * @uiName Email Redirect
   * @uiWidget pageSelect
   */
  @Prop()
  redirectPath: string = "/verifyEmail";

  /**
   * @uiName Email Verification Header Text
   */
  @Prop() emailVerificationHeader: string = "Verify your email";

  /**
   * @uiName Re-send Email Button Text
   */
  @Prop() resendEmailButtonText: string = "Re-send Email";

  /**
   * @uiName Email Verification Body Text
   * @uiWidget textArea
   */
  @Prop() verifyMessage: string =
    "A verification email was sent to {email}. Please verify your email to continue to the portal. Resending an email will invalidate the previous email.";

  /**
   * @uiName Email Verification Status Text
   * @uiWidget textArea
   */
  @Prop() verificationStatusMessage: string =
    "Check verification status in {countdown}";

  /**
   * @uiName Email Verification Checking Text
   * @uiWidget textArea
   */
  @Prop() verificationLoadingMessage: string = "Verification status refreshing";

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
      states: { error: "", loading: false, success: false },
      callbacks: {
        submit: async (_event) => {},
      },
      content: {
        email: "test@example.com",
        verifyMessage:
          "A verification email was sent to {email}. Please verify your email to continue to the portal.",
        emailVerificationHeader: "Verify your email",
        resendEmailButtonText: "Re-send Email",
        verificationLoadingMessage: props.verificationLoadingMessage,
        verificationStatusMessage: props.verificationStatusMessage,
      },
    },
    props.demoData || {},
    { arrayMerge: (_, a) => a }
  );
}
