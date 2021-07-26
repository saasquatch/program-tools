import { isDemo } from "@saasquatch/component-boilerplate";
import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Prop } from "@stencil/core";
import deepmerge from "deepmerge";
import { DemoData } from "../../global/demo";
import {
  ReferralTableView,
  ReferralTableViewProps,
} from "./sqm-referral-table-view";
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

  /** @undocumented */
  @Prop() demoData?: DemoData<ReferralTableViewProps>;

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  render() {
    const empty = <slot name="empty" />;
    const loading = <slot name="loading" />;

    const { states, data, callbacks, elements } = isDemo()
      ? useReferraltableDemo(this)
      : useReferralTable(this, empty, loading);

    return (
      <ReferralTableView
        states={states}
        data={data}
        callbacks={callbacks}
        elements={elements}
      ></ReferralTableView>
    );
  }
}

function useReferraltableDemo(props: ReferralTable) {
  return deepmerge(
    {
      states: {
        hasPrev: false,
        hasNext: false,
        loading: false,
      },
      callbacks: {
        prevPage: () => console.log("Prev"),
        nextPage: () => console.log("Next"),
      },
      data: {
        referralData: [],
      },
      elements: {
        emptyElement: (
          <div style={{ width: "100%" }}>
            <sqm-text>
              <h3 style={{ color: "#777777" }}>No Referrals Yet</h3>
            </sqm-text>
          </div>
        ),
        loadingElement: (
          <div style={{ width: "100%" }}>
            <sl-skeleton style={{ marginBottom: "28px" }}></sl-skeleton>
            <sl-skeleton style={{ marginBottom: "28px" }}></sl-skeleton>
            <sl-skeleton style={{ marginBottom: "28px" }}></sl-skeleton>
            <sl-skeleton style={{ marginBottom: "28px" }}></sl-skeleton>
            <sl-skeleton></sl-skeleton>
          </div>
        ),
        columns: [<div>Name</div>, <div>Email</div>, <div>DOB</div>],
        rows: [],
      },
    },
    props.demoData,
    { arrayMerge: (_, a) => a }
  );
}
