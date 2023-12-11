import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Host, Method, Prop } from "@stencil/core";
import { useRequestRerender } from "../../../tables/re-render";
import { RewardTableColumn } from "./RewardTableColumn";

/**
 * @uiName Reward Table Status Column
 * @validParents ["sqm-rewards-table"]
 * @exampleGroup Rewards
 * @example Reward Table Status Column - <sqm-rewards-table-status-column column-title="Status" status-text="{status, select, AVAILABLE {Available} CANCELLED {Cancelled} PENDING {Pending} EXPIRED {Expired} REDEEMED {Redeemed} other {Not available} }" expiry-text="Expires on " pending-us-tax="W-9 required" pending-scheduled="Until" pending-unhandled="Fulfillment error"></sqm-rewards-table-status-column>
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
    "{status, select, AVAILABLE {Available} CANCELLED {Cancelled} PENDING, PENDING_REVIEW {Pending} EXPIRED {Expired} REDEEMED {Redeemed} DENIED {Denied} other {Not available} }";

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

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  @Method()
  async renderCell(data: Reward, locale: string) {
    return (
      <sqm-rewards-table-status-cell
        statusText={this.statusText}
        reward={data}
        expiryText={this.expiryText}
        pendingScheduled={this.pendingScheduled}
        pendingUsTax={this.pendingUsTax}
        pendingUnhandled={this.pendingUnhandled}
        locale={locale}
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
      this.pendingScheduled,
      this.pendingUsTax,
      this.pendingUnhandled,
    ]);
    return <Host style={{ display: "none" }} />;
  }
}
