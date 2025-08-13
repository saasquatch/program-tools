import {
  isDemo,
  useParentState,
  useSetParent,
} from "@saasquatch/component-boilerplate";
import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Prop } from "@stencil/core";
import deepmerge from "deepmerge";
import { parseStates } from "../../utils/parseStates";
import { getProps } from "../../utils/utils";
import { extractProps } from "../tax-and-cash/sqm-tax-and-cash/extractProps";
import {
  SHOW_CODE_NAMESPACE,
  VERIFICATION_EMAIL_NAMESPACE,
  VERIFICATION_PARENT_NAMESPACE,
} from "./keys";
import { useWidgetVerification } from "./useWidgetVerification";

/**
 * @uiName Widget Verification Flow
 */
@Component({
  tag: "sqm-widget-verification",
  shadow: true,
})
export class WidgetVerification {
  // ! Any updated must be reflected in sqm-widget-verification-internal AND sqm-email-verification AND sqm-code-verification
  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                  GENERAL PROPS
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  /**
   * @uiName General verify widget header text
   * @uiGroup General Text
   */
  @Prop()
  general_verifyEmailHeader = "Verify your email";
  /**
   * @uiName General verify widget description text
   * @uiGroup General Text
   */
  @Prop()
  general_verifyEmailDescription =
    "To get your cash paid out directly to your bank account, please complete your account setup";
  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                  EMAIL STEP PROPS
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  /**
   * @uiName Verify email widget header text
   * @uiGroup Email Verification Step
   */
  @Prop()
  emailStep_verifyEmailHeaderText: string =
    "Start by verifying your email. We’ll send you a code through our referral provider, impact.com.";
  /**
   * @uiName Send code to email alert header
   * @uiGroup Email Verification Step
   */
  @Prop()
  emailStep_sendCodeErrorHeader: string =
    "There was an error sending your code.";
  /**
   * @uiName Send code to email alert description
   * @uiGroup Email Verification Step
   */
  @Prop()
  emailStep_sendCodeErrorDescription: string =
    "Please try again. If this problem continues, contact our program support team.";
  /**
   * @uiName Email input label
   * @uiGroup Email Verification Step
   */
  @Prop()
  emailStep_emailLabel: string = "Email";
  /**
   * @uiName Send code button text
   * @uiGroup Email Verification Step
   */
  @Prop()
  emailStep_sendCodeText: string = "Send code";
  /**
   * @uiName Send code button text
   * @uiGroup Email Verification Step
   */
  @Prop()
  emailStep_emailValidationErrorText: string = "Please enter a valid email";

  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                  EMAIL STEP PROPS
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  /**
   * @uiName Verify code widget header text
   * @uiGroup Code Verification Step
   */
  @Prop() codeStep_verifyCodeHeaderText: string =
    "Enter the code sent to {email} from our referral provider, impact.com.";
  /**
   * @uiName Reverify code widget header text
   * @uiGroup Code Verification Step
   */
  @Prop() codeStep_reverifyCodeHeaderText: string =
    "Enter the code sent to {email} from our referral provider, impact.com.";
  /**
   * Text displayed under verify button
   * @uiName Resend code text
   * @uiGroup Code Verification Step
   */
  @Prop() codeStep_resendCodeText: string =
    "Didn't receive your code? {resendCodeLink}";
  /**
   * The link that appears in the resend code link
   * @uiName Resend code label
   * @uiGroup Code Verification Step
   */
  @Prop() codeStep_resendCodeLabel: string = "Resend code";
  /**
   * Link text displayed under verify button
   * @uiName Resend code text
   * @uiGroup Code Verification Step
   */
  @Prop() codeStep_codeResentSuccessfullyText: string =
    "Another code has been sent to {email}";
  /**
   * Error text displayed under verification input
   * @uiName Invalid code text
   * @uiGroup Code Verification Step
   */
  @Prop() codeStep_invalidCodeText: string =
    "Please check your code and try again. If you’re still having trouble, try resending your code.";
  /**
   * @uiName Verify code button text
   * @uiGroup Code Verification Step
   */
  @Prop() codeStep_verifyText: string = "Verify";
  /**
   * Displayed when the email verification fails due to a network error. The participant can try refreshing the page.
   * @uiName Network error message
   * @uiGroup Code Verification Step
   */
  @Prop() codeStep_networkErrorMessage: string =
    "An error occurred while verifying your email. Please refresh the page and try again.";

  /**
   * @undocumented
   * @componentState { "title": "Step 1: Enter email", "props": { "showCode": false }, "dependencies": ["sqm-email-verification"], "uiGroup": "Email Verification Step" }
   * @componentState { "title": "Step 2: Enter code", "props": { "showCode": true }, "dependencies": ["sqm-code-verification"], "uiGroup": "Code Verification Step" }
   */
  @Prop() stateController: string = "{}";

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  getStepTextProps<T extends string>(prefix: T) {
    const props = getProps(this);
    return extractProps(props, prefix);
  }

  render() {
    const props = isDemo()
      ? useDemoWidgetVerificationInternal(this)
      : useWidgetVerification();

    if (props.loading) return <sl-spinner></sl-spinner>;

    const generalText = this.getStepTextProps("general_");

    return (
      <div>
        <h3 style={{ fontSize: "24px", margin: "0" }}>
          {generalText.verifyEmailHeader}
        </h3>
        <p
          style={{
            color: "var(--sl-color-neutral-500)",
            fontSize: "var(--sl-font-size-medium)",
            margin: "0",
          }}
        >
          {generalText.verifyEmailDescription}
        </p>
        {props.showCode ? (
          <sqm-code-verification
            onVerification={props.onVerification}
            {...this.getStepTextProps("codeStep_")}
            {...extractProps(props, "sqm-code-verification_")}
          ></sqm-code-verification>
        ) : (
          <sqm-email-verification
            {...this.getStepTextProps("emailStep_")}
            {...extractProps(props, "sqm-email-verification_")}
          ></sqm-email-verification>
        )}
      </div>
    );
  }
}

function useDemoWidgetVerificationInternal(props: WidgetVerification) {
  const [showCode, setShowCode] = useParentState<boolean>({
    namespace: SHOW_CODE_NAMESPACE,
    initialValue: false,
  });
  const [email, setEmail] = useParentState<string | undefined>({
    namespace: VERIFICATION_EMAIL_NAMESPACE,
    initialValue: undefined,
  });
  const setContext = useSetParent(VERIFICATION_PARENT_NAMESPACE);

  const states = parseStates(props.stateController);
  const formatted = Object.keys(states).reduce(
    (prev, key) =>
      key === "sqm-widget-verification"
        ? { ...prev, ...states[key] }
        : { ...prev, [`${key}_stateController`]: states[key] },
    {}
  );

  const onVerification = () => {
    setContext(true);
  };

  return deepmerge(
    { showCode, onVerification, loading: false },
    formatted || {},
    { arrayMerge: (_, a) => a }
  );
}
