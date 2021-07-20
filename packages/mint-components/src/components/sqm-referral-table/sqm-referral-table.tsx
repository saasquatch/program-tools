import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Prop } from "@stencil/core";
import { ReferralTableView } from "./sqm-referral-table-view";
import { useReferralTable } from "./useReferralTable";

/**
 * @uiName Referral Table
 */
@Component({
  tag: "sqm-referral-table",
  shadow: true,
})
export class ReferralTable {

  /**
   * Filters to only show referrals in this program. Will default to filtering by the program context where 
   * this table lives. If no program ID is set or provided by context, then shows all referrals from all programs.
   * 
   * @uiName Program
   */
  @Prop() programId: string;

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  render() {
    const { states, callbacks, elements } = useReferralTable(this);

    return (
      <ReferralTableView
        states={states}
        callbacks={callbacks}
        elements={elements}
      ></ReferralTableView>
    );
  }
}
