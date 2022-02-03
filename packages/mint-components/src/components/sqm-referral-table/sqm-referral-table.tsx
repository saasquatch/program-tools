import {
  isDemo,
  useLocale,
  usePagination,
} from "@saasquatch/component-boilerplate";
import { withHooks } from "@saasquatch/stencil-hooks";
import { useEffect, useReducer } from "@saasquatch/universal-hooks";
import { Component, h, Prop, VNode } from "@stencil/core";
import deepmerge from "deepmerge";
import { DemoData } from "../../global/demo";
import {
  GenericTableView,
  GenericTableViewProps,
} from "../../tables/GenericTableView";
import { useRerenderListener } from "../../tables/re-render";
import { useChildElements } from "../../tables/useChildElements";
import mockReferralData from "./mockReferralData";
import {
  AvailableNoExpiry,
  Cancelled,
  PendingNoUnpend,
} from "./ReferralTableRewardsCell.stories";
import { tryMethod, useReferralTable } from "./useReferralTable";

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
      ? useReferralTableDemo(this, empty, loading)
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

function useReferralTableDemo(
  props: ReferralTable,
  emptyElement: VNode,
  loadingElement: VNode
): GenericTableViewProps {
  const [content, setContent] = useReducer<
    GenericTableViewProps["elements"],
    Partial<GenericTableViewProps["elements"]>
  >(
    (state, next) => ({
      ...state,
      ...next,
    }),
    {
      columns: [],
      rows: [],
      loading: false,
      page: 0,
    }
  );

  const tick = useRerenderListener();

  const { data } = mockReferralData;

  const components = useChildElements();

  async function getComponentData(components: Element[]) {
    let componentData;
    const { data: mockData } = mockReferralData;
    const referrerData = mockReferralData?.referredByReferral;
    const showReferrerRow =
      props.showReferrer &&
      !!mockReferralData?.referredByReferral.dateReferralStarted;

    if (showReferrerRow) {
      console.log("mock data", mockData.slice(-1));
      componentData = mockData.slice(0, -1);
    } else {
      componentData = data;
    }
    // filter out loading and empty states from columns array
    const columnComponents = components.filter(
      (component) => component.slot !== "loading" && component.slot !== "empty"
    );
    // get the column titles (renderLabel is asynchronous)
    const columnsPromise = columnComponents?.map(async (c: any) =>
      tryMethod(c, () => c.renderLabel())
    );

    // show the referrer row before any other rows (renderReferrerCell is asynchronous)
    let referrerRow;
    if (showReferrerRow) {
      const referrerPromise = columnComponents?.map(async (c: any) =>
        tryMethod(c, function renderCell() {
          return c.renderCell(referrerData, c);
        })
      );
      referrerRow = await Promise.all(referrerPromise);
    }

    // get the column cells (renderCell is asynchronous)
    const cellsPromise = componentData?.map(async (r) => {
      const cellPromise = columnComponents?.map(async (c: any) =>
        tryMethod(c, () => c.renderCell(r, undefined))
      );
      const cells = (await Promise.all(cellPromise)) as VNode[][];
      return cells;
    });

    const rows =
      cellsPromise &&
      [referrerRow, ...(await Promise.all(cellsPromise))].filter(
        (value) => value
      );

    setContent({ rows });
    const columns =
      columnsPromise && ((await Promise.all(columnsPromise)) as string[]);
    // Set the content to render and finish loading components
    setContent({ columns, loading: false, page: 0 });
  }

  useEffect(() => {
    setContent({ loading: true });
    data && getComponentData(components);
  }, [data, components, tick]);

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
        columns: content.columns,
        rows: content.rows,
        emptyElement,
        loadingElement,
      },
    },
    props.demoData || {},
    { arrayMerge: (_, a) => a }
  );

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
