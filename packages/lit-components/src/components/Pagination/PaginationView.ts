import { html } from 'lit';
import { PaginationProps } from './Pagination';
import { usePagination } from './usePagination';

export function PaginationView(props: PaginationProps & ReturnType<typeof usePagination>) {
  const hookProps = props;

  return html`
    <style>
      :host {
        display: block;
      }

      .pagination {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: var(--sl-spacing-small);
      }

      .page-info {
        font-size: var(--sl-font-size-small);
        color: var(--sl-color-neutral-600);
      }
    </style>
    <div class="pagination" part="sqm-base">
      <sl-button size="small" ?disabled="${!hookProps.hasPrev}" @click="${hookProps.prevPage}">
        <sl-icon name="chevron-left" slot="prefix"></sl-icon>
        ${props.showPreviousLabel}
      </sl-button>
      <span class="page-info">${hookProps.page} / ${hookProps.totalPages}</span>
      <sl-button size="small" ?disabled="${!hookProps.hasNext}" @click="${hookProps.nextPage}">
        ${props.showNextLabel}
        <sl-icon name="chevron-right" slot="suffix"></sl-icon>
      </sl-button>
    </div>
  `;
}
