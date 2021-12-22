import { isDemo } from "@saasquatch/component-boilerplate";
import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Prop } from "@stencil/core";
import deepmerge from "deepmerge";
import { DemoData } from "../../global/demo";
import {
  GenericTableView,
  GenericTableViewProps,
} from "../../tables/GenericTableView";
import {
  EmptySkeleton,
  EmptySlot,
  LoadingSkeleton,
  LoadingSlot,
} from "../../tables/TableSlots";
import { CSS_NAMESPACE, useRewardsTable } from "./useRewardsTable";

/**
 * @uiName Rewards Table
 */
@Component({
  tag: "sqm-rewards-table",
  shadow: true,
})
export class RewardsTable {
  /**
   * Filters to only show rewards in this program. Will default to filtering by the program context where
   * this table lives. If no program ID is set or provided by context, then shows all rewards from all programs.
   *
   * @uiName Program
   */
  @Prop() programId: string;

  /** @uiName Number of rewards per page */
  @Prop() perPage: number = 3;

  /** @uiName Show column labels */
  @Prop() showLabels?: boolean = true;

  /** @uiName Previous button text  */
  @Prop() prevLabel?: string = "Prev";

  /** @uiName View More button text  */
  @Prop() moreLabel?: string = "Next";

  /** @uiName Hide Columns (Mobile View)  */
  @Prop() hiddenColumns?: string = "0";

  /** @uiName Hide Columns (Mobile View)  */
  @Prop() smBreakpoint?: number = 599;

  /** @uiName Hide Columns (Mobile View)  */
  @Prop() mdBreakpoint?: number = 899;

  /**
   * @undocumented
   * @uiType object
   */
  @Prop() demoData?: DemoData<GenericTableViewProps>;

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  render() {
    const empty = <EmptySlot label="No Rewards Yet" />;
    const loading = <LoadingSlot />;

    const { states, data, callbacks, elements } = isDemo()
      ? useRewardsTableDemo(this)
      : useRewardsTable(this, empty, loading);

    return (
      <GenericTableView
        states={states}
        data={data}
        callbacks={callbacks}
        elements={elements}
      ></GenericTableView>
    );
  }
}

function useRewardsTableDemo(props: RewardsTable): GenericTableViewProps {
  return deepmerge(
    {
      states: {
        hasPrev: false,
        hasNext: false,
        loading: false,
        namespace: CSS_NAMESPACE,
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
        emptyElement: <EmptySkeleton label="No Rewards Yet" />,
        loadingElement: <LoadingSkeleton />,
        // TODO: This should be smarter
        columns: [<div>Name</div>, <div>Email</div>, <div>DOB</div>],
        rows: [],
      },
    },
    props.demoData || {},
    { arrayMerge: (_, a) => a }
  );
}
