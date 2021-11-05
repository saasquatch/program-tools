import { h, VNode } from "@stencil/core";
import { TextSpanView } from "../components/sqm-text-span/sqm-text-span-view";
import jss from "jss";
import preset from "jss-preset-default";
import { gap } from "../global/mixins";

export interface GenericTableViewProps {
  states: {
    hasPrev: boolean;
    hasNext: boolean;
    show: "loading" | "empty" | "rows";
    // Used for namespacing CSS parts, e.g. "sqm-referral-table"
    namespace: string;
  };
  data: {
    textOverrides: {
      showLabels: boolean;
      prevLabel: string;
      moreLabel: string;
    };
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

const style = {
  THead: {
    padding:
      "var(--sl-spacing-small) var(--sl-spacing-medium) var(--sl-spacing-small) 0",
    "text-align": "left",
  },
  TCell: {
    padding:
      "var(--sl-spacing-small) var(--sl-spacing-medium) var(--sl-spacing-small) 0",
  },
  TRow: {
    "border-top": "1px solid #EAEAEA",
  },
  Table: {
    "border-collapse": "collapse",
    width: "100%",
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

export function GenericTableView(props: GenericTableViewProps) {
  const { states, data, callbacks, elements } = props;
  const { columns, rows } = elements;
  const { show } = states;

  return (
    <div>
      <style type="text/css">{styleString}</style>
      <table class={sheet.classes.Table}>
        {data.textOverrides.showLabels && (
          <thead>
            <tr>
              {columns?.map((column) => (
                <th class={sheet.classes.THead}>
                  <TextSpanView type="h3">{column}</TextSpanView>
                </th>
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
                class={sheet.classes.TRow}
                style={{
                  borderTop: `${
                    !data.textOverrides.showLabels && i === 0 ? "none" : ""
                  }`,
                }}
                part="table-row"
              >
                {row.map((cell) => (
                  <td class={sheet.classes.TCell}>
                    <TextSpanView type="p">{cell}</TextSpanView>
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
