import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Prop } from "@stencil/core";
import { DemoData } from "../../../global/demo";
import { getProps } from "../../../utils/utils";
import {
  WidgetCodeVerificationView,
  WidgetCodeVerificationViewProps,
} from "./sqm-code-verification-view";
import { useCodeCheck } from "./useCodeVerification";

@Component({
  tag: "sqm-code-verification",
  shadow: true,
})
export class WidgetCodeVerification {
  @Prop() cashVerifyHeaderText: string = "Cash Payouts";
  @Prop() verifyCodeSubHeaderText: string = "Enter the code sent to {email}.";
  @Prop() reverifyCodeSubHeaderText: string =
    "Enter the code sent to {email} from our referral provider, impact.com.";
  @Prop() resendVerifyCodeText: string =
    "Didn't receive your code? Resend Code";
  @Prop() useDifferentEmailText: string = "Use a different email";

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
    const props = useCodeCheck(this);

    return (
      <WidgetCodeVerificationView {...props} />
      // <div ref={props.setCodeRef}>
      //   <input width={"24px"} name="code" />
      //   <input width={"24px"} name="code" />
      //   <input width={"24px"} name="code" />
      //   <input width={"24px"} name="code" />
      //   <input width={"24px"} name="code" />
      //   <hr />
      //   <button onClick={props.onCheckCode}>Check code</button>
      //   {props.validationError && (
      //     <span color="red">INVALID CODE AHHHHHHHHh</span>
      //   )}
      //   <hr />
      //   <div>
      //     <span>Didn't get an email?</span>
      //     <button onClick={props.resendEmail}>
      //       {props.resendLoading ? "Loading" : "Resend email"}
      //     </button>
      //   </div>
      // </div>
    );
  }
}
