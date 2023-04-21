import { getEnvironmentSDK } from "@saasquatch/component-boilerplate";
import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Listen } from "@stencil/core";
import { CloseButtonView } from "./sqm-close-button-view";

/**
 * @uiName Popup widget Close Button
 */
@Component({
  tag: "sqm-close-button",
  shadow: true,
})
export class CloseButton {
  constructor() {
    withHooks(this);
  }

  disconnectedCallback() {}

  render() {
    const sdk = getEnvironmentSDK();
    const isPopup =
      sdk.type === "SquatchJS2" &&
      sdk.widgetIdent?.engagementMedium === "POPUP";

    if (!isPopup) return <div style={{ display: "none" }}></div>;

    const onClick = () => {
      if (sdk.type === "SquatchJS2") {
        sdk.api.close?.();
      }
    };

    return <CloseButtonView onClick={onClick} />;
  }
}
