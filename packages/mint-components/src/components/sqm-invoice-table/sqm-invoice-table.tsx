import { isDemo } from "@saasquatch/component-boilerplate";
import { withHooks } from "@saasquatch/stencil-hooks";
import { useEffect, useMemo, useReducer } from "@saasquatch/universal-hooks";
import { Component, h, Prop, VNode } from "@stencil/core";
import deepmerge from "deepmerge";
import { DemoData } from "../../global/demo";
import { Invoice } from "../../saasquatch";
import {
  GenericTableView,
  GenericTableViewProps,
} from "../../tables/GenericTableView";
import {
  useRequestRerender,
  useRerenderListener,
} from "../../tables/re-render";
import { useChildElements } from "../../tables/useChildElements";
import mockInvoiceData from "./mockInvoiceData";
import { InvoiceTableView } from "./sqm-invoice-table-view";
import { tryMethod, useInvoiceTable } from "./useInvoiceTable";

/**
 * @uiName Invoice Table
 * @exampleGroup Invoices
 * @validParents ["sqm-portal-container","div","sqm-divided-layout","template","sqm-tab","sqb-program-section","sqb-conditional-section"]
 * @validChildren ["p","div","h1","h2","h3","h4","h5","span"]
 * @slots [{"name":"", "title":"Table Row"},{"name":"empty", "title":"Empty"},{"name":"loading","title":"Loading"}]
 * @example Invoice Table - <sqm-invoice-table per-page="4" hidden-columns="2" more-label="Next" prev-label="Prev" sm-breakpoint="599" md-breakpoint="799" ><sqm-invoice-table-download-column></sqm-invoice-table-download-column><sqm-invoice-table-date-column column-title="Date"></sqm-invoice-table-date-column><sqm-invoice-table-data-column column-title="Invoice" property="invoiceId"></sqm-invoice-table-data-column><sqm-invoice-table-data-column column-title="Earnings" property="earnings"></sqm-invoice-table-data-column><sqm-invoice-table-data-column column-title="Indirect tax" property="indirectTax"></sqm-invoice-table-data-column><sqm-invoice-table-data-column column-title="Earnings after tax" property="netEarnings"></sqm-invoice-table-data-column><sqm-empty empty-state-image="https://res.cloudinary.com/saasquatch/image/upload/v1710363322/squatch-assets/invoice-table-empty.png" empty-state-header="View your invoice details" empty-state-text="Refer a friend to view the status of your invoices and rewards earned" slot="empty" ></sqm-empty ></sqm-invoice-table> */
@Component({
  tag: "sqm-invoice-table",
  shadow: true,
})
export class InvoiceTable {
  /**
   * Filters to only show invoices in this program. Will default to filtering by the program context where
   * this table lives. If no program ID is set or provided by context, then shows all invoices from all programs.
   * If program ID is "classic", shows classic-only invoices
   *
   * @uiName Program
   * @uiWidget programSelector
   */
  @Prop() programId: string;

  /**
   * Number of invoices displayed per page
   *
   * @uiName Invoices per page
   */
  @Prop() perPage: number = 4;

  /** @uiName Hide column labels */
  @Prop() hideLabels?: boolean = false;

  /** @uiName Invoice table previous page button label  */
  @Prop() prevLabel?: string = "Prev";

  /** @uiName Invoice table next page button label */
  @Prop() moreLabel?: string = "Next";

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

  /** @uiName Invoice table title */
  @Prop() header?: string = "Invoices";

  /** @uiName Invoice table description  */
  @Prop() description?: string =
    "View and download your invoices to report your earnings and stay tax compliant.";

  /** @uiName Empty invoice table header  */
  @Prop() emptyStateHeader: string = "View your invoice details";

  /** @uiName Empty invoice table description */
  @Prop() emptyStateText: string =
    "Refer a friend to view the status of your invoices and rewards earned";

  /**
   * @undocumented
   * @uiType object
   */
  @Prop() demoData?: DemoData<GenericTableViewProps> & {
    mockData?: { data: Invoice[] };
  };

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  render() {
    const empty = (
      <EmptySlot
        emptyStateHeader={this.emptyStateHeader}
        emptyStateText={this.emptyStateText}
      />
    );
    const loading = <LoadingSlot />;

    const { states, data, callbacks, elements } = isDemo()
      ? useInvoiceTableDemo(this, empty, loading)
      : useInvoiceTable(this, empty, loading);

    useRequestRerender([this.perPage]);

    return (
      <InvoiceTableView header={this.header} description={this.description}>
        <GenericTableView
          states={states}
          data={data}
          callbacks={callbacks}
          elements={elements}
        ></GenericTableView>
      </InvoiceTableView>
    );
  }
}

function EmptySlot(props) {
  return (
    <slot name="empty">
      <sqm-empty
        empty-state-image="https://res.cloudinary.com/saasquatch/image/upload/v1710363322/squatch-assets/invoice-table-empty.png"
        empty-state-header={props.emptyStateHeader}
        empty-state-text={props.emptyStateText}
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
      <sqm-table-cell colspan={6}>
        <sl-skeleton></sl-skeleton>
      </sqm-table-cell>
    </sqm-table-row>
  );
}

function useInvoiceTableDemo(
  props: InvoiceTable,
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
    () => props.demoData?.mockData || mockInvoiceData(props.perPage),
    [props.perPage]
  );

  const components = useChildElements<Element>();

  async function getComponentData(components: Element[]) {
    const componentData = mockData.data.slice(0, props.perPage);

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

    // get the column cells (renderCell is asynchronous)
    const cellsPromise = componentData?.map(async (r) => {
      const cellPromise = columnComponents?.map(async (c: any) =>
        tryMethod(c, () => c.renderCell(r, {}))
      );

      const cells = (await Promise.all(cellPromise)) as VNode[];
      return cells;
    });

    const cells = await Promise.all(cellsPromise);

    const rows = cells.filter((value) => value);

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
        invoiceData: [],
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
