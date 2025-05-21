import { Fragment, h } from "@stencil/core";
import { createStyleSheet } from "../../styling/JSS";

export interface PaginationViewProps {
  states: {
    currentPage?: number;
    totalPages?: number;
    loading: boolean;
  };
  text: {
    paginationText: string;
  };
  callbacks: {
    onNext: (e: Event) => void;
    onPrev: (e: Event) => void;
  };
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
  const { states, callbacks, text } = props;
  const { onNext, onPrev } = callbacks;
  const { currentPage, totalPages, loading } = states;

  if (totalPages === 1) return <Fragment></Fragment>;

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
          <div class={sheet.classes.TextContainer}>{text.paginationText}</div>
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
