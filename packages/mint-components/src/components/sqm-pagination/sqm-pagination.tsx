import { isDemo } from "@saasquatch/component-boilerplate";
import { withHooks } from "@saasquatch/stencil-hooks";
import { useState } from "@saasquatch/universal-hooks";
import { Component, h, Prop, State } from "@stencil/core";
import deepmerge from "deepmerge";
import { DemoData } from "../../global/demo";
import { intl } from "../../global/global";
import { getProps } from "../../utils/utils";
import { PaginationView } from "./sqm-pagination-view";
import { UsePagination, usePagination } from "./usePagination";

/**
 * @uiName Pagination
 * @exampleGroup Common Components
 * @example Promo Code Pagination - <sqm-pagination></sqm-pagination>
 */
@Component({
  tag: "sqm-pagination",
  shadow: true,
})
export class Pagination {
  @State()
  ignored = true;

  /**
   * @uiName Pagination text
   */
  @Prop() paginationText: string = "{currentPage} of {totalPages}";

  /**
   * @undocumented
   * @uiType object
   */
  @Prop() demoData?: DemoData<UsePagination>;

  constructor() {
    withHooks(this);
  }

  disconnectedCallback() {}

  render() {
    const hookProps = isDemo()
      ? useDemoPagination(getProps(this))
      : usePagination(getProps(this));

    return <PaginationView {...hookProps}></PaginationView>;
  }
}

function useDemoPagination(
  props: Pagination
): ReturnType<typeof usePagination> {
  const [currentPage, setCurrentPage] = useState(1);

  return deepmerge(
    {
      states: {
        currentPage,
        totalPages: 5,
        loading: false,
      },
      callbacks: {
        onNext: () => setCurrentPage(currentPage + 1),
        onPrev: () => setCurrentPage(currentPage - 1),
      },
      text: {
        paginationText: intl.formatMessage(
          {
            id: `paginationText`,
            defaultMessage:
              props.paginationText || "{currentPage} of {totalPages}",
          },
          {
            currentPage: currentPage,
            totalPages: 5,
          }
        ),
      },
    },
    props.demoData || {},
    { arrayMerge: (_, a) => a }
  ) as ReturnType<typeof usePagination>;
}
