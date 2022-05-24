import { ReferralIframeViewProps } from "./sqm-referral-iframe-view";
import { DemoData } from "../../global/demo";
/**
 * @uiName Referral IFrame
 */
export declare class SqmReferralIframe {
  ignored: boolean;
  /**
   * @uiName URL of iframe to display
   * @uiRequired
   */
  iframeSrc: string;
  /**
   * @uiName Height of the iframe container
   */
  iframeHeight: string;
  /**
   * @uiName Width of the iframe container
   */
  iframeWidth: string;
  /**
   * @undocumented
   * @uiType object
   */
  demoData?: DemoData<ReferralIframeViewProps>;
  constructor();
  disconnectedCallback(): void;
  render(): any;
}
