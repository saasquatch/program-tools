/**
 * @uiName Portal Protected Route
 */
export declare class PortalProtectedRoute {
  ignored: boolean;
  /**
   * @uiName Redirect Path
   */
  redirectTo: string;
  /**
   * @uiName Require Email Verification
   */
  requireEmailVerification: boolean;
  /**
   * @uiName Redirect unverified users path
   */
  redirectToUnverified: string;
  constructor();
  disconnectedCallback(): void;
  render(): any;
}
