import { html } from 'lit';

export function TimelineView() {
  return html`
    <style>
      :host {
        display: block;
      }

      .timeline {
        position: relative;
        padding-left: var(--sl-spacing-large);
      }

      .timeline::before {
        content: '';
        position: absolute;
        left: 8px;
        top: 0;
        bottom: 0;
        width: 2px;
        background: var(--sl-color-neutral-200);
      }
    </style>
    <div class="timeline" part="sqm-base">
      <slot></slot>
    </div>
  `;
}
