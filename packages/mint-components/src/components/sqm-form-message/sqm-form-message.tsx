import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Prop, State } from "@stencil/core";

/**
 * @uiName Form Message
 * @slots [{"name":"","title":"Message Content"}]
 * @csspart erroralert-base - The error alert base
 * @csspart erroralert-icon - The error alert icon
 * @csspart infoalert-base - The info alert base
 * @csspart infoalert-icon - The info alert icon
 * @csspart warningalert-base - The warning alert base
 * @csspart warningalert-icon - The warning alert icon
 * @csspart successalert-base - The success alert base
 * @csspart successalert-icon - The success alert icon
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
   * Loading state for the alert.
   *
   * @uiName Loading
   */
  @Prop() loading: boolean = false;
  /**
   * Icon to use in alert. Use icon values from Shoelace (e.g. "star" or "heart") at https://shoelace.style/components/icon
   *
   * @uiName Icon
   */
  @Prop() icon?: string;

  /**
   * Render the alert with transparent styles
   */
  @Prop() transparent?: boolean = false;

  constructor() {
    withHooks(this);
  }

  disconnectedCallback() {}

  render() {
    if (this.loading) {
      return <sqm-skeleton height="90px" width="100%"></sqm-skeleton>;
    }

    if (this.type === "error") {
      return (
        <sl-alert
          exportparts="base: erroralert-base, icon:erroralert-icon"
          class={`Error ${this.transparent ? "Transparent" : ""}`}
          type="danger"
          open
        >
          <sl-icon
            id="icon"
            slot="icon"
            name={`${this.icon ? this.icon : "exclamation-octagon"}`}
          ></sl-icon>
          <slot />
        </sl-alert>
      );
    } else if (this.type === "info") {
      return (
        <sl-alert
          id="icon"
          exportparts="base: infoalert-base, icon:infoalert-icon"
          class={`Info ${this.transparent ? "Transparent" : ""}`}
          type="info"
          open
        >
          <sl-icon
            id="icon"
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
          class={`Warning ${this.transparent ? "Transparent" : ""}`}
          type="warning"
          open
        >
          <sl-icon
            id="icon"
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
          class={`Success ${this.transparent ? "Transparent" : ""}`}
          type="success"
          open
        >
          <sl-icon
            id="icon"
            slot="icon"
            name={`${this.icon ? this.icon : "check2-circle"}`}
          ></sl-icon>
          <slot />
        </sl-alert>
      );
    }
  }
}
