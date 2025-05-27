import { h, Component, Prop } from "@stencil/core";
import PopupContainerView from "./sqm-popup-container-view";
import { withHooks } from "@saasquatch/stencil-hooks";
import { usePopupContainer } from "./usePopupContainer";
import { getProps } from "../../utils/utils";

/**
 * @uiName Popup Container
 * @slots [{"name":"","title":"Content"}]
 * @canvasRenderer always-replace
 */
@Component({
  tag: "sqm-popup-container",
  styleUrl: "sqm-popup-container.scss",
})
export class PopupContainer {
  /**
   * Show Powered by Impact.com link
   *
   * @uiName Show powered by
   * @requiredFeatures ["CUSTOM_BRANDING"]
   * @featureTooltip <div>Integrate your brand identity further by removing impact.com’s branding from your widget. Contact <a href="mailto:saasquatch-support%40impact.com?subject=Next steps for Custom Branding feature&body=Hi Support Team, %0D%0A%0D%0A I am interested in learning more about how Custom Branding can support the growth of our referral program. Please connect me with a program strategy manager to discuss this feature further, and determine the next steps.%0D%0A%0D%0A%0D%0AThank you,%0D%0A[Add your name here]">Support</a> to upgrade your plan</div>
   */
  @Prop() poweredBy: boolean;
  /**
   * Display a close button on the popup
   *
   * @uiName Show close button
   */
  @Prop() closeButton: boolean;
  /**
   * Text inside the close button
   *
   * @uiName Close button text
   */
  @Prop() closeButtonText: string;
  /**
   * Text at the bottom of the popup
   *
   * @uiName "Powered by" text
   */
  @Prop() poweredByText: string = "Powered By";
  /**
   * Specify padding on the popup contents when in embedded mode
   *
   * @uiName Embed padding
   * @uiType string
   * @uiEnum ["none", "small", "medium", "large"]
   * @uiEnumNames ["None", "Small", "Medium", "Large"]
   */
  @Prop() embedPadding?: "none" | "small" | "medium" | "large";
  /**
   * Specify padding on the popup contents when in popup mode
   * @uiName Popup padding
   * @uiType string
   * @uiEnum ["none", "small", "medium", "large"]
   * @uiEnumNames ["None", "Small", "Medium", "Large"]
   */
  @Prop() popupPadding?: "none" | "small" | "medium" | "large";

  constructor() {
    withHooks(this);
  }

  disconnectedCallback() {}

  render() {
    const thisProps = getProps(this);
    return <PopupContainerView {...usePopupContainer(thisProps)} />;
  }
}
