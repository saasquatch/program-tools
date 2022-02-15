import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Host, Method, Prop } from "@stencil/core";
import { useRequestRerender } from "../../../tables/re-render";
import { RewardTableColumn } from "./RewardTableColumn";

/**
 * @uiName Reward Table Date Column
 */
@Component({
  tag: "sqm-rewards-table-date-column",
  shadow: true,
})
export class RewardTableDateColumn implements RewardTableColumn {
  /**
   * @uiName Date Column Title
   */
  @Prop() columnTitle: string = "Date received";

  /**
   * @uiName Date Displayed
   * @uiType string
   * @uiEnum ["dateGiven",
   * "dateExpires",
   * "dateCancelled",
   * "dateRedeemed",
   * "dateScheduledFor"]
   */
  @Prop() dateShown: string = "dateGiven";

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  @Method()
  async renderCell(data: Reward, locale: string) {
    return (
      <sqm-rewards-table-date-cell
        date={data[this.dateShown]}
        locale={locale}
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
