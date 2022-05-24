import { DemoData } from "../../global/demo";
import { PortalEmailVerificationViewProps } from "./sqm-portal-email-verification-view";
/**
 * @uiName Portal Email Verification
 */
export declare class PortalEmailVerification {
  ignored: boolean;
  /**
   * The page that users are redirected to from the verification email.
   *
   * @uiName Email redirection base path
   */
  redirectPath: string;
  /**
   * @uiName Email verification header text
   */
  emailVerificationHeader: string;
  /**
   * @uiName Re-send email button text
   */
  resendEmailButtonText: string;
  /**
   * @uiName Email verification body text
   */
  verifyMessage: string;
  /**
   * @undocumented
   * @uiType object
   */
  demoData?: DemoData<PortalEmailVerificationViewProps>;
  constructor();
  disconnectedCallback(): void;
  render(): any;
}
