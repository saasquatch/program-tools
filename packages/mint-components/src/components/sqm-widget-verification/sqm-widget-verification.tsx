import {
  isDemo,
  useLazyQuery,
  useParentState,
  useSetParent,
  useUserIdentity,
} from "@saasquatch/component-boilerplate";
import { useState, withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Prop } from "@stencil/core";
import {
  SHOW_CODE_NAMESPACE,
  VERIFICATION_EMAIL_NAMESPACE,
  VERIFICATION_PARENT_NAMESPACE,
} from "./keys";
import { getProps } from "../../utils/utils";
import { extractProps } from "../tax-and-cash/sqm-tax-and-cash/extractProps";
import { gql } from "graphql-request";
import { useEffect } from "@saasquatch/universal-hooks";

const USER_LOOKUP = gql`
  query checkUserVerification {
    viewer {
      ... on User {
        id
        accountId
        email
        emailVerified
        managedIdentity {
          email
          emailVerified
        }
      }
    }
  }
`;

function useWidgetVerificationInternal() {
  const userIdentity = useUserIdentity();
  const [showCode, setShowCode] = useParentState<boolean>({
    namespace: SHOW_CODE_NAMESPACE,
    initialValue: false,
  });
  const [email, setEmail] = useParentState<string | undefined>({
    namespace: VERIFICATION_EMAIL_NAMESPACE,
    initialValue: userIdentity?.email,
  });
  const setContext = useSetParent(VERIFICATION_PARENT_NAMESPACE);
  const [loading, setLoading] = useState(true);
  const [fetch] = useLazyQuery(USER_LOOKUP);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await fetch({});
        if (!res || res instanceof Error) throw new Error();

        if (res?.viewer?.emailVerified) setContext(true);
        else if (res?.viewer?.managedIdentity?.emailVerified) setContext(true);
      } catch (e) {
        console.error("Could not fetch user information:", e);
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, []);

  const onVerification = () => {
    setContext(true);
  };

  return { showCode, onVerification, loading };
}

/**
 * @uiName Widget Verification Flow
 * @exampleGroup Widget Verification
 * @example Widget Verification Flow - <sqm-widget-verification></sqm-widget-verification>
 */
@Component({
  tag: "sqm-widget-verification",
  shadow: true,
})
export class WidgetVerification {
  // ! Any updated must be reflected in sqm-widget-verification-internal AND sqm-email-verification AND sqm-code-verification
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

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  getStepTextProps<T extends string>(prefix: T) {
    const props = getProps(this);
    return extractProps(props, prefix);
  }

  render() {
    const { showCode, onVerification, loading } = isDemo()
      ? useDemoWidgetVerificationInternal()
      : useWidgetVerificationInternal();

    // TODO: Shoelace spinner is throwing errors
    if (loading) return <div></div>;

    if (showCode) {
      return (
        <sqm-code-verification
          onVerification={onVerification}
          {...this.getStepTextProps("codeStep_")}
        ></sqm-code-verification>
      );
    }

    return (
      <sqm-email-verification
        {...this.getStepTextProps("emailStep_")}
      ></sqm-email-verification>
    );
  }
}

function useDemoWidgetVerificationInternal() {
  const [showCode, setShowCode] = useParentState<boolean>({
    namespace: SHOW_CODE_NAMESPACE,
    initialValue: false,
  });
  const [email, setEmail] = useParentState<string | undefined>({
    namespace: VERIFICATION_EMAIL_NAMESPACE,
    initialValue: undefined,
  });
  const setContext = useSetParent(VERIFICATION_PARENT_NAMESPACE);

  const onVerification = () => {
    setContext(true);
  };

  return { showCode, onVerification, loading: false };
}
