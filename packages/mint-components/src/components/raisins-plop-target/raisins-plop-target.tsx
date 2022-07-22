import { Component, h, Host, Method } from "@stencil/core";
import { RewardTableColumn } from "../sqm-rewards-table/columns/RewardTableColumn";

/**
 * @undocumented
 */
@Component({
  tag: "raisins-plop-target",
})
export class RaisinsPlopTarget implements RewardTableColumn {
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
