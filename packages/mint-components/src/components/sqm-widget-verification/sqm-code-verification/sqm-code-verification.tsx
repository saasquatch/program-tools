import { isDemo } from "@saasquatch/component-boilerplate";
import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Prop } from "@stencil/core";
import deepmerge from "deepmerge";
import { DemoData } from "../../../global/demo";
import { getProps } from "../../../utils/utils";
import {
  WidgetCodeVerificationView,
  WidgetCodeVerificationViewProps,
} from "./sqm-code-verification-view";
import { useWidgetCodeVerification } from "./useCodeVerification";

@Component({
  tag: "sqm-code-verification",
  shadow: true,
})
export class WidgetCodeVerification {
  /**
   * @uiName Verify widget header text
   */
  @Prop() cashVerifyHeaderText: string = "Cash Payout and Tax Settings";
  @Prop() verifyCodeSubHeaderText: string = "Enter the code sent to {email}.";
  @Prop() reverifyCodeSubHeaderText: string =
    "Enter the code sent to {email} from our referral provider, impact.com.";
  @Prop() resendVerifyCodeText: string =
    "Didn't receive your code? Resend Code";
  @Prop() useDifferentEmailText: string = "Use a different email";
  @Prop() invalidCodeText: string = "The code you have entered is invalid.";

  /**
   * @uiName Email input label
   */
  @Prop()
  email: string = "Email";

  /**
   * @uiName Verify code text
   * @uiWidget textArea
   */
  @Prop()
  verifyText: string = "Verify";

  /**
   * @uiName Network error message
   * Displayed when the email verification fails due to a network error. The participant can try refreshing the page.
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
  return deepmerge(
    {
      states: {
        loading: false,
        email: "",
        verifyFailed: false,
      },
      refs: {
        codeWrapperRef: () => {},
      },
      callbacks: {
        submitCode: async () => {},
      },
      text: props.getTextProps(),
    },
    props.demoData || {},
    { arrayMerge: (_, a) => a }
  );
}
