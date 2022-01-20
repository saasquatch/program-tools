import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Host, Method, Prop } from "@stencil/core";
import { useRequestRerender } from "../../../tables/re-render";
import { ReferralTableColumn } from "./ReferralTableColumn";

/**
 * @uiName Referral Table Rewards Column
 */
@Component({
  tag: "sqm-referral-table-rewards-column",
  shadow: true,
})
export class ReferralTableRewardsColumn implements ReferralTableColumn {
  /**
   * @uiName Reward column title
   */
  @Prop() columnTitle: string = "Rewards";

  /**
   * @uiName Reward Status Text
   */
  @Prop() statusText: string =
    "{status, select, AVAILABLE {Available} CANCELLED {Cancelled} PENDING {Pending} EXPIRED {Expired} REDEEMED {Redeemed} other {Not available} }";

  /**
   * @uiName Reward Status Long Text
   */
  @Prop() statusLongText: string =
    "{status, select, AVAILABLE {Reward expiring on} CANCELLED {Reward cancelled on} PENDING {Available on} EXPIRED {Reward expired on} other {Not available} }";

  /**
   * @uiName Fuel Tank Code Text
   */
  @Prop() fuelTankText: string = "Your code is";

  /**
   * @uiName Reward Received Text
   */
  @Prop() rewardReceivedText: string = "Reward received on";

  /**
   * @uiName Reward Expiring Text
   */
  @Prop() expiringText: string = "Expiring in";

  /**
   * @uiName Reward Pending Text
   */
  @Prop() pendingForText: string = "{status} for {date}";

  /**
   * @uiName Hide dropdown details of reward
   */
  @Prop() hideDetails: boolean = false;

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  @Method()
  async renderCell(data: Referral, locale: string) {
    // TODO: Do the right thing with many rewards, pending rewards, canceled rewards
    return (
      <sqm-referral-table-rewards-cell
        rewards={data.rewards}
        statusText={this.statusText}
        statusLongText={this.statusLongText}
        fuelTankText={this.fuelTankText}
        rewardReceivedText={this.rewardReceivedText}
        expiringText={this.expiringText}
        pendingForText={this.pendingForText}
        hideDetails={this.hideDetails}
        locale={locale}
      ></sqm-referral-table-rewards-cell>
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
