import { Fragment, h } from "@stencil/core";
import { createStyleSheet } from "../../styling/JSS";

export interface PaginationViewProps {
  currentPage?: number;
  totalPages?: number;
  // text: {
  //   ofText: string;
  // };
  onNext: (e: Event) => void;
  onPrev: (e: Event) => void;
  loading: boolean;
}

const style = {
  Container: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: "var(--sl-spacing-small)",
    width: "100%",
  },

  TextContainer: {
    display: "flex",
    gap: "var(--sl-spacing-xx-small)",
  },
};

const sheet = createStyleSheet(style);
const styleString = sheet.toString();

export function PaginationView(props: PaginationViewProps) {
  const { onNext, onPrev, currentPage, totalPages, loading } = props;

  return (
    <span class={sheet.classes.Container} part="sqm-base">
      <style type="text/css">{styleString}</style>
      {!loading && (
        <Fragment>
          <sl-button
            onClick={onPrev}
            part="sqm-pagination-button"
            circle
            disabled={currentPage === 1}
          >
            <sl-icon name="chevron-left" label="Previous Page"></sl-icon>
          </sl-button>
          <div class={sheet.classes.TextContainer}>
            <span>{currentPage}</span>
            {/* TODO: this "of" won't be translatable */}
            <span>of</span>
            <span>{totalPages}</span>
          </div>
        </Fragment>
      )}
      <sl-button
        onClick={onNext}
        part="sqm-pagination-button"
        circle
        disabled={currentPage === totalPages}
      >
        <sl-icon name="chevron-right" label="Previous Page"></sl-icon>
      </sl-button>
    </span>
  );
}
