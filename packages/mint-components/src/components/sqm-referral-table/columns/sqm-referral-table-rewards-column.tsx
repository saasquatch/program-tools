import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Host, Method, Prop } from "@stencil/core";
import { useRequestRerender } from "../../../tables/re-render";
import { ReferralTableColumn } from "./ReferralTableColumn";

/**
 * @uiName Referral Table Rewards Column
 * @validParents ["sqm-referral-table"]
 * @exampleGroup Referrals
 * @example Referral Table Rewards Column - <sqm-referral-table-rewards-column column-title="Rewards" status-text="{status, select, AVAILABLE {Available} CANCELLED {Cancelled} PENDING {Pending} PENDING_REVIEW {Pending} PAYOUT_APPROVED {Payout Approved} PAYOUT_FAILED {Payout Failed} PAYOUT_CANCELLED {Payout Cancelled} PENDING_TAX_REVIEW {Pending} PENDING_NEW_TAX_FORM {Pending} PENDING_TAX_SUBMISSION {Pending} PENDING_PARTNER_CREATION {Pending} DENIED {Denied} EXPIRED {Expired} REDEEMED {Redeemed} other {Not available} }" status-long-text="{status, select, AVAILABLE {Reward expiring on} CANCELLED {Reward cancelled on} PENDING {Available on} PENDING_REVIEW {Pending since} PAYOUT_APPROVED {Reward approved for payout and was scheduled for payment based on your settings.} PAYOUT_FAILED {Payout failed due to a fulfillment issue and is currently being retried.} PAYOUT_CANCELLED {If you think this is a mistake, contact our Support team.} PENDING_TAX_REVIEW {Awaiting tax form review} PENDING_NEW_TAX_FORM {Invalid tax form. Submit a new form to receive your rewards.} PENDING_TAX_SUBMISSION {Submit your tax documents to receive your rewards} PENDING_PARTNER_CREATION {Complete your tax and cash payout setup to receive your rewards} DENIED {Denied on} EXPIRED {Reward expired on} other {Not available} }" fuel-tank-text="Your code is" reward-received-text="Reward received on" expiring-text="Expiring in" pending-for-text="{status} for {date}" denied-help-text="Contact support if you think this is a mistake." ></sqm-referral-table-rewards-column>
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
   * Text shown in the reward status badge.
   *
   * @uiName Reward status text
   * @uiWidget textArea
   */
  @Prop() statusText: string =
    "{status, select, AVAILABLE {Available} CANCELLED {Cancelled} PENDING {Pending} PENDING_REVIEW {Pending} PAYOUT_APPROVED {Payout Approved} PAYOUT_FAILED {Payout Failed} PAYOUT_CANCELLED {Payout Cancelled} PENDING_TAX_REVIEW {Pending} PENDING_NEW_TAX_FORM {Pending} PENDING_TAX_SUBMISSION {Pending} PENDING_PARTNER_CREATION {Pending} DENIED {Denied} EXPIRED {Expired} REDEEMED {Redeemed} other {Not available} }";

  /**
   * Additional status text shown in the details drop down.
   *
   * @uiName Reward status long text
   * @uiWidget textArea
   */
  @Prop() statusLongText: string =
    "{status, select, AVAILABLE {Reward expiring on} CANCELLED {Reward cancelled on} PENDING {Available on} PENDING_REVIEW {Pending since} PAYOUT_APPROVED {Reward approved for payout and was scheduled for payment based on your settings.} PAYOUT_FAILED {Payout failed due to a fulfillment issue and is currently being retried.} PAYOUT_CANCELLED {If you think this is a mistake, contact our Support team.} PENDING_TAX_REVIEW {Awaiting tax form review} PENDING_NEW_TAX_FORM {Invalid tax form. Submit a new form to receive your rewards.} PENDING_TAX_SUBMISSION {Submit your tax documents to receive your rewards} PENDING_PARTNER_CREATION {Complete your tax and cash payout setup to receive your rewards} DENIED {Denied on} EXPIRED {Reward expired on} other {Not available} }";

  /**
   * Shown in the dropdown details when a reward has an associated fuel tank code.
   *
   * @uiName Fuel tank code text
   */
  @Prop() fuelTankText: string = "Your code is";

  /**
   * Shown in the dropdown details when a reward has been received.’
   *
   * @uiName Reward received text
   */
  @Prop() rewardReceivedText: string = "Reward received on";

  /**
   * Shown in the dropdown details when a reward has an expiry date.
   *
   * @uiName Reward expiring text
   */
  @Prop() expiringText: string = "Expiring in";

  /**
   * Shown in the dropdown details when a reward is pending.
   *
   * @uiName Reward pending text
   */
  @Prop() pendingForText: string = "{status} for {date}";

  /**
   * Shown in the dropdown details when a reward was denied.
   *
   * @uiName Reward denied help text
   */
  @Prop() deniedHelpText: string =
    "Contact support if you think this is a mistake.";

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
  async renderCell(
    data: Referral,
    options?: { locale: string; taxConnection: ImpactConnection }
  ) {
    return (
      <sqm-referral-table-rewards-cell
        rewards={data.rewards}
        taxConnection={options?.taxConnection}
        statusText={this.statusText}
        statusLongText={this.statusLongText}
        fuelTankText={this.fuelTankText}
        rewardReceivedText={this.rewardReceivedText}
        expiringText={this.expiringText}
        pendingForText={this.pendingForText}
        hideDetails={this.hideDetails}
        deniedHelpText={this.deniedHelpText}
        locale={options?.locale}
        exportparts="sqm-cell-value"
      ></sqm-referral-table-rewards-cell>
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
      <sqm-referral-table-rewards-cell
        rewards={data.rewards}
        exportparts="sqm-cell-value"
      ></sqm-referral-table-rewards-cell>
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
