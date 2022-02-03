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
  DateCell,
  RewardsCellCreditCancelled,
  RewardsCellCreditFull,
  RewardsCellCreditPartial,
  RewardsCellCreditRedeemed,
  SourceCellDeletedUser,
  SourceCellManual,
  SourceCellReferral,
  SourceCellReferred,
  StatusCellAvailable,
  StatusCellAvailableExpiry,
  StatusCellCancelled,
  StatusCellRedeemed,
} from "./RewardsTableCell.stories";
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
  @Prop() perPage: number = 4;

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
  @Prop()
  demoData?: DemoData<GenericTableViewProps>;

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  render() {
    const empty = <slot name="empty"/>;
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

function useRewardsTableDemo(props: RewardsTable): GenericTableViewProps {
  return deepmerge(
    {
      states: {
        hasPrev: false,
        hasNext: false,
        loading: false,
        show: "rows",
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
        emptyElement: (
          <sqm-empty
            emptyStateImage="https://res.cloudinary.com/saasquatch/image/upload/v1642618031/squatch-assets/image_4_1.png"
            emptyStateHeader="View your rewards"
            emptyStateText="See all the rewards you have earned from referring friends and completing tasks"
            table
          />
        ),
        loadingElement: <LoadingSlot />,
        // TODO: This should be smarter
        columns: ["Reward", "Source", "Status", "Date recieved"],
        rows: [
          [
            <RewardsCellCreditFull />,
            <StatusCellAvailable />,
            <SourceCellReferral />,
            <DateCell />,
          ],
          [
            <RewardsCellCreditCancelled />,
            <StatusCellCancelled />,
            <SourceCellDeletedUser />,
            <DateCell />,
          ],
          [
            <RewardsCellCreditRedeemed />,
            <StatusCellRedeemed />,
            <SourceCellManual />,
            <DateCell />,
          ],
          [
            <RewardsCellCreditPartial />,
            <StatusCellAvailableExpiry />,
            <SourceCellReferred />,
            <DateCell />,
          ],
        ],
      },
    },
    props.demoData || {},
    { arrayMerge: (_, a) => a }
  );
}
