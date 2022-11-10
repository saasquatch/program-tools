import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Host, Method, Prop } from "@stencil/core";
import { useRequestRerender } from "../../tables/re-render";
import { RewardTableColumn } from "./RewardTableColumn";

/**
 * @uiName PayPal Reward Table Status Column
 * @validParents ["sqm-rewards-table"]
 * @exampleGroup PayPal Components
 * @example Reward Table Status Column - <sqp-status-column></sqp-status-column>
 */
@Component({
  tag: "sqp-status-column",
  shadow: true,
})
export class RewardTablePayPalStatusColumn implements RewardTableColumn {
  /**
   * @uiName Column Title
   */
  @Prop() columnTitle: string = "PayPal Status";

  /**
   * @uiName Reward Status Text
   * @uiWidget textArea
   */
  @Prop() statusText: string =
    "{status, select, AVAILABLE {Available} CANCELLED {Cancelled} EXPIRED {Expired} REDEEMED {Redeemed} PENDING {Pending} SUCCESS {Paid Out} FAILED {Failed} PAYPAL_PENDING {In progress} UNCLAIMED {Unclaimed} ONHOLD {In progress} REFUNDED {Refunded} RETURNED {Returned} REVERSED {Reversed} BLOCKED {Blocked} other {Not available}  }";

  /**
   * Displayed below the status pill when a reward has been paid out.
   *
   * @uiName Reward Paid Out Text
   */
  @Prop() rewardPaidOutText: string = "Paid out on";

  /**
   * Displayed below the status pill when a reward is being paid out.
   *
   * @uiName Reward Payout In Progress Text
   */
  @Prop() rewardPayoutInProgressText: string = "Payout processing started on";

  /**
   * Displayed below the status pill when a reward payout has failed.
   *
   * @uiName Reward Payout Failed Text
   */
  @Prop() rewardPayoutFailedText: string =
    "This payout will be retried up to 3 times. If it still fails it will be retried in the next payout cycle. Last attempted on";

  /**
   * Displayed below the status pill when a reward was paid out but is unclaimed.
   *
   * @uiName Reward Unclaimed Text
   */
  @Prop() rewardUnclaimedText: string =
    "The email you provided does not link to an existing PayPal account. Payout expires on";

  /**
   * Displayed below the status pill when a reward was placed on hold during payout.
   *
   * @uiName Reward On Hold Text
   */
  @Prop() rewardOnHoldText: string = "Payout on hold and in review since";

  /**
   * Displayed below the status pill when a reward was refunded after payout.
   *
   * @uiName Reward Refunded Text
   */
  @Prop() rewardRefundedText: string = "Payout refunded on";

  /**
   * Displayed below the status pill when a reward was returned after payout.
   *
   * @uiName Reward Returned Text
   */
  @Prop() rewardReturnedText: string =
    "The email you provided does not link to an existing PayPal account. Payout expired on";

  /**
   * Displayed below the status pill when a rewards payout was reserved.
   *
   * @uiName Reward Reversed Text
   */
  @Prop() rewardReversedText: string = "Payout reversed on";

  /**
   * Displayed below the status pill when a reward was blocked during payout.
   *
   * @uiName Reward Blocked Text
   */
  @Prop() rewardBlockedText: string = "Payout blocked on";
  /**
   * Text shown before the date of an expiring reward.
   *
   * @uiName Expiry Date Prefix
   */
  @Prop() expiryText: string = "Expires on ";

  /**
   * Displayed when a reward is pending due to W9 compliance.
   *
   * @uiName W9 Pending Text
   */
  @Prop() pendingUsTax: string = "W-9 required";

  /**
   * Text shown before the available date of a pending reward.
   *
   * @uiName Pending Date Prefix
   */
  @Prop() pendingScheduled: string = "Until";

  /**
   * Displayed when fulfillment error occured when creating a reward.
   *
   * @uiName Unhandled Error Text
   */
  @Prop() pendingUnhandled: string = "Fulfillment error";

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  @Method()
  async renderCell(data: Reward, locale: string, mintRenderer) {
    if (mintRenderer) {
      return mintRenderer("sqp-status-cell", {
        statusText: this.statusText,
        reward: data,
        expiryText: this.expiryText,
        pendingScheduled: this.pendingScheduled,
        pendingUsTax: this.pendingUsTax,
        pendingUnhandled: this.pendingUnhandled,
        locale: locale,
        rewardPaidOutText: this.rewardPaidOutText,
        rewardPayoutInProgressText: this.rewardPayoutInProgressText,
        rewardPayoutFailedText: this.rewardPayoutFailedText,
        rewardUnclaimedText: this.rewardUnclaimedText,
      });
    } else {
      return (
        <sqp-status-cell
          statusText={this.statusText}
          reward={data}
          expiryText={this.expiryText}
          pendingScheduled={this.pendingScheduled}
          pendingUsTax={this.pendingUsTax}
          pendingUnhandled={this.pendingUnhandled}
          locale={locale}
          rewardPaidOutText={this.rewardPaidOutText}
          rewardPayoutInProgressText={this.rewardPayoutInProgressText}
          rewardPayoutFailedText={this.rewardPayoutFailedText}
          rewardUnclaimedText={this.rewardUnclaimedText}
        ></sqp-status-cell>
      );
    }
  }

  @Method()
  async renderLabel() {
    return this.columnTitle;
  }

  render() {
    useRequestRerender([
      this.columnTitle,
      this.statusText,
      this.expiryText,
      this.pendingScheduled,
      this.pendingUsTax,
      this.pendingUnhandled,
      this.rewardPaidOutText,
      this.rewardPayoutInProgressText,
      this.rewardPayoutFailedText,
    ]);
    return <Host style={{ display: "none" }} />;
  }
}
