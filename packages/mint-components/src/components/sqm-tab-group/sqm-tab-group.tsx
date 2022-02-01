import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Prop, Host, State } from "@stencil/core";

@Component({
  tag: "sqm-tab-group",
  // shadow: true,
})
export class TabGroup {
  @State()
  ignored = true;

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  render() {
    return (
      <Host style={{ display: "block" }}>
        <sl-tab-group>
          <slot name="sqm-nav" slot="nav" />
          <slot name="sqm-panel" slot="panel" />
        </sl-tab-group>
      </Host>
    );
  }
}
