import { DemoData } from "../../global/demo";
import { PortalResetPasswordViewProps } from "./sqm-portal-reset-password-view";
/**
 * @uiName Portal Reset Password
 */
export declare class PortalResetPassword {
  ignored: boolean;
  /**
   * The page that users are redirected to when the password reset succeeds.
   *
   * @uiName Next page path
   */
  nextPage: string;
  /**
   * The page that users are redirected to if the reset fails due to outdated password reset attempt.
   *
   * @uiName Failed page redirection path
   */
  failedPage: string;
  /**
   * @uiName Show confirm password
   */
  confirmPassword: boolean;
  /**
   * @uiName Password reset header text
   */
  resetPasswordHeader: string;
  /**
   * Displayed after a successful password reset
   *
   * @uiName Password reset header text
   */
  passwordResetHeader: string;
  /**
   * @uiName Password reset button text
   */
  resetPasswordButtonText: string;
  /**
   * Displayed after a successful password reset
   *
   * @uiName Continue button text
   */
  continueButtonText: string;
  /**
   * @uiName Confirm password field label
   */
  confirmPasswordFieldLabel: string;
  /**
   * @uiName Password field label
   */
  passwordFieldLabel: string;
  /**
   * @undocumented
   * @uiType object
   */
  demoData?: DemoData<PortalResetPasswordViewProps>;
  constructor();
  disconnectedCallback(): void;
  render(): any;
}
