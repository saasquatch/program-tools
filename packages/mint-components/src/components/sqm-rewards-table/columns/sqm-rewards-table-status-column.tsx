import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Host, Method, Prop } from "@stencil/core";
import { useRequestRerender } from "../../../tables/re-render";
import { RewardTableColumn } from "./RewardTableColumn";

/**
 * @uiName Reward Table Status Column
 * @validParents ["sqm-rewards-table"]
 * @exampleGroup Rewards
 * @example Reward Table Status Column - <sqm-rewards-table-status-column column-title="Status" status-text="{status, select, AVAILABLE {Available} CANCELLED {Cancelled} PENDING {Pending} PENDING_REVIEW {Pending} PAYOUT_APPROVED {Payout Approved} PAYOUT_CANCELLED {Payout Cancelled} PAYOUT_FAILED {Payout Failed} EXPIRED {Expired} REDEEMED {Redeemed} DENIED {Denied} other {Not available} }" expiry-text="Expires on " pending-us-tax="W-9 required" pending-scheduled="Until" pending-unhandled="Fulfillment error" pending-review-text="Awaiting review" denied-text="Detected self-referral" pending-tax-review="Awaiting tax form review." pending-new-tax-form="Invalid tax form. Submit a new form to receive your rewards." pending-tax-submission="Submit your tax documents to receive your rewards." pending-partner-creation="Complete your tax and cash payout setup to receive your rewards." payout-failed="Payout failed due to a fulfillment issue and is current being retried." payout-cancelled="If you think this is a mistake, contact our Support team." payout-approved="Reward approved for payout and was scheduled for payment based on your settings." ></sqm-rewards-table-status-column>
 */
@Component({
  tag: "sqm-rewards-table-status-column",
  shadow: true,
})
export class RewardTableStatusColumn implements RewardTableColumn {
  /**
   * @uiName Column title
   */
  @Prop() columnTitle: string = "Status";

  /**
   * @uiName Reward status text
   * @uiWidget textArea
   */
  @Prop() statusText: string =
    "{status, select, AVAILABLE {Available} CANCELLED {Cancelled} PENDING {Pending} PENDING_REVIEW {Pending} PAYOUT_APPROVED {Payout Approved} PAYOUT_CANCELLED {Payout Cancelled} PAYOUT_FAILED {Payout Failed} EXPIRED {Expired} REDEEMED {Redeemed} DENIED {Denied} other {Not available} }";

  /**
   * Text shown before the date of an expiring reward.
   *
   * @uiName Expiry date prefix
   */
  @Prop() expiryText: string = "Expires on ";

  /**
   * Displayed when a reward is pending due to W9 compliance.
   *
   * @uiName W9 pending text
   */
  @Prop() pendingUsTax: string = "W-9 required";

  /**
   * Text shown before the available date of a pending reward.
   *
   * @uiName Pending date prefix
   */
  @Prop() pendingScheduled: string = "Until";

  /**
   * Displayed when fulfillment error occured when creating a reward.
   *
   * @uiName Unhandled error text
   */
  @Prop() pendingUnhandled: string = "Fulfillment error";

  /**
   *  Displayed when flagged for fraud.
   *
   * @uiName Pending review text
   */
  @Prop() pendingReviewText: string = "Awaiting review";

  /**
   *  Displayed when denied for fraud.
   *
   * @uiName Denied text
   */
  @Prop() deniedText: string = "Detected self-referral";

  /**
   * Displayed when pending due to tax document review.
   *
   * @uiName Pending tax review text
   */
  @Prop() pendingTaxReview: string = "Awaiting tax form review.";

  /**
   * Displayed when pending due to requiring a new tax document
   *
   * @uiName Pending new tax form text
   */
  @Prop() pendingNewTaxForm: string =
    "Invalid tax form. Submit a new form to receive your rewards.";

  /**
   * Displayed when pending due to lack of tax document submission.
   *
   * @uiName Pending tax submission text
   */
  @Prop() pendingTaxSubmission: string =
    "Submit your tax documents to receive your rewards.";

  /**
   * Displayed when pending due to need to connect to an Impact partner
   *
   * @uiName Pending partner creation text
   */
  @Prop() pendingPartnerCreation: string =
    "Complete your tax and cash payout setup to receive your rewards.";

  /**
   * Displayed when reward payout has failed (based on Impact cash payout configuration).
   *
   * @uiName Payout failed text
   */
  @Prop() payoutFailed: string =
    "Payout failed due to a fulfillment issue and is current being retried.";

  /**
   * Displayed when reward payout was reversed (based on Impact cash payout configuration).
   *
   * @uiName Payout cancelled text
   */
  @Prop() payoutCancelled: string =
    "If you think this is a mistake, contact our Support team.";

  /**
   * Displayed when reward payout is approved (based on Impact cash payout configuration).
   *
   * @uiName Payout approved text
   */
  @Prop() payoutApproved: string =
    "Reward approved for payout and was scheduled for payment based on your settings.";

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  @Method()
  async renderCell(
    data: Reward,
    options?: { locale: string; taxConnection: ImpactConnection }
  ) {
    return (
      <sqm-rewards-table-status-cell
        statusText={this.statusText}
        reward={data}
        taxConnection={options?.taxConnection}
        expiryText={this.expiryText}
        pendingScheduled={this.pendingScheduled}
        pendingUsTax={this.pendingUsTax}
        pendingUnhandled={this.pendingUnhandled}
        pendingReviewText={this.pendingReviewText}
        payoutFailed={this.payoutFailed}
        payoutApproved={this.payoutApproved}
        payoutCancelled={this.payoutCancelled}
        deniedText={this.deniedText}
        locale={options?.locale}
      ></sqm-rewards-table-status-cell>
    );
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
      this.pendingReviewText,
      this.pendingScheduled,
      this.pendingUsTax,
      this.pendingUnhandled,
    ]);
    return <Host style={{ display: "none" }} />;
  }
}
