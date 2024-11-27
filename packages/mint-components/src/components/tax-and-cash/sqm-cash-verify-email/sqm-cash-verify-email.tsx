import { isDemo } from "@saasquatch/component-boilerplate";
import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Prop, State } from "@stencil/core";
import deepmerge from "deepmerge";
// import { DemoData } from "../../global/demo";
import {
  CashVerifyEmailView,
  CashVerifyEmailViewProps,
} from "./sqm-cash-verify-email-view";
// import { usePortalVerifyEmail } from "./usePortalVerifyEmail";
import { getProps } from "../../../utils/utils";
import { DemoData } from "../../../global/demo";

/**
 * @uiName Microsite Verify Email
 */
@Component({
  tag: "sqm-cash-verify-email",
  shadow: true,
})
export class CashVerifyEmail {
  @State()
  ignored = true;

  @Prop()
  cashVerifyHeaderText: string = "Cash Payouts";
  @Prop()
  cashVerifySubHeaderText: string =
    "To receive your cash payouts, we’ll send a code to your email through our referral provider, impact.com.";
  @Prop()
  verifyCodeSubHeaderText: string = "Enter the code sent to {email}.";
  @Prop()
  reverifyCodeSubHeaderText: string =
    "Enter the code sent to {email} from our referral provider, impact.com.";
  @Prop()
  resendVerifyCodeText: string = "Didn't receive your code? Resend Code";
  @Prop()
  useDifferentEmailText: string = "Use a different email";
  /**
   * @uiName Email input label
   */
  @Prop()
  email: string = "Email";

  /**
   * @uiName Verify email text
   * @uiWidget textArea
   */
  @Prop()
  verifyText: string = "Verify";
  /**
   * @uiName Send code button text
   */
  @Prop()
  sendCodeText: string = "Send code";

  /**
   * @uiName Email verification invalid text
   * @uiWidget textArea
   */
  @Prop() verifyInvalidText: string =
    "The email verification code is invalid or has expired, please try again.";

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
  @Prop() demoData?: DemoData<CashVerifyEmailViewProps>;

  constructor() {
    withHooks(this);
  }

  disconnectedCallback() {}

  getTextProps() {
    const props = getProps(this);
    return {
      ...props,
    };
  }

  render() {
    const { states, data, callbacks, text } = useCashVerifyEmailDemo(this);
    return (
      <CashVerifyEmailView
        states={states}
        data={data}
        callbacks={callbacks}
        text={text}
      />
    );
  }
}
function useCashVerifyEmailDemo(
  props: CashVerifyEmail
): CashVerifyEmailViewProps {
  return deepmerge(
    {
      states: {
        error: "",
        loading: false,
        verified: false,
        email: "",
        codeSent: false,
      },
      data: {
        oobCode: "code",
      },
      callbacks: {
        failed: () => {
          console.log("failed");
        },
        gotoNextPage: () => {},
      },
      text: props.getTextProps(),
    },
    props.demoData || {},
    { arrayMerge: (_, a) => a }
  );
}
