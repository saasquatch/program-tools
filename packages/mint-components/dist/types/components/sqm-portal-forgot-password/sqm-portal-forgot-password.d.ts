import { DemoData } from "../../global/demo";
import { PortalForgotPasswordViewProps } from "./sqm-portal-forgot-password-view";
/**
 * @uiName Portal Forgot Password
 */
export declare class PortalForgotPassword {
  ignored: boolean;
  /**
   * The page that users are redirected to from the password reset email.
   *
   * @uiName Email redirection base path
   */
  redirectPath: string;
  /**
   * @uiName Email label
   */
  emailLabel: string;
  /**
   * @uiName Password reset button text
   */
  submitLabel: string;
  /**
   * @uiName Routing path to login page
   */
  loginPath: string;
  /**
   * @undocumented
   * @uiType object
   */
  demoData?: DemoData<PortalForgotPasswordViewProps>;
  constructor();
  disconnectedCallback(): void;
  render(): any;
}
