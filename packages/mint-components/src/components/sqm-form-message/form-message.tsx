import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Prop, State } from "@stencil/core";

/**
 * @uiName Form Message
 */
@Component({
  tag: "sqm-form-message",
  styleUrl: "form-message.scss",
  shadow: true,
})
export class FormHeader {
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
        <sl-alert exportparts="base: erroralert-base" class="Error" type="danger" open>
          <sl-icon
            slot="icon"
            name={`${this.icon ? this.icon : "exclamation-octagon"}`}
          ></sl-icon>
          <slot />
        </sl-alert>
      );
    } else {
      return (
        <sl-alert exportparts="base: successalert-base" class="Success" type="success" open>
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
