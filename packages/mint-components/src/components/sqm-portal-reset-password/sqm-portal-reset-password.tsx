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
   * @uiName Successful Reset Redirect
   * @uiWidget pageSelect
   */
  @Prop()
  nextPage: string = "/";

  /**
   * Redirect participants to this page if password reset fails due to an outdated reset attempt.
   *
   * @uiName Failed Reset Redirect
   * @uiWidget pageSelect
   */
  @Prop()
  failedPage: string = "/";

  /**
   * @uiName Show Confirm Password Field
   */
  @Prop()
  confirmPassword: boolean = false;

  /**
   * @uiName Reset Password Header Text
   */
  @Prop() resetPasswordHeader: string = "Reset your password";

  /**
   * Displayed after a successful password reset.
   *
   * @uiName Successful Password Reset Text
   * @uiWidget textArea
   */
  @Prop() passwordResetHeader: string = "Password reset";

  /**
   * @uiName Password Reset Button Text
   */
  @Prop() resetPasswordButtonText: string = "Reset Password";

  /**
   * Button text displayed after a successful password reset.
   *
   * @uiName Continue Button Text
   */
  @Prop() continueButtonText: string = "Continue";

  /**
   * @uiName Password Confirmation Field Label
   */
  @Prop() confirmPasswordFieldLabel: string = "Confirm Password";

  /**
   * @uiName Password Field Label
   */
  @Prop() passwordFieldLabel: string = "New Password";

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
        confirmPassword: true,
        oobCodeValidating: false,
        oobCodeValid: true,
        content: {
          passwordResetHeader: "Password reset",
          resetPasswordHeader: "Reset your password",
          continueButtonText: "Continue",
          resetPasswordButtonText: "Reset Password",
          confirmPasswordFieldLabel: "Confirm Password",
          passwordFieldLabel: "New Password",
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
