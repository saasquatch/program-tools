import { DemoData } from "../../global/demo";
import { PortalLoginViewProps } from "./sqm-portal-login-view";
/**
 * @uiName Portal Login
 */
export declare class PortalLogin {
  ignored: boolean;
  /**
   * @uiName Page navigated to after sign-in
   */
  nextPage: string;
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
   * @uiName Label for forgotten password button
   */
  forgotPasswordLabel: string;
  /**
   * @uiName Label for register navigation button
   */
  registerLabel: string;
  /**
   * @uiName Heading label
   */
  pageLabel: string;
  /**
   * @uiName Register button redirection path
   */
  registerPath: string;
  /**
   * @uiName Forgot password button redirect path
   */
  forgotPasswordPath: string;
  /**
   * @undocumented
   * @uiType object
   */
  demoData?: DemoData<PortalLoginViewProps>;
  constructor();
  disconnectedCallback(): void;
  render(): any;
}
