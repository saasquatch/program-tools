import { html } from 'lit';
import { TableRowProps } from './TableRow';

export function TableRowView(props: TableRowProps) {
  return html`
    <style>
      :host { display: table-row; }
      .row { display: flex; align-items: center; border-bottom: 1px solid var(--sl-color-neutral-100); }
      .row:hover { background: var(--sl-color-neutral-50); }
      .row.highlighted { background: var(--sl-color-primary-50); }
    </style>
    <div class="row ${props.highlighted ? 'highlighted' : ''}" part="sqm-base"><slot></slot></div>
  `;
}
