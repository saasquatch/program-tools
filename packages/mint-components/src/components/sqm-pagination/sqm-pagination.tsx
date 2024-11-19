import { Component, h, Prop } from "@stencil/core";
import { getProps } from "../../utils/utils";
import { PaginationView } from "./sqm-pagination-view";

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
    const props = {
      pageNumber: 1,
      onNext: () => {},
      onPrev: () => {},
    };

    return <PaginationView {...props}></PaginationView>;
  }
}
