import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Host, Method, Prop } from "@stencil/core";
import { useRequestRerender } from "../../tables/re-render";
import { ReferralTableColumn } from "./ReferralTableColumn";

/**
 * @uiName Referral Table Rewards Column
 * @validParents ["sqm-referral-table"]
 * @exampleGroup PayPal Components
 * @example Referral Table Rewards Column - <sqp-rewards-column column-title="Rewards" status-text="{status, select, SUCCESS {Paid Out} FAILED {Failed} PENDING {In progress} UNCLAIMED {Unclaimed} ONHOLD {In progress} REFUNDED {Refunded} RETURNED {Returned} REVERSED {Reversed} BLOCKED {Blocked} other {Not available} }" status-long-text="{status, select, INPROGRESS {In Progress} TRANSFERRED {Transferred} FAILED {Payout Failed} AVAILABLE {Reward expiring on} CANCELLED {Reward cancelled on} PENDING {Available on} EXPIRED {Reward expired on} other {Not available} }" fuel-tank-text="Your code is" reward-received-text="Reward received on" expiring-text="Expiring in" pending-for-text="{status} for {date}"></sqp-rewards-column>
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
    "{status, select, SUCCESS {Paid Out} FAILED {Failed} PENDING {In progress} UNCLAIMED {Unclaimed} ONHOLD {In progress} REFUNDED {Refunded} RETURNED {Returned} REVERSED {Reversed} BLOCKED {Blocked} other {Not available} }";

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

  // TODO: all of these need to be implemented
  // | succeeded PayPal payout reward         | Paid out on {dateLastUpdated from the customMeta}.                                                                                                                   |
  // | Failed PayPal payout reward            | This payout will be retried up to 3 times. If it still fails it will be retried in the next payout cycle. Last attempted on {dateLastAttempted from the customMeta}. |
  // | Pending PayPal payout reward           | Payout process started on {dateLastUpdated from the customMeta}.                                                                                                     |
  // | Unclaimed PayPal payout reward         | The email you provided does not link to an exisiting PayPal account. Payout expires on {dateLastUpdated + 30 days from the customMeta}.                              |
  // | On hold PayPal payout reward           | Payout on hold and in review since {dadateLastUpdated from the customMetateLastUpdated}.                                                                             |
  // | Refunded PayPal payout reward          | Payout refunded on {dateLastUpdated from the customMeta}                                                                                                             |
  // | Returned PayPal payout reward          | The email you provided does not link to an exisiting PayPal account. Payout expired on {dateLastUpdated + 30 days from the customMeta}.                              |
  // | Reversed PayPal payout reward          | Payout reversed on {dateLastUpdated from the customMeta}                                                                                                             |
  // | Blocked PayPal payout reward           | Payout blocked on {dateLastUpdated from the customMeta}                                                                                                              |

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  @Method()
  async renderCell(data: Referral, locale: string, mintRenderer) {
    // TODO: Do the right thing with many rewards, pending rewards, canceled rewards
    console.log(data.rewards);

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
    });

    // return (
    //   <sqp-rewards-cell
    //     rewards={data.rewards}
    //     statusText={this.statusText}
    //     statusLongText={this.statusLongText}
    //     fuelTankText={this.fuelTankText}
    //     rewardReceivedText={this.rewardReceivedText}
    //     expiringText={this.expiringText}
    //     pendingForText={this.pendingForText}
    //     hideDetails={this.hideDetails}
    //     locale={locale}
    //     rewardPaidOutText={this.rewardPaidOutText}
    //     rewardPayoutInProgressText={this.rewardPayoutInProgressText}
    //     rewardPayoutFailedText={this.rewardPayoutFailedText}
    //   ></sqp-rewards-cell>
    // );
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
      this.rewardPaidOutText,
      this.rewardPayoutInProgressText,
      this.rewardPayoutFailedText,
    ]);
    return <Host style={{ display: "none" }} />;
  }
}
