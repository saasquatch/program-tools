import { Component, h, Prop, State } from "@stencil/core";
import { getProps } from "../../utils/utils";
import { PaginationView } from "./sqm-pagination-view";
import { usePagination } from "./usePagination";
import deepmerge from "deepmerge";
import { withHooks } from "@saasquatch/stencil-hooks";
import { DemoData } from "../../global/demo";
import { useState } from "@saasquatch/universal-hooks";
import { isDemo } from "@saasquatch/component-boilerplate";

/**
 * @uiName Pagination
 * @exampleGroup Common Components
 * @example Link Button - <sqm-pagination></sqm-pagination>
 */
@Component({
  tag: "sqm-pagination",
  shadow: true,
})
export class Pagination {
  @State()
  ignored = true;

  /**
   * @undocumented
   * @uiType object
   */
  @Prop() demoData?: DemoData<any>; // TODO: types

  constructor() {
    withHooks(this);
  }

  disconnectedCallback() {}

  render() {
    // const props = getProps(this);

    const hookProps = isDemo()
      ? useDemoPagination(getProps(this))
      : usePagination();

    console.log("pagination", { hookProps });

    const props = {
      currentPage: hookProps.states?.currentPage,
      totalPages: hookProps.states?.pageCount,
      onNext: () =>
        hookProps.callbacks?.setCurrentPage(hookProps.states?.currentPage + 1),
      onPrev: () =>
        hookProps.callbacks?.setCurrentPage(hookProps.states?.currentPage - 1),
      text: {
        ofText: "of",
      },
    };

    return <PaginationView {...props}></PaginationView>;
  }
}

function useDemoPagination(props: Pagination) {
  const [currentPage, setCurrentPage] = useState(1);

  return deepmerge(
    {
      states: {
        currentPage: currentPage,
        pageCount: 5,
      },
      callbacks: {
        setCurrentPage,
      },
      text: {
        ofText: `${currentPage} of 5`,
      },
    },
    props.demoData || {},
    { arrayMerge: (_, a) => a }
  );
}
