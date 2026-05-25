import { html } from 'lit';
import { TableCellProps } from './TableCell';

export function TableCellView(props: TableCellProps) {
  return html`
    <style>
      :host { display: table-cell; }
      .cell { text-align: ${props.alignment || 'left'}; ${props.width ? `width: ${props.width};` : ''} font-weight: ${props.fontWeight || 'normal'}; padding: var(--sl-spacing-small) var(--sl-spacing-medium); }
    </style>
    <div class="cell" part="sqm-base"><slot></slot></div>
  `;
}
