import { isDemo } from "@saasquatch/component-boilerplate";
import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Prop, State } from "@stencil/core";
import deepmerge from "deepmerge";
import { DemoData } from "../../global/demo";
import {
  PortalResetPasswordView,
  PortalResetPasswordViewProps,
} from "./sqm-portal-reset-password-view";
import { usePortalResetPassword } from "./usePortalResetPassword";

/**
 * @uiName Microsite Reset Password
 */
@Component({
  tag: "sqm-portal-reset-password",
  shadow: true,
})
export class PortalResetPassword {
  @State()
  ignored = true;

  /**
   * Redirect participants to this page when they successfully reset their password.
   *
   * @uiName Successful reset redirect
   * @uiWidget pageSelect
   */
  @Prop()
  nextPage: string = "/";

  /**
   * Redirect participants to this page if password reset fails due to an outdated reset attempt.
   *
   * @uiName Failed reset redirect
   * @uiWidget pageSelect
   */
  @Prop()
  failedPage: string = "/";

  /**
   * @uiName Show confirm password field
   */
  @Prop()
  confirmPassword: boolean = false;

  /**
   * @uiName Reset password header text
   */
  @Prop() resetPasswordHeader: string = "Reset your password";

  /**
   * Displayed after a successful password reset.
   *
   * @uiName Successful password reset text
   * @uiWidget textArea
   */
  @Prop() passwordResetHeader: string = "Password reset";

  /**
   * @uiName Password reset button text
   */
  @Prop() resetPasswordButtonText: string = "Reset Password";

  /**
   * Button text displayed after a successful password reset.
   *
   * @uiName Continue button text
   */
  @Prop() continueButtonText: string = "Continue";

  /**
   * @uiName Password confirmation field label
   */
  @Prop() confirmPasswordFieldLabel: string = "Confirm Password";

  /**
   * @uiName Password field label
   */
  @Prop() passwordFieldLabel: string = "New Password";

  /**
   * @uiName Password requirement met
   */
  @Prop() meetsRequirementsText: string = "Password has met all requirements";

  /**
   * @uiName Password requirement failed
   */
  @Prop() doesNotMeetRequirementsText: string =
    "Password must meet the following requirements:";

  /**
   * @uiName Minimum length text
   */
  @Prop() minErrorText: string = "be a minimum of 8 characters";

  /**
   * @uiName Missing uppercase text
   */
  @Prop() uppercaseErrorText: string = "contain at least 1 uppercase character";

  /**
   * @uiName Missing lowercase text
   */
  @Prop() lowercaseErrorText: string = "contain at least 1 lowercase character";

  /**
   * @uiName Missing number or symbol text
   */
  @Prop() hasErrorText: string = "contain at least 1 number or symbol";

  /**
   * @uiName Passwords don’t match error message
   * Please make sure your passwords match
   */
  @Prop() passwordMismatchText: string = "Passwords do not match.";

  /**
   * @uiName Reset code invalid error message
   */
  @Prop() codeInvalidText: string =
    "The password reset code is invalid or has expired, please try again.";

  /**
   * @uiName Reset success text
   */
  @Prop() resetSuccessText: string =
    "Your password has been reset and you are being redirected. If you are not redirected, please click Continue.";

  /**
   * @uiName Network error message
   * Displayed when the password reset fails due to a network error. The participant can try refreshing the page.
   */
  @Prop() networkErrorMessage: string =
    "An error occurred while resetting your password. Please refresh the page and try again.";

  /**
   * @undocumented
   * @uiType object
   */
  @Prop() demoData?: DemoData<PortalResetPasswordViewProps>;

  constructor() {
    withHooks(this);
  }

  disconnectedCallback() {}

  render() {
    const { states, callbacks } = isDemo()
      ? usePortalResetPasswordDemo(this)
      : usePortalResetPassword(this);
    return <PortalResetPasswordView states={states} callbacks={callbacks} />;
  }
}
function usePortalResetPasswordDemo(
  props: PortalResetPassword
): PortalResetPasswordViewProps {
  return deepmerge(
    {
      states: {
        error: "",
        loading: false,
        reset: false,
        confirmPassword: props.confirmPassword,
        oobCodeValidating: false,
        oobCodeValid: true,
        content: {
          passwordResetHeader: props.passwordResetHeader,
          resetPasswordHeader: props.resetPasswordHeader,
          continueButtonText: props.continueButtonText,
          resetPasswordButtonText: props.resetPasswordButtonText,
          confirmPasswordFieldLabel: props.confirmPasswordFieldLabel,
          passwordFieldLabel: props.passwordFieldLabel,
          meetsRequirementsText: props.meetsRequirementsText,
          doesNotMeetRequirementsText: props.doesNotMeetRequirementsText,
          minErrorText: props.minErrorText,
          uppercaseErrorText: props.uppercaseErrorText,
          lowercaseErrorText: props.lowercaseErrorText,
          hasErrorText: props.hasErrorText,
          passwordMismatchText: props.passwordMismatchText,
          codeInvalidText: props.codeInvalidText,
          resetSuccessText: props.resetSuccessText,
        },
      },
      callbacks: {
        submit: async (_event: any) => {
          console.log("submit");
        },
        failed: () => {},
        gotoNextPage: () => {},
      },
    },
    props.demoData || {},
    { arrayMerge: (_, a) => a }
  );
}
