import { DemoData } from "../../global/demo";
import { UserNameViewProps } from "./sqm-user-name-view";
/**
 * @uiName User Name
 */
export declare class UserName {
  _ignored: boolean;
  /**
   * @uiName Fallback name for nameless users
   */
  fallback: string;
  /**
   * @uiName Loading text
   */
  loadingText: string;
  /**
   * @undocumented
   * @uiType object
   */
  demoData?: DemoData<UserNameViewProps>;
  constructor();
  disconnectedCallback(): void;
  render(): any;
}
