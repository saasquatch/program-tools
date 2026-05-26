import { html } from 'lit';
import { UI } from '../../ui';
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
      ${UI.Button({
        size: 'small',
        disabled: !hookProps.hasPrev,
        onClick: hookProps.prevPage,
        prefix: UI.Icon({ name: 'chevron-left' }),
        children: props.showPreviousLabel,
      })}
      <span class="page-info">${hookProps.page} / ${hookProps.totalPages}</span>
      ${UI.Button({
        size: 'small',
        disabled: !hookProps.hasNext,
        onClick: hookProps.nextPage,
        suffix: UI.Icon({ name: 'chevron-right' }),
        children: props.showNextLabel,
      })}
    </div>
  `;
}
