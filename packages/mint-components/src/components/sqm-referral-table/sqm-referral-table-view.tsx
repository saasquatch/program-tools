import { h, VNode } from "@stencil/core";
import { PresetText } from "../../functional-components/PresetText";
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
  elements: { columns: VNode[]; rows: VNode[][] };
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

  return (
    <div>
      <table class={sheet.classes.Table}>
        <style type="text/css">{styleString}</style>
        <thead>
          <tr>
            {columns?.map((column) => (
              <th class={sheet.classes.THead}>
                <PresetText type="h3">{column}</PresetText>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows?.map((row) => (
            <tr class={sheet.classes.TRow}>
              {row.map((cell) => (
                <td class={sheet.classes.TCell}>
                  <PresetText type="p">{cell}</PresetText>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
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
