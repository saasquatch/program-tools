import { html } from 'lit';
import { UI } from '../../ui';
import { InvoiceTableProps } from './InvoiceTable';
import { useInvoiceTable } from './useInvoiceTable';

type InvoiceRow = ReturnType<typeof useInvoiceTable>['invoices'][number];

const baseStyles = `
  :host { display: block; }
  .table-container { width: 100%; overflow-x: auto; }
  table { width: 100%; border-collapse: collapse; }
  th { text-align: left; padding: var(--sl-spacing-small) var(--sl-spacing-medium); font-weight: var(--sl-font-weight-semibold); font-size: var(--sl-font-size-small); color: var(--sl-color-neutral-600); border-bottom: 2px solid var(--sl-color-neutral-200); }
  td { padding: var(--sl-spacing-small) var(--sl-spacing-medium); border-bottom: 1px solid var(--sl-color-neutral-100); font-size: var(--sl-font-size-small); }
  tr:hover { background: var(--sl-color-neutral-50); }
  .pagination { display: flex; justify-content: center; align-items: center; gap: var(--sl-spacing-small); padding: var(--sl-spacing-medium) 0; }
  .empty-state { text-align: center; padding: var(--sl-spacing-x-large); color: var(--sl-color-neutral-500); }
  .page-info { font-size: var(--sl-font-size-small); color: var(--sl-color-neutral-600); }
  .download-link { color: var(--sl-color-primary-600); text-decoration: none; }
  .download-link:hover { text-decoration: underline; }
`;

function formatDate(date?: string) {
  if (!date) return '—';
  return new Date(date).toLocaleDateString();
}

function getInvoiceSummary(invoice: {
  invoiceNumber?: string;
  amount?: string | number;
  currency?: string;
}) {
  const invoiceNumber = invoice.invoiceNumber || '—';
  if (invoice.amount === undefined || invoice.amount === null) return invoiceNumber;
  return `${invoiceNumber} (${invoice.amount} ${invoice.currency || ''})`.trim();
}

export function InvoiceTableView(props: InvoiceTableProps & ReturnType<typeof useInvoiceTable>) {
  if (props.loading) {
    return html`
      <style>
        ${baseStyles}
      </style>
      <div class="empty-state" part="sqm-base">Loading invoices...</div>
    `;
  }

  if (props.empty) {
    return html`
      <style>
        ${baseStyles}
      </style>
      <div class="empty-state" part="sqm-base">${props.emptyStateText || 'No invoices yet'}</div>
    `;
  }

  return html`
    <style>
      ${baseStyles}
    </style>
    <div class="table-container" part="sqm-base">
      <table>
        <thead>
          <tr>
            <th>${props.dateShownColumn || 'Date'}</th>
            <th>${props.invoiceShownColumn || 'Invoice'}</th>
            <th>${props.downloadShownColumn || 'Download'}</th>
          </tr>
        </thead>
        <tbody>
          ${props.invoices.map(
            (invoice: InvoiceRow) => html`
              <tr>
                <td>${formatDate(invoice.dateCreated)}</td>
                <td>${getInvoiceSummary(invoice)}</td>
                <td>
                  ${invoice.downloadUrl
                    ? html`
                        <a class="download-link" href="${invoice.downloadUrl}" target="_blank" rel="noreferrer">
                          Download
                        </a>
                      `
                    : '—'}
                </td>
              </tr>
            `
          )}
        </tbody>
      </table>
    </div>
    ${props.totalPages > 1
      ? html`
          <div class="pagination">
            ${UI.Button({
              size: 'small',
              disabled: props.currentPage === 0,
              onClick: props.prevPage,
              prefix: UI.Icon({ name: 'chevron-left', slot: 'prefix' }),
              children: 'Previous',
            })}
            <span class="page-info">${props.currentPage + 1} / ${props.totalPages}</span>
            ${UI.Button({
              size: 'small',
              disabled: props.currentPage >= props.totalPages - 1,
              onClick: props.nextPage,
              suffix: UI.Icon({ name: 'chevron-right', slot: 'suffix' }),
              children: 'Next',
            })}
          </div>
        `
      : ''}
  `;
}
