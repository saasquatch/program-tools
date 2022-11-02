import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Host, Method, Prop } from "@stencil/core";
import { useRequestRerender } from "../../tables/re-render";
import { RewardTableColumn } from "./RewardTableColumn";

/**
 * @uiName Reward Table Status Column
 * @validParents ["sqm-rewards-table"]
 * @exampleGroup PayPal Components
 * @example Reward Table Status Column - <sqp-status-column column-title="PayPal Status" status-text="{status, select, INPROGRESS {In Progress} TRANSFERRED {Transferred} FAILED {Payout Failed} AVAILABLE {Available} CANCELLED {Cancelled} PENDING {Pending} EXPIRED {Expired} REDEEMED {Redeemed} other {Not available} }" expiry-text="Expires on " pending-us-tax="W-9 required" pending-scheduled="Until" pending-unhandled="Fulfillment error"></sqp-status-column>
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
    "{status, select, INPROGRESS {In Progress} TRANSFERRED {Transferred} FAILED {Payout Failed} AVAILABLE {Available} CANCELLED {Cancelled} PENDING {Pending} EXPIRED {Expired} REDEEMED {Redeemed} other {Not available} }";

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

  /**
   * Shown in the dropdown details when a reward has been paid out.
   *
   * @uiName Reward Paid Out Text
   */
  @Prop() rewardPaidOutText: string = "Sent via PayPal on";

  /**
   * Shown in the dropdown details when a reward is being paid out.
   *
   * @uiName Reward Payout In Progress Text
   */
  @Prop() rewardPayoutInProgressText: string =
    "PayPal payout processing started on";

  /**
   * Shown in the dropdown details when a reward payout has failed.
   *
   * @uiName Reward Payout Failed Text
   */
  @Prop() rewardPayoutFailedText: string = "Payout last attempted on";

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  @Method()
  async renderCell(data: Reward, locale: string, mintRenderer) {
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
    });
  }
  // <sqp-status-cell
  //   statusText={this.statusText}
  //   reward={data}
  //   expiryText={this.expiryText}
  //   pendingScheduled={this.pendingScheduled}
  //   pendingUsTax={this.pendingUsTax}
  //   pendingUnhandled={this.pendingUnhandled}
  //   locale={locale}
  //   rewardPaidOutText={this.rewardPaidOutText}
  //   rewardPayoutInProgressText={this.rewardPayoutInProgressText}
  //   rewardPayoutFailedText={this.rewardPayoutFailedText}
  // ></sqp-status-cell>

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
