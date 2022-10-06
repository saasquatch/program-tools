import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Host, Method, Prop } from "@stencil/core";
import { useRequestRerender } from "../../../tables/re-render";
import { RewardTableColumn } from "./RewardTableColumn";
/**
 * @uiName Rewards Table Reward Column
 * @validParents ["sqp-rewards-table"]
 * @exampleGroup Rewards
 * @example Rewards Table Reward Column - <sqp-rewards-table-reward-column column-title="Reward" redeemed-text="{redeemedAmount} redeemed" available-text="{availableAmount} remaining" copy-text="Copied!"></sqp-rewards-table-reward-column>
 */
@Component({
  tag: "sqp-rewards-table-reward-column",
  shadow: true,
})
export class RewardsTableColumn implements RewardTableColumn {
  /**
   * @uiName Reward Column Title
   */
  @Prop() columnTitle: string = "Reward";

  /**
   * @uiName Redeemed Amount Text
   */
  @Prop() redeemedText: string = "{redeemedAmount} redeemed";

  /**
   * @uiName Remaining Amount Text
   */
  @Prop() availableText: string = "{availableAmount} remaining";

  /**
   * @uiName Copied Fuel Tank Text
   */
  @Prop() copyText: string = "Copied!";

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  @Method()
  async renderCell(data: Reward, locale: string) {
    return (
      <sqp-rewards-table-reward-cell
        reward={data}
        redeemedText={this.redeemedText}
        availableText={this.availableText}
        copyText={this.copyText}
        locale={locale}
      ></sqp-rewards-table-reward-cell>
    );
  }

  @Method()
  async renderLabel() {
    return this.columnTitle;
  }

  render() {
    useRequestRerender([
      this.columnTitle,
      this.redeemedText,
      this.availableText,
      this.copyText,
    ]);
    return <Host style={{ display: "none" }} />;
  }
}
