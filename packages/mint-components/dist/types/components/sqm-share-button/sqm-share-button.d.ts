import { ShareButtonViewProps } from "./sqm-share-button-view";
import { DemoData } from "../../global/demo";
/**
 * @uiName Share Button
 * @uiOrder ["medium", "program-id", "*", "pill", "disabled", "hideicon"]
 */
export declare class ShareButton {
  /**
   * The social medium to share on. Share messages and links
   * will be pulled from your program config and tagged for analytics.
   *
   * @uiName Share Medium
   * @uiType string
   * @uiEnum ["facebook", "twitter", "email", "direct", "linkedin", "sms", "fbmessenger", "whatsapp", "linemessenger", "pinterest", "reminder", "unknown" ]
   * @uiEnumNames ["Facebook", "Twitter", "Email", "Web Share Sheet", "Linkedin", "SMS", "Facebook Messenger", "Whatsapp", "Line Messenger", "Pinterest", "Reminder", "Unknown"]
   */
  medium: "facebook" | "twitter" | "email" | "direct" | "linkedin" | "sms" | "fbmessenger" | "whatsapp" | "linemessenger" | "pinterest" | "reminder" | "unknown";
  /**
   * Optional programId, or uses the programId context where this button is rendered.
   *
   * @uiName Program ID
   */
  programId?: string;
  /**
   * @uiName Configure border radius with pixel amount
   */
  borderradius?: number;
  /**
   * @uiName Button background color
   */
  backgroundcolor?: string;
  /**
   * @uiName Button text color
   */
  textcolor?: string;
  /**
   * @uiName Display as pill
   */
  pill?: boolean;
  /**
   * @uiName Disabled
   */
  disabled?: boolean;
  /**
   * @uiType string
   * @uiName Button Style
   * @uiEnum ["primary" , "success", "info", "warning", "danger", "default", "text" ]
   */
  type?: "primary" | "success" | "info" | "warning" | "danger" | "default" | "text";
  /**
   * @uiName Button Size
   * @uiType string
   * @uiEnum ["small", "medium", "large" ]
   * @uiEnumNames ["Small", "Medium", "Large"]
   */
  size?: "small" | "medium" | "large";
  /**
   * @uiName Icon Location
   * @uiType string
   * @uiEnum ["prefix", "suffix" ]
   * @uiEnumNames ["Prefix", "Suffix"]
   */
  iconslot?: "prefix" | "suffix";
  /**
   * @uiName Icon used in button. Will try to select an icon based on the share medium if left empty.
   */
  icon?: string;
  /**
   * @uiName Hide the icon
   */
  hideicon?: boolean;
  /**
   * @uiName Hide the text
   */
  hidetext?: boolean;
  /**
   * @uiName Title used for native sharing (mobile only)
   */
  sharetitle?: string;
  /**
   * @uiName Text used for native sharing (mobile only)
   */
  sharetext?: string;
  /**
   * @undocumented
   * @uiType object
   */
  demoData?: DemoData<ShareButtonViewProps>;
  constructor();
  disconnectedCallback(): void;
  render(): any;
}
