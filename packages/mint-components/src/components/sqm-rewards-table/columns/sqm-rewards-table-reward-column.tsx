import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Host, Method, Prop } from "@stencil/core";
import { useRequestRerender } from "../../../tables/re-render";
import { RewardTableColumn } from "./RewardTableColumn";
/**
 * @uiName Rewards Table Reward Column
 * @validParents ["sqm-rewards-table"]
 * @exampleGroup Rewards
 * @example Reward Column - <sqm-rewards-table-reward-column column-title="Reward" redeemed-text="{redeemedAmount} redeemed" available-text="{availableAmount} remaining" copy-text="Copied!"></sqm-rewards-table-reward-column>
 */
@Component({
  tag: "sqm-rewards-table-reward-column",
  shadow: true,
})
export class RewardsTableColumn implements RewardTableColumn {
  /**
   * @uiName Reward column title
   */
  @Prop() columnTitle: string = "Reward";

  /**
   * @uiName Redeemed amount text
   */
  @Prop() redeemedText: string = "{redeemedAmount} redeemed";

  /**
   * @uiName Remaining amount text
   */
  @Prop() availableText: string = "{availableAmount} remaining";

  /**
   * @uiName Copied fuel tank text
   */
  @Prop() copyText: string = "Copied!";

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  @Method()
  async renderCell(data: Reward, options?: { locale: string }) {
    return (
      <sqm-rewards-table-reward-cell
        reward={data}
        redeemedText={this.redeemedText}
        availableText={this.availableText}
        copyText={this.copyText}
        locale={options?.locale}
        exportparts="sqm-rewards-cell-value, sqm-rewards-cell-progress-bar, sqm-rewards-cell-subtext"
      ></sqm-rewards-table-reward-cell>
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
