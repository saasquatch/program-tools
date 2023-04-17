import { getEnvironmentSDK } from "@saasquatch/component-boilerplate";
import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h } from "@stencil/core";

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

    return isPopup ? (
      <span>&times;</span>
    ) : (
      <span style={{ display: "none" }}></span>
    );
  }
}
