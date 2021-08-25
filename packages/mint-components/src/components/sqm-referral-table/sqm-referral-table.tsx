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
   * If program ID is "classic", shows classic-only referrals
   *
   * @uiName Program
   */
  @Prop() programId: string;

  /** @uiName Number of referrals per page */
  @Prop() perPage: number = 3;

  /** @uiName Show column labels */
  @Prop() showLabels?: boolean = true;

  /** @uiName Previous button text  */
  @Prop() prevLabel?: string = "Prev";

  /** @uiName View More button text  */
  @Prop() moreLabel?: string = "Next";

  /** @uiName Show Referred by user in table  */
  @Prop() showReferrer?: boolean = false;

  /** @undocumented */
  @Prop() demoData?: DemoData<ReferralTableViewProps>;

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  render() {
    const empty = (
      <slot name="empty">
        <div style={{ width: "100%" }}>
          <sqm-text>
            <h3 style={{ color: "#777777" }}>No Referrals Yet</h3>
          </sqm-text>
        </div>
      </slot>
    );
    const loading = (
      <slot name="loading">
        <div style={{ width: "100%" }}>
          <sl-skeleton style={{ marginBottom: "28px" }}></sl-skeleton>
          <sl-skeleton style={{ marginBottom: "28px" }}></sl-skeleton>
          <sl-skeleton style={{ marginBottom: "28px" }}></sl-skeleton>
          <sl-skeleton style={{ marginBottom: "28px" }}></sl-skeleton>
          <sl-skeleton></sl-skeleton>
        </div>
      </slot>
    );

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

function useReferraltableDemo(props: ReferralTable): ReferralTableViewProps {
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
          <div style={{ width: "100%", textAlign: "center" }}>
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
    props.demoData || {},
    { arrayMerge: (_, a) => a }
  );
}
