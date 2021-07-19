import { h, VNode } from "@stencil/core";

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

export function ReferralTableView(props: ReferralTableViewProps) {
  const { states, callbacks, elements } = props;
  const { columns, rows } = elements;

  return (
    <table>
      <thead>
        <tr>
          {columns?.map((column) => (
            <th>{column}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows?.map((row) => (
          <tr>
            {row.map((cell) => (
              <td>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
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
    </table>
  );
}
