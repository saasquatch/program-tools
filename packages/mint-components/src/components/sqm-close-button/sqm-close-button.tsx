import { getEnvironmentSDK } from "@saasquatch/component-boilerplate";
import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Listen, Prop } from "@stencil/core";
import { CloseButtonView } from "./sqm-close-button-view";

/**
 * @uiName Popup Widget Close Button
 */
@Component({
  tag: "sqm-close-button",
  shadow: true,
})
export class CloseButton {
  /**
   * @uiName Color
   * @uiWidget color
   * @uiType string
   */
  @Prop() color: string = "#000000";

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

    return <CloseButtonView onClick={onClick} color={this.color} />;
  }
}
