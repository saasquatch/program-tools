import { html } from 'lit';
import { StatContainerProps } from './StatContainer';

export function StatContainerView(props: StatContainerProps) {
  const columns = props.columns || 3;
  const gap = props.gap || 'var(--sl-spacing-medium)';
  const padding = props.padding || 'var(--sl-spacing-large)';

  return html`
    <style>
      :host {
        display: block;
      }

      .stat-container {
        display: grid;
        grid-template-columns: repeat(${columns}, 1fr);
        gap: ${gap};
        padding: ${padding};
      }

      @media (max-width: 599px) {
        .stat-container {
          grid-template-columns: 1fr;
        }
      }
    </style>
    <div class="stat-container" part="sqm-base">
      <slot></slot>
    </div>
  `;
}
