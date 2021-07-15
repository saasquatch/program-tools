import { h } from "@stencil/core";

export interface ReferralTableViewProps {
  columns: Element[];
  rows: Element[][];
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
