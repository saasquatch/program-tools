import { getProps } from '../../helpers';
import { useComponent } from '../../hooks/useComponent';
import { TableCellView } from './TableCellView';

export interface TableCellProps {
  alignment: 'left' | 'center' | 'right';
  width?: string;
  fontWeight?: string;
}

declare global {
  interface HTMLElementTagNameMap {
    'sql-table-cell': HTMLElement;
  }
}

export const TableCell = useComponent<TableCellProps>(
  (host) => {
    const rawProps = getProps(host) as Partial<Record<keyof TableCellProps, unknown>>;
    const alignment = rawProps.alignment;
    const props: TableCellProps = {
      alignment: alignment === 'center' || alignment === 'right' ? alignment : 'left',
      width: typeof rawProps.width === 'string' ? rawProps.width : undefined,
      fontWeight: typeof rawProps.fontWeight === 'string' ? rawProps.fontWeight : undefined,
    };

    return TableCellView(props);
  },
  'sql-table-cell',
  ['alignment', 'width', 'font-weight'] as const
);
