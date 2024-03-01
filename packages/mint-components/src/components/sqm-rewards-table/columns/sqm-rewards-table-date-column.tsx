import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Host, Method, Prop } from "@stencil/core";
import { useRequestRerender } from "../../../tables/re-render";
import { RewardTableColumn } from "./RewardTableColumn";

/**
 * @uiName Reward Table Date Column
 * @validParents ["sqm-rewards-table"]
 * @exampleGroup Rewards
 * @example Reward Table Date Column - <sqm-rewards-table-date-column column-title="Date received" date-shown="dateGiven"></sqm-rewards-table-date-column>
 */
@Component({
  tag: "sqm-rewards-table-date-column",
  shadow: true,
})
export class RewardTableDateColumn implements RewardTableColumn {
  /**
   * @uiName Date column title
   */
  @Prop() columnTitle: string = "Date received";

  /**
   * @uiName Date displayed
   * @uiType string
   * @uiEnum ["dateGiven",
   * "dateExpires",
   * "dateCancelled",
   * "dateRedeemed",
   * "dateScheduledFor"]
   * @uiEnumNames ["Date Given", "Date Expires", "Date Cancelled", "Date Redeemed", "Date Scheduled For"]
   */
  @Prop() dateShown: string = "dateGiven";

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  @Method()
  async renderCell(data: Reward, options: { locale: string }) {
    return (
      <sqm-rewards-table-date-cell
        date={data[this.dateShown]}
        locale={options.locale}
      ></sqm-rewards-table-date-cell>
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
