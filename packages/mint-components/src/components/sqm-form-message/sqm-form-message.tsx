import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Prop, State } from "@stencil/core";

/**
 * @uiName Form Message
 */
@Component({
  tag: "sqm-form-message",
  styleUrl: "sqm-form-message.scss",
  shadow: true,
})
export class FormMessage {
  @State()
  ignored = true;

  /** @uiName Type of alert */
  @Prop() type: string;
  /** @uiName Icon to use in alert */
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
          variant="danger"
          open
        >
          <sl-icon
            slot="icon"
            name={`${this.icon ? this.icon : "exclamation-octagon"}`}
          ></sl-icon>
          <slot />
        </sl-alert>
      );
    } else if (this.type === "neutral") {
      return (
        <sl-alert
          exportparts="base: infoalert-base, icon:infoalert-icon"
          class="Info"
          variant="primary"
          open
        >
          <sl-icon
            slot="icon"
            name={`${this.icon ? this.icon : "info-circle"}`}
          ></sl-icon>
          <slot />
        </sl-alert>
      );
    } else {
      return (
        <sl-alert
          exportparts="base: successalert-base, icon:successalert-icon"
          class="Success"
          variant="success"
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
