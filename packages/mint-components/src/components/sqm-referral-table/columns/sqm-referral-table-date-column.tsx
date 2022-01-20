import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Host, Method, Prop } from "@stencil/core";
import { useRequestRerender } from "../../../tables/re-render";
import { ReferralDates } from "../useReferralTable";
import { ReferralTableColumn } from "./ReferralTableColumn";

/**
 * @uiName Referral Table Date Column
 */
@Component({
  tag: "sqm-referral-table-date-column",
  shadow: true,
})
export class ReferralTableDateColumn implements ReferralTableColumn {
  /**
   * @uiName Date Column Title
   */
  @Prop() columnTitle: string = "Date Converted";
  /**
   * @uiName Date Displayed
   * @uiType string
   * @uiEnum ["dateConverted",
   * "dateReferralStarted",
   * "dateFraudChecksCompleted",
   * "dateModerated",
   * "dateModified",
   * "dateReferralEnded",
   * "dateReferralPaid",
   * "dateUserModified"]
   */
  @Prop() dateShown: ReferralDates = "dateConverted";

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  @Method()
  async renderCell(data: Referral, locale: string) {
    // TODO - Validate `dateShown` against a set of known values
    return (
      <sqm-referral-table-date-cell
        date={data[this.dateShown]}
        locale={locale}
      ></sqm-referral-table-date-cell>
    );
  }

  @Method()
  async renderLabel() {
    return this.columnTitle;
  }

  render() {
    useRequestRerender([this.dateShown, this.columnTitle]);
    return <Host style={{ display: "none" }} />;
  }
}
