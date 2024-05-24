import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Prop, State } from "@stencil/core";
import { getProps } from "../../utils/utils";
import { PortalFooterView } from "./sqm-portal-footer-view";

/**
 * @uiName Footer
 */
@Component({
  tag: "sqm-portal-footer",
  assetsDirs: ["../../assets"],
  shadow: true,
})
export class PortalFooter {
  @State()
  ignored = true;

  /**
   * @uiName Hide support message
   */
  @Prop() hideSupportText: boolean = false;
  /**
   * @uiName Support email
   */
  @Prop() supportEmail: string = "support@example.com";
  /**
   * @uiName Support message
   * @uiWidget textArea
   */
  @Prop() supportText: string = "For program support, contact {email}";
  /**
   * @uiName Terms and conditions link
   */
  @Prop() termsLink?: string;
  /**
   * @uiName Terms and conditions text
   */
  @Prop() termsText?: string;
  /**
   * @uiName FAQ link
   */
  @Prop() faqLink?: string;
  /**
   * @uiName FAQ text
   */
  @Prop() faqText?: string;
  /**
   * @uiName Hide powered by Impact.com
   * @requiredFeatures ["CUSTOM_BRANDING"]
   * @featureTooltip <div>Integrate your brand identity further by removing impact.com’s branding from your widget. Contact <a href="mailto:saasquatch-support@impact.com?subject=Next steps for Custom Branding feature&body=Hi Support Team, %0D%0A%0D%0A I am interested to learn more about the Leaderboards feature. Please let me know the next steps to access this feature, including any necessary plan upgrades.%0D%0A%0D%0A - Feature Interested In: Custom Branding%0D%0A - Company Name: [Please fill out your company name here]%0D%0A%0D%0AThank you">Support</a> to upgrade your plan</div>
   */
  @Prop() hidePoweredBy: boolean = false;
  /**
   * @uiName Powered By link
   */
  @Prop() poweredByLink: string = "https://impact.com/advocate/";
  /**
   * @uiName Top padding
   * @uiGroup Padding
   * @uiEnum ["none", "xxx-small", "xx-small", "x-small", "small", "medium", "large", "x-large", "xx-large", "xxx-large", "xxxx-large"]
   * @uiEnumNames ["None", "XXX-Small", "XX-Small", "X-Small", "Small", "Medium", "Large", "X-Large", "XX-Large", "XXX-Large", "XXXX-Large"]
   */
  @Prop() paddingTop: string = "large";
  /**
   * @uiName Right padding
   * @uiGroup Padding
   * @uiEnum ["none", "xxx-small", "xx-small", "x-small", "small", "medium", "large", "x-large", "xx-large", "xxx-large", "xxxx-large"]
   * @uiEnumNames ["None", "XXX-Small", "XX-Small", "X-Small", "Small", "Medium", "Large", "X-Large", "XX-Large", "XXX-Large", "XXXX-Large"]
   */
  @Prop() paddingRight: string = "large";
  /**
   * @uiName Bottom padding
   * @uiGroup Padding
   * @uiEnum ["none", "xxx-small", "xx-small", "x-small", "small", "medium", "large", "x-large", "xx-large", "xxx-large", "xxxx-large"]
   * @uiEnumNames ["None", "XXX-Small", "XX-Small", "X-Small", "Small", "Medium", "Large", "X-Large", "XX-Large", "XXX-Large", "XXXX-Large"]
   */
  @Prop() paddingBottom: string = "large";
  /**
   * @uiName Left padding
   * @uiGroup Padding
   * @uiEnum ["none", "xxx-small", "xx-small", "x-small", "small", "medium", "large", "x-large", "xx-large", "xxx-large", "xxxx-large"]
   * @uiEnumNames ["None", "XXX-Small", "XX-Small", "X-Small", "Small", "Medium", "Large", "X-Large", "XX-Large", "XXX-Large", "XXXX-Large"]
   */
  @Prop() paddingLeft: string = "large";

  constructor() {
    withHooks(this);
  }

  disconnectedCallback() {}

  render() {
    return <PortalFooterView {...getProps(this)} />;
  }
}
