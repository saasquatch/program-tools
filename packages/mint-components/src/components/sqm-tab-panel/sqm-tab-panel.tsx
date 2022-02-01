import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Prop, Host, State } from "@stencil/core";

@Component({
  tag: "sqm-tab-panel",
  shadow: true,
})
export class TabPanel {
  @State()
  ignored = true;

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  render() {
    return (
      <Host style={{ display: "block" }}>
        <sl-tab-panel>
          <slot name="sqm-panel" slot="panel" />
        </sl-tab-panel>
      </Host>
    );
  }
}
