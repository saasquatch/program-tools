import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Host, Method, Prop } from "@stencil/core";
import { useRequestRerender } from "../../../tables/re-render";
import { ReferralTableColumn } from "./ReferralTableColumn";

/**
 * @uiName Referral Table Status Column
 * @validParents ["sqm-referral-table"]
 * @exampleGroup Referrals
 * @example Referral Table Status Column - <sqm-referral-table-status-column column-title="Status" converted-status-text="Converted" in-progress-status-text="In Progress"pending-review-status-text="Pending" denied-status-text="Denied"></sqm-referral-table-status-column>
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

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  @Method()
  async renderCell(data: Referral) {
    // TODO: Make ICU and more complete
    let statusText: string;

    const fraudStatus: "PENDING" | "DENIED" | "APPROVED" =
      data?.fraudData?.moderationStatus;

    if (fraudStatus === "DENIED") {
      statusText = this.deniedStatusText;
    } else if (fraudStatus === "PENDING") {
      statusText = this.pendingReviewStatusText;
    } else {
      statusText = data.dateConverted
        ? this.convertedStatusText
        : this.inProgressStatusText;
    }

    return (
      <sqm-referral-table-status-cell
        status-text={statusText}
        fraud-status={fraudStatus}
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
    // TODO: Make ICU and more complete
    const statusText = data.dateConverted
      ? this.convertedStatusText
      : this.inProgressStatusText;
    return (
      <sqm-referral-table-status-cell
        status-text={statusText}
        converted={data.dateConverted ? true : false}
      ></sqm-referral-table-status-cell>
    );
  }

  render() {
    useRequestRerender([
      this.columnTitle,
      this.convertedStatusText,
      this.inProgressStatusText,
    ]);
    return <Host style={{ display: "none" }} />;
  }
}
