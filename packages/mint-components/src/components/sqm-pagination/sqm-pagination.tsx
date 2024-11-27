import { Component, h, Prop } from "@stencil/core";
import { getProps } from "../../utils/utils";
import { PaginationView } from "./sqm-pagination-view";
import { usePagination } from "./usePagination";

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
  render() {
    // const props = getProps(this);

    const hookProps = usePagination();

    const props = {
      currentPage: 1,
      totalPages: 5,
      onNext: () => {},
      onPrev: () => {},
      text: {
        ofText: "of",
      },
    };

    return <PaginationView {...props}></PaginationView>;
  }
}
