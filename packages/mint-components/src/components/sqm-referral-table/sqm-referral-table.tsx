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
  AvailableNoExpiry,
  Cancelled,
  PendingNoUnpend,
} from "./ReferralTableRewardsCell.stories";
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
  @Prop() perPage: number = 4;

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
  @Prop() emptyStateImage: string =
    "https://res.cloudinary.com/saasquatch/image/upload/v1642618031/squatch-assets/image_3_1.png";

  /** @uiName Empty State Title  */
  @Prop() emptyStateHeader: string = "View your referral details";

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
        emptyStateImage={this.emptyStateImage}
        emptyStateHeader={this.emptyStateHeader}
        emptyStateText={this.emptyStateText}
      />
    );
    const loading = <LoadingSlot />;

    const { states, data, callbacks, elements } = isDemo()
      ? useReferraltableDemo(this)
      : useReferralTable(this, empty, loading);

    console.log("elemente", elements);

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
  const demoProps = deepmerge(
    {
      states: {
        hasPrev: false,
        hasNext: false,
        loading: false,
        show: "rows",
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
            emptyStateImage="https://res.cloudinary.com/saasquatch/image/upload/v1642618031/squatch-assets/image_3_1.png"
            emptyStateHeader="View your referral details"
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
        rows: [
          [
            <sqm-referral-table-user-cell name="Joe Smith"></sqm-referral-table-user-cell>,
            <sqm-referral-table-status-cell
              statusText="Completed"
              converted={true}
            ></sqm-referral-table-status-cell>,
            <PendingNoUnpend />,
          ],
          [
            <sqm-referral-table-user-cell name="Bob Williams"></sqm-referral-table-user-cell>,
            <sqm-referral-table-status-cell
              statusText="In Progress"
              converted={false}
            ></sqm-referral-table-status-cell>,
            <AvailableNoExpiry />,
          ],
          [
            <sqm-referral-table-user-cell name="Sarah Joseph"></sqm-referral-table-user-cell>,
            <sqm-referral-table-status-cell
              statusText="Completed"
              converted={true}
            ></sqm-referral-table-status-cell>,
            <Cancelled />,
          ],
        ],
      },
    },
    props.demoData || {},
    { arrayMerge: (_, a) => a }
  );
  console.log("PROPS", demoProps);

  return demoProps;
}

function EmptySlot({
  emptyStateImage,
  emptyStateHeader,
  emptyStateText,
}: {
  emptyStateImage: string;
  emptyStateHeader: string;
  emptyStateText: string;
}) {
  return (
    <div slot="empty" style={{ display: "contents" }}>
      <sqm-table-row>
        <sqm-table-cell colspan={5} style={{ textAlign: "center" }}>
          <sqm-portal-container padding="xxxx-large" gap="medium">
            <sqm-image
              image-url={emptyStateImage}
              max-width="100px"
            ></sqm-image>
            <sqm-titled-section label-margin="xxx-small" text-align="center">
              <sqm-text slot="label">
                <h3>{emptyStateHeader}</h3>
              </sqm-text>
              <sqm-text slot="content">{emptyStateText}</sqm-text>
            </sqm-titled-section>
          </sqm-portal-container>
        </sqm-table-cell>
      </sqm-table-row>
    </div>
  );
}
