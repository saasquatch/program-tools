import { h, Component, Prop } from "@stencil/core";
import PopupContainerView from "./sqm-popup-container-view";
import { withHooks } from "@saasquatch/stencil-hooks";
import { usePopupContainer } from "./usePopupContainer";
import { getProps } from "../../utils/utils";

/**
 * @uiName Popup container for widgets
 */

@Component({
  tag: "sqm-popup-container",
  styleUrl: "sqm-popup-container.scss",
})
export class PopupContainer {
  /** @uiName Show SaaSquatch Powered By messaging */
  @Prop() poweredBy: boolean;
  /** @uiName Display a close button on the popup */
  @Prop() closeButton: boolean;
  /** @uiName Text to be used as the close button */
  @Prop() closeButtonText: string;
  /**  @uiName Specify padding on the popup contents when in embedded mode */
  @Prop() embedPadding?: "none" | "small" | "medium" | "large";
  /** @uiName  Specify padding on the popup contents when in popup mode */
  @Prop() popupPadding?: "none" | "small" | "medium" | "large";

  constructor() {
    withHooks(this);
  }

  disconnectedCallback() {}

  render() {
    const thisProps = getProps(this)
    return <PopupContainerView {...usePopupContainer(thisProps)} />;
  }
}
