import type { Meta, StoryObj } from '@storybook/web-components-vite';
import '../../index';
import { InvoiceTableProps } from './InvoiceTable';
import { InvoiceTableView } from './InvoiceTableView';

const sampleInvoices = [
  {
    id: 'invoice-1',
    dateCreated: '2024-01-15T00:00:00.000Z',
    invoiceNumber: 'INV-1001',
    downloadUrl: 'https://example.com/invoice-1001.pdf',
    amount: 125,
    currency: 'USD',
  },
  {
    id: 'invoice-2',
    dateCreated: '2024-02-01T00:00:00.000Z',
    invoiceNumber: 'INV-1002',
    downloadUrl: 'https://example.com/invoice-1002.pdf',
    amount: 80,
    currency: 'USD',
  },
  {
    id: 'invoice-3',
    dateCreated: '2024-02-20T00:00:00.000Z',
    invoiceNumber: 'INV-1003',
    downloadUrl: 'https://example.com/invoice-1003.pdf',
    amount: 64,
    currency: 'USD',
  },
  {
    id: 'invoice-4',
    dateCreated: '2024-03-01T00:00:00.000Z',
    invoiceNumber: 'INV-1004',
    downloadUrl: 'https://example.com/invoice-1004.pdf',
    amount: 42,
    currency: 'USD',
  },
];

const baseProps: InvoiceTableProps = {
  perPage: 4,
  programId: '41863',
  dateShownColumn: 'Date',
  invoiceShownColumn: 'Invoice',
  downloadShownColumn: 'Download',
  emptyStateText: 'No invoices yet',
};

const renderTable = (
  args: Partial<InvoiceTableProps> = {},
  overrides: Partial<Parameters<typeof InvoiceTableView>[0]> = {}
) =>
  InvoiceTableView({
    ...baseProps,
    ...args,
    invoices: sampleInvoices,
    loading: false,
    totalCount: sampleInvoices.length,
    totalPages: 1,
    currentPage: 0,
    nextPage: () => undefined,
    prevPage: () => undefined,
    empty: false,
    ...overrides,
  });

const meta: Meta = {
  title: 'Components/InvoiceTable',
  component: 'sql-invoice-table',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => renderTable(),
};

export const Loading: Story = {
  render: () => renderTable({}, { loading: true }),
};

export const Empty: Story = {
  render: () => renderTable({}, { invoices: [], totalCount: 0, totalPages: 0, empty: true }),
};

export const WithPagination: Story = {
  render: () => renderTable({}, { totalCount: 8, totalPages: 2, currentPage: 0 }),
};
