import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Host, Method } from "@stencil/core";
import { RewardTableColumn } from "./RewardTableColumn";

/**
 * @undocumented
 */
@Component({
  tag: "raisins-plop-target",
})
export class RaisinsPlopTarget implements RewardTableColumn {
  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  @Method()
  async renderCell() {
    return <span></span>;
  }

  @Method()
  async renderLabel(idx) {
    return <slot name={`column-${idx}`} />;
  }

  render() {
    return <Host />;
  }
}
