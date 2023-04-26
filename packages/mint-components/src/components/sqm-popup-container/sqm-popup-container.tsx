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
   * Show Powered By SaaSquatch link
   *
   * @uiName Show powered by
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
