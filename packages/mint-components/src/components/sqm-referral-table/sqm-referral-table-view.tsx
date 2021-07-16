import { h, VNode } from "@stencil/core";

export interface ReferralTableViewProps {
  columns: VNode[];
  rows: VNode[][];
}

export function ReferralTableView(props: ReferralTableViewProps) {
  const { columns, rows } = props;

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
    </table>
  );
}
