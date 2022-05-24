import { PortalChangePasswordViewProps } from "./sqm-portal-change-password-view";
import { DemoData } from "../../global/demo";
/**
 * @uiName Portal Profile
 */
export declare class PortalChangePassword {
  ignored: boolean;
  /**
   * @uiName Change password modal header
   */
  modalChangePasswordHeader: string;
  /**
   * @uiName Modal cancel password change button text
   */
  cancelText: string;
  /**
   * @uiName Modal change password button text
   */
  changePasswordButtonText: string;
  /**
   * @uiName Password input field label
   */
  passwordFieldLabel: string;
  /**
   * @uiName Password confirmation input field label
   */
  confirmPasswordFieldLabel: string;
  /**
   * @uiName Successful password change message
   */
  successMessage: string;
  /**
   * @uiName Portal change password section header
   */
  portalChangePasswordHeader: string;
  /**
   * @uiName Portal change password button text
   */
  portalChangePasswordButtonText: string;
  /**
   * @undocumented
   * @uiType object
   */
  demoData?: DemoData<PortalChangePasswordViewProps>;
  constructor();
  disconnectedCallback(): void;
  render(): any;
}
