import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Host, Method, Prop } from "@stencil/core";
import { Referral, Referrer } from "../../../saasquatch";
import { useRequestRerender } from "../../../tables/re-render";
import { getReferralStatus, ReferralStatus } from "../referralStatus";
import { ReferralTableColumn } from "./ReferralTableColumn";

/**
 * @uiName Referral Table Status Column
 * @validParents ["sqm-referral-table"]
 * @exampleGroup Referrals
 * @example Referral Table Status Column - <sqm-referral-table-status-column column-title="Status" converted-status-text="Converted" in-progress-status-text="In Progress" pending-review-status-text="Pending" denied-status-text="Denied" retracted-status-text="Cancelled" pending-review-status-sub-text="Awaiting review" denied-status-sub-text="Detected self-referral" retracted-status-sub-text="This purchase was cancelled or refunded"></sqm-referral-table-status-column>
 */
@Component({
  tag: "sqm-referral-table-status-column",
  shadow: true,
})
export class ReferralTableStatusColumn implements ReferralTableColumn {
  /**
   * @uiName Column title
   */
  @Prop() columnTitle: string = "Status";

  /**
   * @uiName Converted status text
   */
  @Prop() convertedStatusText: string = "Converted";

  /**
   * @uiName In progress status text
   */
  @Prop() inProgressStatusText: string = "In Progress";

  /**
   * @uiName Pending review status text
   */
  @Prop() pendingReviewStatusText: string = "Pending";

  /**
   * @uiName Denied status text
   */
  @Prop() deniedStatusText: string = "Denied";

  /**
   * @uiName Retracted status text
   */
  @Prop() retractedStatusText: string = "Cancelled";

  /**
   * @uiName Pending review status sub-text
   */
  @Prop() pendingReviewStatusSubText: string = "Awaiting review";

  /**
   * @uiName Denied status sub-text
   */
  @Prop() deniedStatusSubText: string = "Detected self-referral";

  /**
   * @uiName Retracted status sub-text
   */
  @Prop() retractedStatusSubText: string =
    "This purchase was cancelled or refunded";

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  private getStatusCopy(status: ReferralStatus): {
    text: string;
    subText?: string;
  } {
    return {
      DENIED: {
        text: this.deniedStatusText,
        subText: this.deniedStatusSubText,
      },
      PENDING_REVIEW: {
        text: this.pendingReviewStatusText,
        subText: this.pendingReviewStatusSubText,
      },
      RETRACTED: {
        text: this.retractedStatusText,
        subText: this.retractedStatusSubText,
      },
      CONVERTED: { text: this.convertedStatusText },
      IN_PROGRESS: { text: this.inProgressStatusText },
    }[status];
  }

  @Method()
  async renderCell(data: Referral) {
    const status = getReferralStatus(data);
    const { text, subText } = this.getStatusCopy(status);

    return (
      <sqm-referral-table-status-cell
        status={status}
        status-text={text}
        status-sub-text={subText}
        fraud-status={data?.fraudData?.moderationStatus}
        converted={data.dateConverted ? true : false}
      ></sqm-referral-table-status-cell>
    );
  }

  @Method()
  async renderLabel() {
    return this.columnTitle;
  }

  @Method()
  async renderReferrerCell(data: Referrer) {
    const status = getReferralStatus(data);
    const { text, subText } = this.getStatusCopy(status);

    return (
      <sqm-referral-table-status-cell
        status={status}
        status-text={text}
        status-sub-text={subText}
        converted={data.dateConverted ? true : false}
      ></sqm-referral-table-status-cell>
    );
  }

  render() {
    useRequestRerender([
      this.columnTitle,
      this.convertedStatusText,
      this.inProgressStatusText,
      this.pendingReviewStatusText,
      this.deniedStatusText,
      this.retractedStatusText,
      this.pendingReviewStatusSubText,
      this.deniedStatusSubText,
      this.retractedStatusSubText,
    ]);
    return <Host style={{ display: "none" }} />;
  }
}
