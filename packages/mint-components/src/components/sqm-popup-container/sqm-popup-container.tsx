import { h, Component, Prop } from "@stencil/core";
import PopupContainerView from "./sqm-popup-container-view";
import { withHooks } from "@saasquatch/stencil-hooks";
import { usePopupContainer } from "./usePopupContainer";

@Component({
  tag: "sqm-popup-container",
  styleUrl: "sqm-popup-container.scss",
})
export class GlobalContainer {
  /** Show SaaSquatch Powered By messaging */
  @Prop() poweredBy: boolean;
  @Prop() closeButton: boolean;
  @Prop() closeButtonText: string;

  constructor() {
    withHooks(this);
  }

  disconnectedCallback() {}

  render() {
    return <PopupContainerView {...usePopupContainer(this)} />;
  }
}


