import { h, VNode } from "@stencil/core";
import { TextSpanView } from "../sqm-text-span/sqm-text-span-view";
import jss from "jss";
import preset from "jss-preset-default";
import { gap } from "../../global/mixins";

export interface ReferralTableViewProps {
  states: {
    hasPrev: boolean;
    loading: boolean;
    hasNext: boolean;
  };
  callbacks: {
    prevPage: () => void;
    nextPage: () => void;
  };
  elements: {
    columns: VNode[];
    rows: VNode[][];
    emptyElement?: VNode;
    loadingElement?: VNode;
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

export function ReferralTableView(props: ReferralTableViewProps) {
  const { states, callbacks, elements } = props;
  const { columns, rows } = elements;

  if (states.loading) {
    return elements.loadingElement;
  }

  return (
    <div>
      <style type="text/css">{styleString}</style>
      <table class={sheet.classes.Table}>
        <thead>
          <tr>
            {columns?.map((column) => (
              <th class={sheet.classes.THead}>
                <TextSpanView type="h3">{column}</TextSpanView>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows?.map((row) => (
            <tr class={sheet.classes.TRow}>
              {row.map((cell) => (
                <td class={sheet.classes.TCell}>
                  <TextSpanView type="p">{cell}</TextSpanView>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {rows.length === 0 && elements.emptyElement}
      <div class={sheet.classes.ButtonContainer}>
        <sl-button
          size="small"
          disabled={!states.hasPrev}
          loading={states.loading}
          onClick={callbacks.prevPage}
          exportparts="base: defaultbutton-base"
        >
          Prev
        </sl-button>
        <sl-button
          size="small"
          loading={states.loading}
          disabled={!states.hasNext}
          onClick={callbacks.nextPage}
          exportparts="base: defaultbutton-base"
        >
          Next
        </sl-button>
      </div>
    </div>
  );
}
