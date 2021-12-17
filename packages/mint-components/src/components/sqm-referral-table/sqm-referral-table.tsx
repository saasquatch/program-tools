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

  /**
   * @undocumented
   * @uiType object
   */
  @Prop() demoData?: DemoData<ReferralTableViewProps>;

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  render() {
    const empty = <EmptySlot />;
    const loading = <LoadingSlot />;

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
function LoadingSlot() {
  return (
    <slot name="loading">
      <LoadingRow />
      <LoadingRow />
      <LoadingRow />
      <LoadingRow />
    </slot>
  );
}
function LoadingRow() {
  return (
    <sqm-table-row>
      <sqm-table-cell colspan={5}>
        <sl-skeleton></sl-skeleton>
      </sqm-table-cell>
    </sqm-table-row>
  );
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
        textOverrides: {
          showLabels: props.showLabels,
          prevLabel: props.prevLabel,
          moreLabel: props.moreLabel,
        },
        referralData: [],
      },
      elements: {
        emptyElement: <EmptySlot />,
        loadingElement: <LoadingSlot />,
        columns: [
          <div>User</div>,
          <div>Referral Status</div>,
          <div>Rewards</div>,
        ],
        rows: [],
      },
    },
    props.demoData || {},
    { arrayMerge: (_, a) => a }
  );
}

function EmptySlot() {
  return (
    <slot name="empty">
      <div style={{ width: "100%" }}>
        <sqm-text>
          <h3 style={{ color: "#777777" }}>No Referrals Yet</h3>
        </sqm-text>
      </div>
    </slot>
  );
}
