import { h, VNode } from "@stencil/core";
import { TextSpanView } from "../sqm-text-span/sqm-text-span-view";
import jss from "jss";
import preset from "jss-preset-default";
import { gap } from "../../global/mixins";

export interface RewardsTableViewProps {
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
    columns: VNode[];
    rows: VNode[][];
    loading?: boolean;
    emptyElement?: VNode;
    loadingElement?: VNode;
    page?: number;
  };
}

export function RewardsTableView(props: RewardsTableViewProps) {
  const { states, data, callbacks, elements } = props;
  const { columns, rows } = elements;
  const { show } = states;

  const hiddenCols = data.hiddenColumns.split(",").map(Number);

  console.log(props);

  const mobile = "@media (max-width: " + data.mdBreakpoint + "px)";
  const tablet =
    "@media (min-width: " +
    data.smBreakpoint +
    "px) and (max-width: " +
    data.mdBreakpoint +
    "px)";

  const style = {
    Table: {
      borderCollapse: "collapse",
      width: "100%",
      "& thead": {
        padding: "var(--sl-spacing-small)",
        paddingLeft: "0",
        textAlign: "left",
        fontWeight: "var(--sl-font-weight-normal)",
      },
      "& tr": {
      },
      "& td": {
        borderTop: "1px solid var(--sl-color-neutral-200)",
        padding: "var(--sl-spacing-small)",
        paddingLeft: "0",
      },
      [mobile]: {
        "& thead": {
          display: "none",
        },
        "& tr": {
          display: "block",
          background: "#FFFFFF",
          border: "1px solid var(--sl-color-neutral-200)",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
          borderRadius: "var(--sl-border-radius-medium)",
          padding: "var(--sl-spacing-medium)",
          color: "var(--sl-color-neutral-500)",
          fontSize: "var(--sl-font-size-small)",
          marginBottom: "var(--sl-spacing-large)",
        },
        "& td": {
          display: "block",
		  borderTop: "none",
          padding: "0",
          marginBottom: "var(--sl-spacing-medium)",
          ".hidden::before": {
            content: "",
          },
          "&:first-child": {
            textAlign: "left",
          },
          "&:before": {
            content: "attr(data-label)",
            float: "left",
            width: "40%",
            marginBottom: "5px",
          },
          "&:last-child": {
            marginBottom: "0",
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
  };

  jss.setup(preset());
  const sheet = jss.createStyleSheet(style);
  const styleString = sheet.toString();

  return (
    <div>
      <style type="text/css">{styleString}</style>
      <table class={sheet.classes.Table}>
        {data.textOverrides.showLabels && (
          <thead>
            <tr>
              {columns?.map((column) => (
                <th>{column}</th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {show === "loading" && elements.loadingElement}
          {show === "empty" && elements.emptyElement}
          {show === "rows" &&
            rows?.map((row, i) => (
              <tr
                style={{
                  borderTop: `${
                    !data.textOverrides.showLabels && i === 0 ? "none" : ""
                  }`,
                }}
                part="table-row"
              >
                {row.map((cell, j) => (
                  <td
                    class={hiddenCols.includes(j) ? "hidden" : ""}
                    data-label={columns[j] + ":"}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
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
          exportparts="base: defaultbutton-base"
        >
          {data.textOverrides.prevLabel}
        </sl-button>
        <sl-button
          size="small"
          loading={show === "loading"}
          disabled={!states.hasNext}
          onClick={callbacks.nextPage}
          exportparts="base: defaultbutton-base"
        >
          {data.textOverrides.moreLabel}
        </sl-button>
      </div>
    </div>
  );
}
