/**
 * @uiName Portal Footer
 */
export declare class PortalFooter {
  ignored: boolean;
  /**
   * @uiName Support Email
   */
  supportEmail: string;
  /**
   * @uiName Support Text
   */
  supportText: string;
  /**
   * @uiName Terms and Conditions Link
   */
  termsLink?: string;
  /**
   * @uiName Terms and Conditions Text
   */
  termsText?: string;
  /**
   * @uiName FAQ Link
   */
  faqLink?: string;
  /**
   * @uiName FAQ Text
   */
  faqText?: string;
  /**
   * @uiName Show Powered By SaaSquatch
   */
  showPoweredBy: boolean;
  /**
   * @uiName Powered By Link
   */
  poweredByLink: string;
  /**
   * @uiName Padding Top
   */
  paddingTop: string;
  /**
   * @uiName Padding Right
   */
  paddingRight: string;
  /**
   * @uiName Padding Bottom
   */
  paddingBottom: string;
  /**
   * @uiName Padding Left
   */
  paddingLeft: string;
  constructor();
  disconnectedCallback(): void;
  render(): any;
}
