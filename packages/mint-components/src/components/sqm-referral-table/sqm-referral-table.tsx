import { isDemo } from "@saasquatch/component-boilerplate";
import { withHooks } from "@saasquatch/stencil-hooks";
import { useEffect, useMemo, useReducer } from "@saasquatch/universal-hooks";
import { Component, h, Prop, VNode } from "@stencil/core";
import deepmerge from "deepmerge";
import { DemoData } from "../../global/demo";
import {
  GenericTableView,
  GenericTableViewProps,
} from "../../tables/GenericTableView";
import {
  useRequestRerender,
  useRerenderListener,
} from "../../tables/re-render";
import { useChildElements } from "../../tables/useChildElements";
import mockReferralData from "./mockReferralData";
import { tryMethod, useReferralTable } from "./useReferralTable";

/**
 * @uiName Referral Table
 * @exampleGroup Referrals
 * @slots [{"name":"", "title":"Table Row"},{"name":"empty", "title":"Empty"},{"name":"loading","title":"Loading"}]
 * @example Referral Table - <sqm-referral-table per-page="4" hidden-columns="2" more-label="Next" prev-label="Prev" sm-breakpoint="599" md-breakpoint="799" ><sqm-referral-table-user-column column-title="Customer" anonymous-user="Anonymous User" deleted-user="Deleted User" ></sqm-referral-table-user-column ><sqm-referral-table-rewards-column column-title="Rewards" status-text="{status, select, AVAILABLE {Available} CANCELLED {Cancelled} PENDING {Pending} PENDING_REVIEW {Pending} Denied {Denied} EXPIRED {Expired} REDEEMED {Redeemed} other {Not available} }" status-long-text="{status, select, AVAILABLE {Reward expiring on} CANCELLED {Reward cancelled on} PENDING {Available on} EXPIRED {Reward expired on} other {Not available} }" fuel-tank-text="Your code is" reward-received-text="Reward received on" expiring-text="Expiring in" pending-for-text="{status} for {date}" ></sqm-referral-table-rewards-column ><sqm-referral-table-date-column column-title="Date converted" date-shown="dateConverted" ></sqm-referral-table-date-column ><sqm-referral-table-status-column column-title="Status" converted-status-text="Converted" in-progress-status-text="In Progress" pending-review-status-text="Pending" denied-status-text="Denied" ></sqm-referral-table-status-column ><sqm-empty empty-state-image="https://res.cloudinary.com/saasquatch/image/upload/v1644000223/squatch-assets/empty_referral2.png" empty-state-header="View your referral details" empty-state-text="Refer a friend to view the status of your referrals and rewards earned" slot="empty" ></sqm-empty ></sqm-referral-table> */
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
   * @uiWidget programSelector
   */
  @Prop() programId: string;

  /**
   * Number of referrals displayed per page
   *
   * @uiName Referrals per page
   */
  @Prop() perPage: number = 4;

  /** @uiName Hide column labels */
  @Prop() hideLabels?: boolean = false;

  /** @uiName Previous button text  */
  @Prop() prevLabel?: string = "Prev";

  /** @uiName View More button text  */
  @Prop() moreLabel?: string = "Next";

  /**
   * Show referred by user in table
   *
   * @uiName Show referrer
   * @default
   */
  @Prop() showReferrer?: boolean = false;

  /**
   * Provide the column numbers (0 indexed) that should not be displayed in mobile views. Ex. 0,2,3
   *
   * @uiName Hidden mobile columns
   */
  @Prop() hiddenColumns?: string = "0";

  /** @uiName Mobile breakpoint  */
  @Prop() smBreakpoint?: number = 599;

  /** @uiName Tablet breakpoint  */
  @Prop() mdBreakpoint?: number = 799;

  /**
   * @undocumented
   * @uiType object
   */
  @Prop() demoData?: DemoData<GenericTableViewProps> & {
    mockData?: { data: Referral[] };
  };

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  render() {
    const empty = <EmptySlot />;
    const loading = <LoadingSlot />;

    const { states, data, callbacks, elements } = isDemo()
      ? useReferralTableDemo(this, empty, loading)
      : useReferralTable(this, empty, loading);

    useRequestRerender([this.showReferrer, this.perPage]);

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

function EmptySlot() {
  return (
    <slot name="empty">
      <sqm-empty
        empty-state-image="https://res.cloudinary.com/saasquatch/image/upload/v1644000223/squatch-assets/empty_referral2.png"
        empty-state-header="View your referral details"
        empty-state-text="Refer a friend to view the status of your referrals and rewards earned"
      ></sqm-empty>
    </slot>
  );
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

  const mockData = useMemo(
    () => props.demoData?.mockData || mockReferralData(props.perPage),
    [props.perPage]
  );

  const components = useChildElements<Element>();

  async function getComponentData(components: Element[]) {
    let componentData;
    //@ts-ignore
    const referrerData = mockData?.referredByReferral;
    const showReferrerRow =
      props.showReferrer &&
      //@ts-ignore
      !!mockData?.referredByReferral?.dateReferralStarted;

    if (showReferrerRow) {
      componentData = mockData.data.slice(0, props.perPage - 1);
    } else {
      componentData = mockData.data.slice(0, props.perPage);
    }
    // filter out loading and empty states from columns array
    const columnComponents = components.filter(
      (component) =>
        component.slot !== "loading" &&
        component.slot !== "empty" &&
        component?.firstElementChild?.getAttribute("slot") !== "loading" &&
        component?.firstElementChild?.getAttribute("slot") !== "empty"
    );
    // get the column titles (renderLabel is asynchronous)
    const columnsPromise = columnComponents?.map(
      async (c: any, idx: number) => {
        const slot = c?.firstElementChild?.getAttribute("slot");
        // Custom plop targets
        if (
          c.tagName === "RAISINS-PLOP-TARGET" &&
          slot !== "loading" &&
          slot !== "empty"
        ) {
          c.setAttribute("slot", "column-" + idx);
          c.style.position = "absolute";
          // Replace add text with a simple + button
          const plopTarget = c.firstElementChild.childNodes[1];
          plopTarget.innerHTML = "＋";
          (plopTarget as HTMLElement).style.lineHeight = "20px";
          return tryMethod(c, () => c.renderLabel(idx));
        }
        return tryMethod(c, () => c.renderLabel());
      }
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
    mockData?.data && getComponentData(components);
  }, [mockData?.data, components, tick]);

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
          showLabels: !props.hideLabels,
          prevLabel: props.prevLabel,
          moreLabel: props.moreLabel,
        },
        hiddenColumns: props.hiddenColumns,
        referralData: [],
        mdBreakpoint: 799,
        smBreakpoint: 599,
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
