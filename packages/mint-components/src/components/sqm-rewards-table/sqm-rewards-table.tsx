import { isDemo } from "@saasquatch/component-boilerplate";
import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Prop } from "@stencil/core";
import deepmerge from "deepmerge";
import { DemoData } from "../../global/demo";
import {
  GenericTableView,
  GenericTableViewProps,
} from "../../tables/GenericTableView";
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

  /** @uiName Empty State Image Link  */
  @Prop() emptyStateImgUrl: string = "https://i.imgur.com/nbz2xq3.png";

  /** @uiName Empty State Title  */
  @Prop() emptyStateTitle: string = "View your rewards";

  /** @uiName Empty State Text  */
  @Prop() emptyStateText: string =
    "See all the rewards you have earned from referring friends and completing tasks";

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
    const empty = (
      <EmptySlot
        emptyStateImgUrl={this.emptyStateImgUrl}
        emptyStateTitle={this.emptyStateTitle}
        emptyStateText={this.emptyStateText}
      />
    );
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
          <EmptySlot
            emptyStateImgUrl="https://i.imgur.com/nbz2xq3.png"
            emptyStateTitle="View your rewards"
            emptyStateText="See all the rewards you have earned from referring friends and completing tasks"
          />
        ),
        loadingElement: <LoadingSlot />,
        // TODO: This should be smarter
        columns: [<div>Name</div>, <div>Email</div>, <div>DOB</div>],
        rows: [],
      },
    },
    props.demoData || {},
    { arrayMerge: (_, a) => a }
  );
}

function EmptySlot({
  emptyStateImgUrl,
  emptyStateTitle,
  emptyStateText,
}: {
  emptyStateImgUrl: string;
  emptyStateTitle: string;
  emptyStateText: string;
}) {
  return (
    <div slot="empty" style={{ display: "contents" }}>
      <sqm-table-row>
        <sqm-table-cell colspan={5} style={{ textAlign: "center" }}>
          <div style={{ padding: "var(--sl-spacing-xxx-large)" }}>
            <img src={emptyStateImgUrl} style={{ width: "100px" }} />
            <div>
              <b>{emptyStateTitle}</b>
            </div>
            <div
              style={{
                marginTop: "var(--sl-spacing-xx-small)",
                fontSize: "var(--sl-font-size-small)",
                color: "var(--sl-color-neutral-500)",
              }}
            >
              {emptyStateText}
            </div>
          </div>
        </sqm-table-cell>
      </sqm-table-row>
    </div>
  );
}
