import { DemoData } from "../../global/demo";
import { PortalRegisterViewProps } from "./sqm-portal-register-view";
/**
 * @uiName Portal Register
 */
export declare class PortalRegister {
  ignored: boolean;
  /**
   * @uiName Page navigated to after registration
   */
  nextPage: string;
  /**
   * The page that users are redirected to from the verification email.
   *
   * @uiName Email redirection base path
   */
  redirectPath: string;
  /**
   * @uiName Label for email field
   */
  emailLabel: string;
  /**
   * @uiName Label for password field
   */
  passwordLabel: string;
  /**
   * @uiName Label for submit button
   */
  submitLabel: string;
  /**
   * @uiName Label for login navigation button
   */
  loginLabel: string;
  /**
   * @uiName Label for confirm password field
   */
  confirmPasswordLabel: string;
  /**
   * @uiName Show confirm password field
   */
  confirmPassword: boolean;
  /**
   * @uiName Use password field with live validation
   */
  enablePasswordValidation: boolean;
  /**
   * @uiName Hide default input fields to use custom fields
   */
  hideInputs: boolean;
  /**
   * @uiName Heading label
   */
  pageLabel: string;
  /**
   * @uiName Sign in button redirection path
   */
  loginPath: string;
  /**
   * @undocumented
   * @uiType object
   */
  demoData?: DemoData<PortalRegisterViewProps>;
  constructor();
  disconnectedCallback(): void;
  render(): any;
}
