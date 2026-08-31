import { h, VNode } from "@stencil/core";
import { GenericTableView, GenericTableViewProps } from "./GenericTableView";
import { dropZoneColumnIndexes } from "./plopTargets";

function classesOf(node: any, tag: string, found: string[] = []): string[] {
  if (!node) return found;
  if (Array.isArray(node)) {
    node.forEach((child) => classesOf(child, tag, found));
    return found;
  }
  if (node.$tag$ === tag) found.push(node.$attrs$?.class ?? "");
  classesOf(node.$children$, tag, found);
  return found;
}

function buildProps(
  columns: Array<VNode | string>,
  dropZoneColumns?: number[]
): GenericTableViewProps {
  return {
    states: { hasPrev: false, hasNext: false, show: "rows", namespace: "test" },
    data: {
      textOverrides: { showLabels: true, prevLabel: "Prev", moreLabel: "More" },
      hiddenColumns: "",
      mdBreakpoint: 899,
      smBreakpoint: 599,
    },
    callbacks: { prevPage: () => {}, nextPage: () => {} },
    elements: {
      columns,
      dropZoneColumns,
      rows: [columns.map((_, i) => <span>cell {i}</span>)],
    },
  };
}

describe("dropZoneColumnIndexes", () => {
  it("returns no indexes when the table has no plop targets", () => {
    const components = [
      { tagName: "SQM-INVOICE-TABLE-DATE-COLUMN" },
      { tagName: "SQM-INVOICE-TABLE-DOWNLOAD-COLUMN" },
    ] as Element[];
    expect(dropZoneColumnIndexes(components)).toEqual([]);
  });

  it("returns the index of each plop target", () => {
    const components = [
      { tagName: "RAISINS-PLOP-TARGET" },
      { tagName: "SQM-INVOICE-TABLE-DATE-COLUMN" },
      { tagName: "RAISINS-PLOP-TARGET" },
    ] as Element[];
    expect(dropZoneColumnIndexes(components)).toEqual([0, 2]);
  });
});

describe("GenericTableView drop zones", () => {
  // The invoice download column renders a VNode label but is real data, not a plop target.
  const vnodeLabelColumns: Array<VNode | string> = ["Date", <span></span>];

  it("does not mark a VNode-labelled data column as a drop zone", () => {
    const rendered = GenericTableView(buildProps(vnodeLabelColumns));

    expect(classesOf(rendered, "th")).toEqual(["label", "label"]);
    expect(classesOf(rendered, "td")).toEqual(["", ""]);
  });

  it("keeps the header hidden on mobile when there are no plop targets", () => {
    const rendered: any = GenericTableView(buildProps(vnodeLabelColumns));
    const styleString = rendered.$children$[0].$children$[0].$text$;

    expect(styleString).toMatch(/thead \{\s*display: none;/);
  });

  it("keeps the header shown on mobile when there are plop targets", () => {
    const rendered: any = GenericTableView(
      buildProps(["Date", <slot />], [1])
    );
    const styleString = rendered.$children$[0].$children$[0].$text$;

    expect(styleString).toMatch(/thead \{\s*display: block;/);
  });

  it("marks only the declared plop target columns as drop zones", () => {
    const columns: Array<VNode | string> = ["Date", <slot />, "Amount"];
    const rendered = GenericTableView(buildProps(columns, [1]));

    expect(classesOf(rendered, "th")).toEqual(["label", "drop-zone", "label"]);
    expect(classesOf(rendered, "td")).toEqual(["", "drop-zone", ""]);
  });
});
