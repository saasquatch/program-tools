import { h, VNode } from "@stencil/core";
import { gap } from "../global/mixins";
import { createStyleSheet } from "../styling/JSS";

export interface GenericTableViewProps {
  states: {
    hasPrev: boolean;
    hasNext: boolean;
    show: "loading" | "empty" | "rows";
    namespace: string;
  };
  data: {
    textOverrides: {
      showLabels: boolean;
      prevLabel: string;
      moreLabel: string;
    };
    hiddenColumns: string;
    mdBreakpoint: number;
    smBreakpoint: number;
  };
  callbacks: {
    prevPage: () => void;
    nextPage: () => void;
  };
  elements: {
    columns: Array<VNode | string>;
    rows: VNode[][];
    loading?: boolean;
    emptyElement?: VNode;
    loadingElement?: VNode;
    page?: number;
  };
}

export function GenericTableView(props: GenericTableViewProps) {
  const { states, data, callbacks, elements } = props;
  const { columns, rows } = elements;
  const { show } = states;

  const hiddenCols =
    data.hiddenColumns && data.hiddenColumns.split(",").map(Number);

  // Non-string columns are the editor's raisins plop targets, so the header has to stay rendered for them
  const hasDropZones = !!columns?.some((column) => typeof column !== "string");
  const showLabels = data.textOverrides.showLabels;

  const mobile = "@media (max-width: " + data.mdBreakpoint + "px)";
  const tablet = `@media (min-width: ${
    Boolean(rows.length < 2) ? data.mdBreakpoint : data.smBreakpoint
  }px) and (max-width: ${data.mdBreakpoint}px)`;

  // Due to mobile media queries being dependant on props, not feasiable to move out of render function
  const style = {
    Table: {
      borderCollapse: "collapse",
      tableLayout: "fixed",
      width: "100%",
      "& tbody tr": {
        borderBottom:
          "var(--sqm-border-thickness, 1px) solid var(--sqm-border-color)",
        "&:first-child": {
          borderTop:
            "var(--sqm-border-thickness, 1px) solid var(--sqm-border-color)",
        },
      },
      "& th": {
        paddingBottom: "var(--sl-spacing-small)",
        textAlign: "left",
        fontWeight: "var(--sl-font-weight-semibold)",
        overflowWrap: "anywhere",
      },
      "& th.collapsed": {
        fontSize: "0",
        padding: "14px 0",
      },
      "& th.drop-zone": {
        width: "30px",
      },
      "& td": {
        padding: "var(--sl-spacing-small)",
        paddingLeft: "0",
        overflow: "hidden",
        textOverflow: "ellipsis",
      },
      [mobile]: {
        // Body rows become blocks here, so the header has to leave the table layout to stay full width
        "& thead": {
          display: hasDropZones ? "block" : "none",
        },
        // Columns read top-to-bottom inside a card, so the drop zones between them stack the same way
        "& thead tr": {
          display: "flex",
          flexDirection: "column",
        },
        "& thead th.label": {
          padding: "0",
          lineHeight: "20px",
          fontSize: "var(--sl-font-size-small)",
          color: "var(--sl-color-neutral-500)",
        },
        "& thead th.drop-zone": {
          width: "auto",
          padding: "14px 0",
          lineHeight: "0",
          position: "relative",
        },
        // The plop target is inline-styled position:absolute, so it needs the cell as its containing block to span it
        "& thead th.drop-zone slot::slotted(raisins-plop-target)": {
          width: "100%",
        },
        "& tbody td.drop-zone": {
          display: "none",
        },
        "& tbody tr": {
          display: "block",
          background: "inherit",
          border:
            "var(--sqm-border-thickness, 1px) solid var(--sqm-border-color)",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
          borderRadius: "var(--sl-border-radius-large)",
          padding: "var(--sl-spacing-medium)",
          fontSize: "var(--sl-font-size-small)",
          marginBottom: "var(--sl-spacing-large)",
        },
        "& td": {
          display: "grid",
          borderTop: "none",
          padding: "0",
          marginBottom: "var(--sl-spacing-medium)",

          "&:first-child": {
            textAlign: "left",
          },
          "&:before": {
            content: "attr(data-label)",
            whiteSpace: "nowrap",
          },

          "&:last-child": {
            marginBottom: "0",
          },

          "&.hidden:before": {
            content: "none",
          },
        },
      },
      [tablet]: {
        "& tbody": {
          display: "grid",
          gridTemplateColumns: "0.5fr 0.5fr",
          gap: "25px",
        },
      },
    },
    ButtonContainer: {
      display: "flex",
      "justify-content": "flex-end",
      "margin-top": "var(--sl-spacing-small)",
      ...gap({ direction: "row", size: "var(--sl-spacing-small)" }),
    },

    ButtonDisabled: {
      "&::part(base)": {
        opacity: "0.25",
      },
    },
  };

  const sheet = createStyleSheet(style);
  const styleString = sheet.toString();

  if (show === "empty") return elements.emptyElement;

  return (
    <div>
      <style type="text/css">{styleString}</style>
      <table class={sheet.classes.Table}>
        {(showLabels || hasDropZones) && (
          <thead>
            <tr>
              {columns?.map((column: string | VNode) => {
                if (typeof column === "string")
                  return (
                    <th class={showLabels ? "label" : "collapsed"}>{column}</th>
                  );
                return <th class="drop-zone">{column}</th>;
              })}
            </tr>
          </thead>
        )}
        <tbody>
          {show === "loading" && elements.loadingElement}
          {show === "rows" &&
            rows?.map((row, i) => {
              return (
                <tr
                  style={{
                    borderTop: `${
                      !data.textOverrides.showLabels && i === 0 ? "none" : ""
                    }`,
                  }}
                  part="table-row"
                >
                  {row.map((cell, j) => {
                    return typeof columns[j] === "string" ? (
                      <td
                        class={hiddenCols?.includes(j) ? "hidden" : ""}
                        data-label={columns[j] + ":"}
                        style={{
                          gridTemplateColumns: hiddenCols?.includes(j)
                            ? "1fr"
                            : "0.5fr 0.5fr",
                        }}
                      >
                        {cell}
                      </td>
                    ) : (
                      <td class="drop-zone">{cell}</td>
                    );
                  })}
                </tr>
              );
            })}
        </tbody>
      </table>
      <div
        class={sheet.classes.ButtonContainer}
        part={states.namespace + "-button-wrapper"}
      >
        <sl-button
          size="small"
          disabled={!states.hasPrev}
          loading={show === "loading"}
          onClick={callbacks.prevPage}
          exportparts="base: secondarybutton-base"
          class={!states.hasPrev ? sheet.classes.ButtonDisabled : ""}
        >
          {data.textOverrides.prevLabel}
        </sl-button>
        <sl-button
          size="small"
          loading={show === "loading"}
          disabled={!states.hasNext}
          onClick={callbacks.nextPage}
          exportparts="base: secondarybutton-base"
          class={!states.hasNext ? sheet.classes.ButtonDisabled : ""}
        >
          {data.textOverrides.moreLabel}
        </sl-button>
      </div>
    </div>
  );
}
