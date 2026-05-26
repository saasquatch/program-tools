import { getProps } from '../../helpers';
import { useComponent } from '../../hooks/useComponent';
import { TableRowView } from './TableRowView';

export interface TableRowProps {
  highlighted: boolean;
}

const parseBoolean = (value: unknown, fallback: boolean) => {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'string') return value === '' || value === 'true';
  return fallback;
};

declare global {
  interface HTMLElementTagNameMap {
    'sql-table-row': HTMLElement;
  }
}

export const TableRow = useComponent<TableRowProps>(
  (host) => {
    const rawProps = getProps(host) as Partial<Record<keyof TableRowProps, unknown>>;
    const props: TableRowProps = {
      highlighted: parseBoolean(rawProps.highlighted, false),
    };

    return TableRowView(props);
  },
  'sql-table-row',
  ['highlighted'] as const
);
