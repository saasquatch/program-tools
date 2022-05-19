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
 * @uiName Portal Reset Password
 */
@Component({
  tag: "sqm-portal-reset-password",
  shadow: true,
})
export class PortalResetPassword {
  @State()
  ignored = true;

  /**
   * The page that users are redirected to when the password reset succeeds.
   *
   * @uiName Next Page Path
   */
  @Prop()
  nextPage: string = "/";

  /**
   * The page that users are redirected to if the reset fails due to outdated password reset attempt.
   *
   * @uiName Failed Page Path
   */
  @Prop()
  failedPage: string = "/";

  /**
   * Show or hide confirm password field
   *
   * @uiName Show Confirm Password
   * @default
   */
  @Prop()
  confirmPassword: boolean = false;

  /**
   * @uiName Reset Password Header Text
   */
  @Prop() resetPasswordHeader: string = "Reset your password";

  /**
   * Displayed after a successful password reset
   *
   * @uiName Successful Password Reset Text
   */
  @Prop() passwordResetHeader: string = "Password reset";

  /**
   * @uiName Password Reset Button Text
   */
  @Prop() resetPasswordButtonText: string = "Reset Password";

  /**
   * Button text displayed after a successful password reset
   *
   * @uiName Continue Button Text
   */
  @Prop() continueButtonText: string = "Continue";

  /**
   * @uiName Confirm Password Label
   */
  @Prop() confirmPasswordFieldLabel: string = "Confirm Password";

  /**
   * @uiName Password Label
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
