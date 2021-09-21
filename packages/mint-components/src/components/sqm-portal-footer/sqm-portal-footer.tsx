import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Prop, State } from "@stencil/core";
import { getProps } from "../../utils/utils";
import { FSRFooterView } from "./sqm-portal-footer-view";

/**
 * @uiName Portal Footer
 */
@Component({
  tag: "sqm-portal-footer",
  assetsDirs:["../../assets"],
  shadow: true,
})
export class PortalFooter {
  @State()
  ignored = true;

  /**
   * @uiName Support Email
   */
  @Prop() supportEmail: string = "support@example.com";
  /**
   * @uiName Support Text
   */
  @Prop() supportText: string = "For program support, contact {email}";
  /**
   * @uiName Terms and Conditions Link
   */
  @Prop() termsLink: string;
  /**
   * @uiName Terms and Conditions Text
   */
  @Prop() termsText: string;
  /**
   * @uiName FAQ Link
   */
  @Prop() faqLink: string;
  /**
   * @uiName FAQ Text
   */
  @Prop() faqText: string;
  /**
   * @uiName Show Powered By SaaSquatch
   */
  @Prop() showPoweredBy: boolean;
  /**
   * @uiName Powered By Link
   */
  @Prop() poweredByLink?: string = "https://saasquatch.com";
  /**
   * @uiName Padding Top
   */
  @Prop() paddingTop?: string = "large";
  /**
   * @uiName Padding Right
   */
  @Prop() paddingRight?: string = "large";
  /**
   * @uiName Padding Bottom
   */
  @Prop() paddingBottom?: string = "large";
  /**
   * @uiName Padding Left
   */
  @Prop() paddingLeft?: string = "large";

  constructor() {
    withHooks(this);
  }

  disconnectedCallback() {}

  render() {
    return <FSRFooterView {...getProps(this)} />;
  }
}
