import { DemoData } from "../../global/demo";
import { PortalVerifyEmailViewProps } from "./sqm-portal-verify-email-view";
/**
 * @uiName Portal Verify Email
 */
export declare class PortalVerifyEmail {
  ignored: boolean;
  /**
   * The page that users are redirected to when the verification succeeds.
   *
   * @uiName Next page path
   */
  nextPage: string;
  /**
   * The page that users are redirected to if verification fails due to outdated verification attempt.
   *
   * @uiName Failed page redirection path
   */
  failedPage: string;
  /**
   * @undocumented
   * @uiType object
   */
  demoData?: DemoData<PortalVerifyEmailViewProps>;
  constructor();
  disconnectedCallback(): void;
  render(): any;
}
