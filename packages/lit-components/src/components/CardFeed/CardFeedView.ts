import { html } from 'lit';
import type { CardFeedProps } from './CardFeed';

export function CardFeedView(props: CardFeedProps) {
  return html`
    <style>
      :host {
        display: block;
      }

      .card-feed {
        column-gap: ${props.gap}px;
        column-width: ${props.width}px;
      }

      ::slotted(*) {
        display: block;
        width: 100%;
        margin-bottom: ${props.gap}px;
        break-inside: avoid;
        -webkit-column-break-inside: avoid;
      }
    </style>
    <div class="card-feed" part="sqm-base">
      <slot></slot>
    </div>
  `;
}
