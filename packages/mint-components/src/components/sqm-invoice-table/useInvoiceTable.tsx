import {
  useLocale,
  usePaginatedQuery,
  useUserIdentity,
} from "@saasquatch/component-boilerplate";
import { useEffect, useReducer } from "@saasquatch/universal-hooks";
import { VNode, h } from "@stencil/core";
import debugFn from "debug";
import { gql } from "graphql-request";
import { GenericTableViewProps } from "../../tables/GenericTableView";
import { useRerenderListener } from "../../tables/re-render";
import { useChildElements } from "../../tables/useChildElements";
import { generateUserError } from "../sqm-referral-table/useReferralTable";
import { InvoiceTable } from "./sqm-invoice-table";
const debug = debugFn("sq:useInvoiceTable");

export const CSS_NAMESPACE = "sqm-invoice-table";

export const GET_INVOICES = gql`
  query getUserTaxInfo($limit: Int!, $offset: Int!) {
    user: viewer {
      ... on User {
        impactConnection {
          connected
          publisher {
            invoices(limit: $limit, offset: $offset) {
              data {
                id
                dateCreated
                totalAmount
                totalVatAmount
                downloadUrl
                currency
              }
              totalCount
            }
          }
        }
      }
    }
  }
`;

type Invoice = {
  id: string;
  dateCreated: number;
  totalAmount: number;
  totalVatAmount: number;
  downloadUrl: string;
  currency: string;
};

export function useInvoiceTable(
  props: InvoiceTable,
  emptyElement: VNode,
  loadingElement: VNode
): GenericTableViewProps {
  const user = useUserIdentity();
  const locale = useLocale();

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

  const {
    envelope: invoicesData,
    states,
    callbacks,
  } = usePaginatedQuery<Invoice>(
    GET_INVOICES,
    (data) => data?.user?.impactConnection?.publisher?.invoices,
    {
      limit: props.perPage,
      offset: 0,
    },
    {},
    !user?.jwt
  );

  const tick = useRerenderListener();
  const components = useChildElements<Element>();

  const data = invoicesData?.data;

  async function getComponentData(components: Element[]) {
    // filter out loading and empty states from columns array
    const columnComponents = components.filter(
      (component) => component.slot !== "loading" && component.slot !== "empty"
    );
    // get the column titles (renderLabel is asynchronous)
    const columnsPromise = columnComponents?.map(async (c: any) =>
      tryMethod(c, () => c.renderLabel())
    );

    // get the column cells (renderCell is asynchronous)
    const cellsPromise = data?.map(async (invoice: Invoice) => {
      // TODO: probably going to pass in values as named by graphql
      const invoiceData = {
        earnings: `${invoice.currency}${
          invoice.totalAmount?.toFixed(2) || "0.00"
        }`,
        taxedAmount: `${invoice.currency}${
          invoice.totalVatAmount?.toFixed(2) || "0.00"
        }`,
        dateCreated: invoice.dateCreated,
        invoiceId: invoice.id,
        netEarnings: `${invoice.currency}${
          (invoice.totalAmount - invoice.totalVatAmount)?.toFixed(2) || "0.00"
        }`,
        downloadUrl: invoice.downloadUrl,
      };

      const cellPromise = columnComponents?.map(async (c: any) =>
        tryMethod(c, () => c.renderCell(invoiceData, { locale }, h))
      );
      const cells = (await Promise.all(cellPromise)) as VNode[];
      return cells;
    });

    const rows =
      cellsPromise && (await Promise.all(cellsPromise)).filter((i) => i);

    setContent({ rows });
    const columns =
      columnsPromise &&
      ((await Promise.all(columnsPromise)) as Array<VNode | string>);
    // Set the content to render and finish loading components
    setContent({ columns, loading: false, page: states.currentPage });
  }

  useEffect(() => {
    setContent({ loading: true });
    invoicesData && getComponentData(components);
  }, [invoicesData, components, tick]);

  const isEmpty = !content?.rows?.length && !data?.length;

  const show =
    // 1 - Loading if loading
    states.loading || content.loading
      ? "loading"
      : // 2 - Empty if empty
      isEmpty
      ? "empty"
      : // 3 - Then show rows
        "rows";

  return {
    states: {
      hasNext: states.currentPage < states.pageCount - 1,
      hasPrev: states.currentPage > 0,
      show,
      namespace: CSS_NAMESPACE,
    },
    data: {
      textOverrides: {
        showLabels: !props.hideLabels,
        prevLabel: props.prevLabel,
        moreLabel: props.moreLabel,
      },
      hiddenColumns: props.hiddenColumns,
      smBreakpoint: props.smBreakpoint,
      mdBreakpoint: props.mdBreakpoint,
    },
    elements: {
      columns: content.columns,
      rows: content.rows,
      emptyElement,
      loadingElement,
    },
    callbacks: {
      nextPage: () => {
        callbacks.setCurrentPage(states.currentPage + 1);
      },
      prevPage: () => {
        callbacks.setCurrentPage(states.currentPage - 1);
      },
    },
  };
}
export async function tryMethod(
  c: HTMLElement,
  callback: () => Promise<string>
): Promise<string | VNode> {
  const tag = c.tagName.toLowerCase();
  await customElements.whenDefined(tag);
  let labelPromise: Promise<string>;
  try {
    labelPromise = callback();
  } catch (e) {
    // renderLabel did not return a promise, so this method probably doesn't exist
    // therefore, we IGNORE the label
    debug("label promise failed", e);
    return <span />;
  }
  try {
    return await labelPromise;
  } catch (e) {
    // The column returned a promise, and that promise failed.
    // This should not happen so we fail fast
    debug("Error rendering label", e);
    const userError = generateUserError(e);
    return (
      <details>
        <summary>Error</summary>
        {userError}
      </details>
    );
  }
}
