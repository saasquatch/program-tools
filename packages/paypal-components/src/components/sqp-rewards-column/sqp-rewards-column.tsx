import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Host, Method, Prop } from "@stencil/core";
import { useRequestRerender } from "../../tables/re-render";
import { ReferralTableColumn } from "./ReferralTableColumn";

/**
 * @uiName Referral Table Rewards Column
 * @validParents ["sqm-referral-table"]
 * @exampleGroup PayPal Components
 * @example Referral Table Rewards Column - <sqp-rewards-column column-title="Rewards" status-text="{status, select, INPROGRESS {In Progress} TRANSFERRED {Transferred} FAILED {Payout Failed} AVAILABLE {Available} CANCELLED {Cancelled} PENDING {Pending} EXPIRED {Expired} REDEEMED {Redeemed} other {Not available} }" status-long-text="{status, select, INPROGRESS {In Progress} TRANSFERRED {Transferred} FAILED {Payout Failed} AVAILABLE {Reward expiring on} CANCELLED {Reward cancelled on} PENDING {Available on} EXPIRED {Reward expired on} other {Not available} }" fuel-tank-text="Your code is" reward-received-text="Reward received on" expiring-text="Expiring in" pending-for-text="{status} for {date}"></sqp-rewards-column>
 */
@Component({
  tag: "sqp-rewards-column",
  shadow: true,
})
export class ReferralTableRewardsColumn implements ReferralTableColumn {
  /**
   * @uiName Reward column title
   */
  @Prop() columnTitle: string = "Rewards";

  /**
   * Text shown in the reward status badge.
   *
   * @uiName Reward Status Text
   * @uiWidget textArea
   */
  @Prop() statusText: string =
    "{status, select, INPROGRESS {In Progress} TRANSFERRED {Transferred} FAILED {Payout Failed} AVAILABLE {Available} CANCELLED {Cancelled} PENDING {Pending} EXPIRED {Expired} REDEEMED {Redeemed} other {Not available} }";

  /**
   * Additional status text shown in the details drop down.
   *
   * @uiName Reward Status Long Text
   * @uiWidget textArea
   */
  @Prop() statusLongText: string =
    "{status, select, INPROGRESS {In Progress} TRANSFERRED {Transferred} FAILED {Payout Failed} AVAILABLE {Reward expiring on} CANCELLED {Reward cancelled on} PENDING {Available on} EXPIRED {Reward expired on} other {Not available} }";

  /**
   * Shown in the dropdown details when a reward has an associated fuel tank code.
   *
   * @uiName Fuel Tank Code Text
   */
  @Prop() fuelTankText: string = "Your code is";

  /**
   * Shown in the dropdown details when a reward has been received.’
   *
   * @uiName Reward Received Text
   */
  @Prop() rewardReceivedText: string = "Reward received on";

  /**
   * Shown in the dropdown details when a reward has been paid out.’
   *
   * @uiName Reward Paid Out Text
   */
  @Prop() rewardPaidOutText: string = "Sent via PayPal on";

  /**
   * Shown in the dropdown details when a reward is being paid out.’
   *
   * @uiName Reward Payout In Progress Text
   */
  @Prop() rewardPayoutInProgressText: string =
    "PayPal payout processing started on";

  /**
   * Shown in the dropdown details when a reward payout has failed.’
   *
   * @uiName Reward Payout Failed Text
   */
  @Prop() rewardPayoutFailedText: string = "Payout last attempted on";

  /**
   * Shown in the dropdown details when a reward has an expiry date.
   *
   * @uiName Reward Expiring Text
   */
  @Prop() expiringText: string = "Expiring in";

  /**
   * Shown in the dropdown details when a reward is pending.
   *
   * @uiName Reward Pending Text
   */
  @Prop() pendingForText: string = "{status} for {date}";

  /**
   * @uiName Hide dropdown details of reward
   * @default
   */
  @Prop() hideDetails: boolean = false;

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  @Method()
  async renderCell(data: Referral, locale: string) {
    // TODO: Do the right thing with many rewards, pending rewards, canceled rewards
    console.log(data.rewards);
    return (
      <sqp-rewards-cell
        rewards={data.rewards}
        statusText={this.statusText}
        statusLongText={this.statusLongText}
        fuelTankText={this.fuelTankText}
        rewardReceivedText={this.rewardReceivedText}
        expiringText={this.expiringText}
        pendingForText={this.pendingForText}
        hideDetails={this.hideDetails}
        locale={locale}
        rewardPaidOutText={this.rewardPaidOutText}
        rewardPayoutInProgressText={this.rewardPayoutInProgressText}
        rewardPayoutFailedText={this.rewardPayoutFailedText}
      ></sqp-rewards-cell>
    );
  }

  @Method()
  async renderLabel() {
    return this.columnTitle;
  }

  @Method()
  async renderReferrerCell(data: Referrer) {
    // TODO: Do the right thing with many rewards, pending rewards, canceled rewards
    return (
      <sqp-rewards-cell
        rewards={data.rewards}
        statusText={this.statusText}
        statusLongText={this.statusLongText}
        fuelTankText={this.fuelTankText}
        rewardReceivedText={this.rewardReceivedText}
        expiringText={this.expiringText}
        pendingForText={this.pendingForText}
        hideDetails={this.hideDetails}
        rewardPaidOutText={this.rewardPaidOutText}
        rewardPayoutInProgressText={this.rewardPayoutInProgressText}
        rewardPayoutFailedText={this.rewardPayoutFailedText}
      ></sqp-rewards-cell>
    );
  }

  render() {
    useRequestRerender([
      this.columnTitle,
      this.statusText,
      this.statusLongText,
      this.fuelTankText,
      this.rewardReceivedText,
      this.expiringText,
      this.pendingForText,
      this.hideDetails,
    ]);
    return <Host style={{ display: "none" }} />;
  }
}
