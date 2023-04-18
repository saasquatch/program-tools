import { getEnvironmentSDK } from "@saasquatch/component-boilerplate";
import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Listen } from "@stencil/core";

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

    const onClick = () => {
      if (sdk.type === "SquatchJS2") {
        sdk.api.close?.();
      }
    };

    return isPopup ? (
      <span style={{ fontSize: "24px", cursor: "pointer" }} onClick={onClick}>
        X
      </span>
    ) : (
      <span style={{ display: "none" }}></span>
    );
  }
}
