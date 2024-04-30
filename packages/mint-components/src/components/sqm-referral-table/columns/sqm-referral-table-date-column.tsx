import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Host, Method, Prop } from "@stencil/core";
import { useRequestRerender } from "../../../tables/re-render";
import { ReferralDates } from "../useReferralTable";
import { ReferralTableColumn } from "./ReferralTableColumn";

/**
 * @uiName Referral Table Date Column
 * @validParents ["sqm-referral-table"]
 * @exampleGroup Referrals
 * @example Referral Table Date Column - <sqm-referral-table-date-column column-title="Date converted" date-shown="dateConverted"></sqm-referral-table-date-column>
 */
@Component({
  tag: "sqm-referral-table-date-column",
  shadow: true,
})
export class ReferralTableDateColumn implements ReferralTableColumn {
  /**
   * @uiName Date column title
   */
  @Prop() columnTitle: string = "Date converted";
  /**
   * @uiName Date displayed
   * @uiType string
   * @uiEnum ["dateConverted",
   * "dateReferralStarted",
   * "dateFraudChecksCompleted",
   * "dateModerated",
   * "dateModified",
   * "dateReferralEnded",
   * "dateReferralPaid",
   * "dateUserModified"]
   * @uiEnumNames ["Date Converted",
   * "Date Referral Started",
   * "Date Fraud Checks Completed",
   * "Date Moderated",
   * "Date Modified",
   * "Date Referral Ended",
   * "Date Referral Paid",
   * "Date User Modified"]
   */
  @Prop() dateShown: ReferralDates = "dateConverted";

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  @Method()
  async renderCell(data: Referral, options?: { locale: string }) {
    // TODO - Validate `dateShown` against a set of known values

    return (
      <sqm-referral-table-date-cell
        date={data[this.dateShown]}
        locale={options?.locale}
      ></sqm-referral-table-date-cell>
    );
  }

  @Method()
  async renderLabel() {
    return this.columnTitle;
  }

  @Method()
  async renderReferrerCell(data: Referrer) {
    // TODO - Validate `dateShown` against a set of known values
    return (
      <sqm-referral-table-date-cell
        date={data[this.dateShown]}
      ></sqm-referral-table-date-cell>
    );
  }

  render() {
    useRequestRerender([this.dateShown, this.columnTitle]);
    return <Host style={{ display: "none" }} />;
  }
}
