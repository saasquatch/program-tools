import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Prop, Host, State } from "@stencil/core";

@Component({
  tag: "sqm-tab",
  shadow: true,
})
export class Tab {
  @State()
  ignored = true;

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  render() {
    return (
      <Host style={{ display: "block" }}>
        <sl-tab>
          <slot />
        </sl-tab>
      </Host>
    );
  }
}
