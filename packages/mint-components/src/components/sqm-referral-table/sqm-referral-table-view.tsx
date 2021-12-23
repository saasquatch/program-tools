import { h, VNode } from "@stencil/core";
import { TextSpanView } from "../sqm-text-span/sqm-text-span-view";
import { createStyleSheet } from "../../styling/JSS";
import { gap } from "../../global/mixins";

export interface ReferralTableViewProps {
  states: {
    hasPrev: boolean;
    loading: boolean;
    hasNext: boolean;
  };
  data: {
    textOverrides: {
      showLabels: boolean;
      prevLabel: string;
      moreLabel: string;
    };
    referralData?: Referral[];
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

const sheet = createStyleSheet(style);
const styleString = sheet.toString();

export function ReferralTableView(props: ReferralTableViewProps) {
  const { states, data, callbacks, elements } = props;
  const { columns, rows } = elements;

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
          {states.loading
            ? elements.loadingElement
            : !elements?.rows?.length && !data.referralData?.length
            ? elements.emptyElement
            : rows?.map((row, i) => (
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
        part="sqm-referral-table-button-wrapper"
      >
        <sl-button
          size="small"
          disabled={!states.hasPrev}
          loading={states.loading}
          onClick={callbacks.prevPage}
          exportparts="base: defaultbutton-base"
        >
          {data.textOverrides.prevLabel}
        </sl-button>
        <sl-button
          size="small"
          loading={states.loading}
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
