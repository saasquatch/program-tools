import { html } from 'lit';
import { PortalContainerProps } from './PortalContainer';

export function PortalContainerView(props: PortalContainerProps) {
  return html`
    <style>
      :host {
        display: block;
      }

      .portal-container {
        display: ${props.display};
        ${props.display === 'grid'
          ? `grid-template-columns: ${props.gridColumns};`
          : `flex-direction: ${props.direction};`}
        padding: ${props.padding === 'none' ? '0' : `var(--sl-spacing-${props.padding})`};
        gap: ${props.gap === 'none' ? '0' : `var(--sl-spacing-${props.gap})`};
        ${props.maxWidth ? `max-width: ${props.maxWidth}; margin: 0 auto;` : ''}
      }
    </style>
    <div class="portal-container" part="sqm-base">
      <slot></slot>
    </div>
  `;
}
