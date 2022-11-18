import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Host, Method, Prop } from "@stencil/core";
import { useRequestRerender } from "../../tables/re-render";
import { ReferralTableColumn } from "./ReferralTableColumn";

/**
 * @uiName PayPal Referral Table Rewards Column
 * @validParents ["sqm-referral-table"]
 * @exampleGroup PayPal Components
 * @example Referral Table Rewards Column - <sqp-rewards-column></sqp-rewards-column>
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
    "{status, select, AVAILABLE {Available} CANCELLED {Cancelled} EXPIRED {Expired} REDEEMED {Redeemed} PENDING {Pending} SUCCESS {Paid out} FAILED {Failed} PAYPAL_PENDING {In progress} UNCLAIMED {Unclaimed} ONHOLD {In progress} REFUNDED {Refunded} RETURNED {Returned} REVERSED {Reversed} BLOCKED {Blocked} DENIED {Denied} other {Not available}  }";

  /**
   * Additional status text shown in the details drop down.
   *
   * @uiName Reward Status Long Text
   * @uiWidget textArea
   */
  @Prop()
  statusLongText: string =
    "{status, select, INPROGRESS {In Progress} TRANSFERRED {Transferred} AVAILABLE {Reward expiring on} CANCELLED {Reward cancelled on} REDEEMED {Redeemed on} PENDING {Available on} EXPIRED {Reward expired on} SUCCESS {Paid out on} FAILED {This payout will be retried up to 3 times. If it still fails it will be retried in the next payout cycle. Last attempted on} PAYPAL_PENDING {Payout process started on} UNCLAIMED {The email you provided does not link to an existing PayPal account. Payout expires on} ONHOLD {Payout on hold and in review since} REFUNDED {Payout refunded on} RETURNED {Payout returned on} REVERSED {Payout reversed on} BLOCKED {Payout blocked on} DENIED {Payout denied by PayPal on} other {Not available} }";

  /**
   * Shown in the dropdown details when a reward has an associated fuel tank code.
   *
   * @uiName Fuel Tank Code Text
   */
  @Prop() fuelTankText: string = "Your code is";

  /**
   * Shown in the dropdown details when a reward has been received.
   *
   * @uiName Reward Received Text
   */
  @Prop() rewardReceivedText: string = "Reward received on";

  /**
   * Shown in the dropdown details when a reward has been paid out.
   *
   * @uiName Reward Paid Out Text
   */
  @Prop() rewardPaidOutText: string = "Paid out on {date}.";

  /**
   * Shown in the dropdown details when a reward is being paid out.
   *
   * @uiName Reward Payout In Progress Text
   */
  @Prop() rewardPayoutInProgressText: string =
    "Payout processing started on {date}.";

  /**
   * Shown in the dropdown details when a reward payout has failed.
   *
   * @uiName Reward Payout Failed Text
   */
  @Prop() rewardPayoutFailedText: string =
    "This payout will be retried up to 3 times. If it still fails it will be retried in the next payout cycle. Last attempted on {date}.";

  /**
   * Shown in the dropdown details when a reward was paid out but is unclaimed.
   *
   * @uiName Reward Unclaimed Text
   */
  @Prop() rewardUnclaimedText: string =
    "The email you provided does not link to an existing PayPal account. Payout expires on {date}.";

  /**
   * Shown in the dropdown details when a reward was placed on hold during payout.
   *
   * @uiName Reward On Hold Text
   */
  @Prop() rewardOnHoldText: string =
    "Payout on hold and in review since {date}.";

  /**
   * Shown in the dropdown details when a reward was refunded after payout.
   *
   * @uiName Reward Refunded Text
   */
  @Prop() rewardRefundedText: string = "Payout refunded on {date}.";

  /**
   * Shown in the dropdown details when a reward was returned after payout.
   *
   * @uiName Reward Returned Text
   */
  @Prop() rewardReturnedText: string =
    "The email you provided does not link to an existing PayPal account. Payout expired on {date}.";

  /**
   * Shown in the dropdown details when a rewards payout was reserved.
   *
   * @uiName Reward Reversed Text
   */
  @Prop() rewardReversedText: string = "Payout reversed on {date}.";

  /**
   * Shown in the dropdown details when a reward was blocked during payout.
   *
   * @uiName Reward Blocked Text
   */
  @Prop() rewardBlockedText: string = "Payout blocked on {date}.";

  /**
   * Shown in the dropdown details when a reward was denied during payout.
   *
   * @uiName Reward Denied Text
   */
  @Prop() rewardDeniedText: string = "Payout denied by PayPal on {date}.";

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
  async renderCell(data: Referral, locale: string, mintRenderer) {
    // TODO: Do the right thing with many rewards, pending rewards, canceled rewards
    console.log(data.rewards);
    if (mintRenderer) {
      return mintRenderer("sqp-rewards-cell", {
        rewards: data.rewards,
        statusText: this.statusText,
        statusLongText: this.statusLongText,
        fuelTankText: this.fuelTankText,
        rewardReceivedText: this.rewardReceivedText,
        expiringText: this.expiringText,
        pendingForText: this.pendingForText,
        hideDetails: this.hideDetails,
        locale: locale,
        rewardPaidOutText: this.rewardPaidOutText,
        rewardPayoutInProgressText: this.rewardPayoutInProgressText,
        rewardPayoutFailedText: this.rewardPayoutFailedText,
        rewardDeniedText: this.rewardDeniedText,
      });
    }
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
        rewardDeniedText={this.rewardDeniedText}
      ></sqp-rewards-cell>
    );
  }

  @Method()
  async renderLabel() {
    return this.columnTitle;
  }

  @Method()
  async renderReferrerCell(data: Referrer, mintRenderer) {
    if (mintRenderer) {
      return mintRenderer("sqp-rewards-cell", {
        rewards: data.rewards,
        statusText: this.statusText,
        statusLongText: this.statusLongText,
        fuelTankText: this.fuelTankText,
        rewardReceivedText: this.rewardReceivedText,
        expiringText: this.expiringText,
        pendingForText: this.pendingForText,
        hideDetails: this.hideDetails,
        rewardPaidOutText: this.rewardPaidOutText,
        rewardPayoutInProgressText: this.rewardPayoutInProgressText,
        rewardPayoutFailedText: this.rewardPayoutFailedText,
        rewardDeniedText: this.rewardDeniedText,
      });
    }

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
        rewardDeniedText={this.rewardDeniedText}
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
      this.rewardPaidOutText,
      this.rewardPayoutInProgressText,
      this.rewardPayoutFailedText,
      this.rewardDeniedText,
    ]);
    return <Host style={{ display: "none" }} />;
  }
}
