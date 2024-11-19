import { h } from "@stencil/core";
import { createStyleSheet } from "../../styling/JSS";

export interface PaginationViewProps {
  pageNumber?: number;
  onNext: (e: Event) => void;
  onPrev: (e: Event) => void;
}

const style = {
  Container: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: "var(--sl-spacing-small)",
    width: "100%",
  },
};

const sheet = createStyleSheet(style);
const styleString = sheet.toString();

export function PaginationView(props: PaginationViewProps) {
  const { onNext, onPrev, pageNumber } = props;

  return (
    <span class={sheet.classes.Container} part="sqm-base">
      <style type="text/css">{styleString}</style>
      <sl-icon-button onClick={onPrev} name="chevron-left"></sl-icon-button>
      <span>{pageNumber}</span>
      <sl-icon-button onClick={onNext} name="chevron-right"></sl-icon-button>
    </span>
  );
}
