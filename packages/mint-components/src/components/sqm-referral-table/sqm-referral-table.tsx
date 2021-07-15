import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, State } from "@stencil/core";
import { ReferralTableView } from "./sqm-referral-table-view";
import { useReferralTable } from "./useReferralTable";

/**
 * @uiName Referral Table
 */
@Component({
  tag: "sqm-referral-table",
  styleUrl: "sqm-referral-table.scss",
  shadow: true,
})
export class ReferralTable {
  @State()
  ignored = true;

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  render() {
    const { columns, rows } = useReferralTable();

    return (
      <ReferralTableView columns={columns} rows={rows}></ReferralTableView>
    );
  }
}
