import { getProps } from '../../helpers';
import { useComponent } from '../../hooks/useComponent';
import { InvoiceTableView } from './InvoiceTableView';
import { useInvoiceTable } from './useInvoiceTable';

export interface InvoiceTableProps {
  perPage: number;
  programId?: string;
  dateShownColumn: string;
  invoiceShownColumn: string;
  downloadShownColumn: string;
  emptyStateText: string;
}

const parseNumber = (value: unknown, fallback: number) => {
  if (typeof value === 'number') return value;
  if (typeof value === 'string' && value.trim() !== '') {
    const parsedValue = Number(value);
    return Number.isNaN(parsedValue) ? fallback : parsedValue;
  }
  return fallback;
};

declare global {
  interface HTMLElementTagNameMap {
    'sql-invoice-table': HTMLElement;
  }
}

export const InvoiceTable = useComponent<InvoiceTableProps>(
  (host) => {
    const rawProps = getProps(host) as Partial<Record<keyof InvoiceTableProps, unknown>>;
    const props: InvoiceTableProps = {
      perPage: parseNumber(rawProps.perPage, 4),
      programId: typeof rawProps.programId === 'string' ? rawProps.programId : undefined,
      dateShownColumn: typeof rawProps.dateShownColumn === 'string' ? rawProps.dateShownColumn : 'Date',
      invoiceShownColumn:
        typeof rawProps.invoiceShownColumn === 'string' ? rawProps.invoiceShownColumn : 'Invoice',
      downloadShownColumn:
        typeof rawProps.downloadShownColumn === 'string' ? rawProps.downloadShownColumn : 'Download',
      emptyStateText: typeof rawProps.emptyStateText === 'string' ? rawProps.emptyStateText : 'No invoices yet',
    };

    const hookProps = useInvoiceTable(props);

    return InvoiceTableView({ ...props, ...hookProps });
  },
  'sql-invoice-table',
  [
    'per-page',
    'program-id',
    'date-shown-column',
    'invoice-shown-column',
    'download-shown-column',
    'empty-state-text',
  ] as const
);
