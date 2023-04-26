import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Prop, State } from "@stencil/core";

/**
 * @uiName Form Message
 * @slots [{"name":"","title":"Message Content"}]
 */
@Component({
  tag: "sqm-form-message",
  styleUrl: "sqm-form-message.scss",
  shadow: true,
})
export class FormMessage {
  @State()
  ignored = true;

  /**
   * Options include "success", "info", "warning", and "error"
   *
   * @uiName Alert type
   */
  @Prop() type: string;
  /**
   * Icon to use in alert. Use icon values from Shoelace (e.g. "star" or "bag-heart") at https://shoelace.style/components/icon
   *
   * @uiName Icon
   */
  @Prop() icon?: string;

  constructor() {
    withHooks(this);
  }

  disconnectedCallback() {}

  render() {
    if (this.type === "error") {
      return (
        <sl-alert
          exportparts="base: erroralert-base, icon:erroralert-icon"
          class="Error"
          type="danger"
          open
        >
          <sl-icon
            slot="icon"
            name={`${this.icon ? this.icon : "exclamation-octagon"}`}
          ></sl-icon>
          <slot />
        </sl-alert>
      );
    } else if (this.type === "info") {
      return (
        <sl-alert
          exportparts="base: infoalert-base, icon:infoalert-icon"
          class="Info"
          type="primary"
          open
        >
          <sl-icon
            slot="icon"
            name={`${this.icon ? this.icon : "info-circle"}`}
          ></sl-icon>
          <slot />
        </sl-alert>
      );
    } else if (this.type === "warning") {
      return (
        <sl-alert
          exportparts="base: warningalert-base, icon:warningalert-icon"
          class="Warning"
          type="warning"
          open
        >
          <sl-icon
            slot="icon"
            name={`${this.icon ? this.icon : "exclamation-triangle"}`}
          ></sl-icon>
          <slot />
        </sl-alert>
      );
    } else {
      return (
        <sl-alert
          exportparts="base: successalert-base, icon:successalert-icon"
          class="Success"
          type="success"
          open
        >
          <sl-icon
            slot="icon"
            name={`${this.icon ? this.icon : "check2-circle"}`}
          ></sl-icon>
          <slot />
        </sl-alert>
      );
    }
  }
}
