import { html } from 'lit';
import { EmptyProps } from './Empty';

export function EmptyView(props: EmptyProps) {
  return html`
    <style>
      :host {
        display: block;
      }

      .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: var(--sl-spacing-medium);
        padding: var(--sl-spacing-large);
      }

      .image {
        height: 100px;
        margin: auto;
      }

      .text-container {
        text-align: center;
      }

      .header {
        margin: 0;
        font-size: var(--sl-font-size-medium);
      }

      .description {
        margin: 0;
        font-size: var(--sl-font-size-small);
        color: var(--sqm-text);
      }
    </style>
    <div class="container">
      ${props.emptyStateImage
        ? html`<img class="image" src="${props.emptyStateImage}" />`
        : ''}
      <div class="text-container">
        <p class="header">${props.emptyStateHeader || ''}</p>
        <p class="description">
          ${props.emptyStateText || ''}${props.supportText ? html` ${props.supportText}` : ''}
        </p>
      </div>
    </div>
  `;
}
