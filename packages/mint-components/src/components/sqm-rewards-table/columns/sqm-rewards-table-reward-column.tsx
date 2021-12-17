import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Host, Method, Prop } from "@stencil/core";
import { useRequestRerender } from "../../../tables/re-render";
import { RewardTableColumn } from "./RewardTableColumn";
/**
 * @uiName Rewards Table Reward Column
 */
@Component({
  tag: "sqm-rewards-table-reward-column",
  shadow: true,
})
export class RewardsTableColumn implements RewardTableColumn {
  /**
   * @uiName Reward column title
   */
  @Prop() columnTitle: string = "Rewards";

  /**
   * @uiName Hide dropdown details of reward
   */
  @Prop() hideDetails: boolean = false;

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  @Method()
  async renderCell(data: Reward[]) {
    return (
      <sqm-rewards-table-rewards-cell
        reward={data?.[0]}
        hideDetails={this.hideDetails}
      ></sqm-rewards-table-rewards-cell>
    );
  }

  @Method()
  async renderLabel() {
    return this.columnTitle;
  }

  render() {
    useRequestRerender([this.columnTitle]);
    return <Host style={{ display: "none" }} />;
  }
}
