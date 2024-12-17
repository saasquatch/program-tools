import { isDemo, useSetParent } from "@saasquatch/component-boilerplate";
import { useState, withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Prop } from "@stencil/core";
import deepmerge from "deepmerge";
import { DemoData } from "../../../global/demo";
import { getProps } from "../../../utils/utils";
import {
  WidgetCodeVerificationView,
  WidgetCodeVerificationViewProps,
} from "./sqm-code-verification-view";
import { useWidgetCodeVerification } from "./useCodeVerification";
import { SHOW_CODE_NAMESPACE, VERIFICATION_PARENT_NAMESPACE } from "../keys";

@Component({
  tag: "sqm-code-verification",
  shadow: true,
})
export class WidgetCodeVerification {
  /**
   * @uiName Verify code widget header text
   */
  @Prop() verifyCodeHeaderText: string =
    "Enter the code sent to {email} from our referral provider, impact.com.";
  /**
   * @uiName Reverify code widget header text
   */
  @Prop() reverifyCodeHeaderText: string =
    "Enter the code sent to {email} from our referral provider, impact.com.";
  /**
   * Text displayed under verify button
   * @uiName Resend code text
   */
  @Prop() resendCodeText: string = "Didn't receive your code? {resendCodeLink}";
  /**
   * The link that appears in the resend code link
   * @uiName Resend code label
   */
  @Prop() resendCodeLabel: string = "Resend code";
  /**
   * Link text displayed under verify button
   * @uiName Resend code text
   */
  @Prop() codeResentSuccessfullyText: string =
    "Another code has been sent to {email}";
  /**
   * Error text displayed under verification input
   * @uiName Invalid code text
   */
  @Prop() invalidCodeText: string =
    "Please check your code and try again. If you’re still having trouble, try resending your code.";
  /**
   * @uiName Verify code button text
   */
  @Prop()
  verifyText: string = "Verify";
  /**
   * Displayed when the email verification fails due to a network error. The participant can try refreshing the page.
   * @uiName Network error message
   */
  @Prop() networkErrorMessage: string =
    "An error occurred while verifying your email. Please refresh the page and try again.";

  /**
   * @undocumented
   * @uiType object
   */
  @Prop() demoData?: DemoData<WidgetCodeVerificationViewProps>;

  constructor() {
    withHooks(this);
  }

  disconnectedCallback() {}

  getTextProps() {
    return getProps(this);
  }

  render() {
    const props = isDemo()
      ? useDemoWidgetCodeVerification(this)
      : useWidgetCodeVerification(this);

    return <WidgetCodeVerificationView {...props} />;
  }
}

function useDemoWidgetCodeVerification(
  props: WidgetCodeVerification
): WidgetCodeVerificationViewProps {
  const [emailResent, setEmailResent] = useState(false);
  const setVerifiedContext = useSetParent(VERIFICATION_PARENT_NAMESPACE);

  return deepmerge(
    {
      states: {
        loading: false,
        email: "test@example.com",
        emailResent,
        resendError: true,
        verifyFailed: true,
      },
      refs: {
        codeWrapperRef: () => {},
      },
      callbacks: {
        resendEmail: async () => setEmailResent(true),
        submitCode: async () => setVerifiedContext({ token: "TOKEN" }),
      },
      text: props.getTextProps(),
    },
    props.demoData || {},
    { arrayMerge: (_, a) => a }
  );
}
