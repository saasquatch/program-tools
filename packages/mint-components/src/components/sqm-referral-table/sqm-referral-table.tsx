import { isDemo } from "@saasquatch/component-boilerplate";
import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Prop } from "@stencil/core";
import deepmerge from "deepmerge";
import { DemoData } from "../../global/demo";
import {
  GenericTableView,
  GenericTableViewProps,
} from "../../tables/GenericTableView";
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

  /** @uiName Hide Columns (Mobile View)  */
  @Prop() hiddenColumns?: string = "0";

  /** @uiName Hide Columns (Mobile View)  */
  @Prop() smBreakpoint?: number = 634;

  /** @uiName Hide Columns (Mobile View)  */
  @Prop() mdBreakpoint?: number = 899;

  /** @uiName Empty State Image Link  */
  @Prop() emptyStateImgUrl: string = "https://res.cloudinary.com/saasquatch/image/upload/v1642618031/squatch-assets/image_3_1.png";

  /** @uiName Empty State Title  */
  @Prop() emptyStateTitle: string = "View your referral details";

  /** @uiName Empty State Text  */
  @Prop() emptyStateText: string =
    "Track the status of your referrals and rewards earned by referring friends";

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
    const empty = (
      <EmptySlot
        emptyStateImgUrl={this.emptyStateImgUrl}
        emptyStateTitle={this.emptyStateTitle}
        emptyStateText={this.emptyStateText}
      />
    );
    const loading = <LoadingSlot />;

    const { states, data, callbacks, elements } = isDemo()
      ? useReferraltableDemo(this)
      : useReferralTable(this, empty, loading);

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

function useReferraltableDemo(props: ReferralTable): GenericTableViewProps {
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
        emptyElement: (
          <EmptySlot
            emptyStateImgUrl="https://res.cloudinary.com/saasquatch/image/upload/v1642618031/squatch-assets/image_3_1.png"
            emptyStateTitle="View your referral details"
            emptyStateText="Track the status of your referrals and rewards earned by referring
		friends"
          />
        ),
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
