import { isDemo } from "@saasquatch/component-boilerplate";
import { withHooks } from "@saasquatch/stencil-hooks";
import { useEffect, useReducer, useMemo } from "@saasquatch/universal-hooks";
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
import mockRewardData from "./mockRewardData";

import { tryMethod, useRewardsTable } from "./useRewardsTable";

/**
 * @uiName Reward Table
 * @exampleGroup Rewards
 * @slots [{"name":"", "title":"Table Row"},{"name":"empty", "title":"Empty"},{"name":"loading","title":"Loading"}]
 * @example Reward Table - <sqm-rewards-table per-page="4" show-labels= prev-label="Prev" more-label="Next" hidden-columns="0" sm-breakpoint="599" md-breakpoint="799"><sqm-rewards-table-status-column column-title="Status" status-text="{status, select, AVAILABLE {Available} CANCELLED {Cancelled} PENDING {Pending} EXPIRED {Expired} REDEEMED {Redeemed} other {Not available} }" expiry-text="Expires on " pending-us-tax="W-9 required" pending-scheduled="Until" pending-unhandled="Fulfillment error"></sqm-rewards-table-status-column><sqm-rewards-table-source-column column-title="Source" anonymous-user="Anonymous User" deleted-user="Deleted User" reward-exchange-text="Reward Exchange" referral-rext="{rewardSource, select, FRIEND_SIGNUP {Referral to} REFERRED {Referred by} other {}}" reward-source-text="{rewardSource, select, MANUAL {Manual} AUTOMATED {{programName}} other {}}"></sqm-rewards-table-source-column><sqm-rewards-table-reward-column column-title="Reward" redeemed-text="{redeemedAmount} redeemed" available-text="{availableAmount} remaining" copy-text="Copied!"></sqm-rewards-table-reward-column><sqm-rewards-table-date-column column-title="Date received" date-shown="dateGiven"></sqm-rewards-table-date-column><sqm-rewards-table-customer-note-column column-title="Note"></sqm-rewards-table-customer-note-column><sqm-empty empty-state-image="https://res.cloudinary.com/saasquatch/image/upload/v1644360953/squatch-assets/empty_reward2.png" empty-state-header="View your rewards" empty-state-text="Complete program tasks to view the details of your rewards"></sqm-empty></sqm-rewards-table>
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
   * @uiWidget programSelector
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

  /**
   * Provide the column numbers (0 indexed) that should not be displayed in mobile views. Ex. 0,2,3
   *
   *  @uiName Mobile Hidden Columns  */
  @Prop() hiddenColumns?: string = "0";

  /** @uiName Mobile Breakpoint  */
  @Prop() smBreakpoint?: number = 599;

  /** @uiName Tablet Breakpoint  */
  @Prop() mdBreakpoint?: number = 799;

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
    const empty = <EmptySlot />;
    const loading = <LoadingSlot />;

    const { states, data, callbacks, elements } = isDemo()
      ? useRewardsTableDemo(this, empty, loading)
      : useRewardsTable(this, empty, loading);

    useRequestRerender([this.perPage]);

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
        empty-state-image="https://res.cloudinary.com/saasquatch/image/upload/v1644360953/squatch-assets/empty_reward2.png"
        empty-state-header="View your rewards"
        empty-state-text="Refer friends and complete tasks to view the details of your rewards"
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

function useRewardsTableDemo(
  props: RewardsTable,
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

  const { data } = useMemo(
    () => mockRewardData(props.perPage),
    [props.perPage]
  );

  const components = useChildElements<Element>();

  async function getComponentData(components: Element[]) {
    let componentData = data;

    componentData = data.slice(0, props.perPage);

    // filter out loading and empty states from columns array
    const columnComponents = components.filter(
      (component) => component.slot !== "loading" && component.slot !== "empty"
    );
    // get the column titles (renderLabel is asynchronous)
    const columnsPromise = columnComponents?.map(async (c: any) =>
      tryMethod(c, () => c.renderLabel())
    );

    // get the column cells (renderCell is asynchronous)
    //@ts-ignore
    const cellsPromise = componentData?.map(async (r: Reward) => {
      const cellPromise = columnComponents?.map(async (c: any) =>
        tryMethod(c, () => c.renderCell(r, undefined))
      );
      const cells = (await Promise.all(cellPromise)) as VNode[];
      return cells;
    });

    const rows =
      cellsPromise && (await Promise.all(cellsPromise)).filter((i) => i);

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
