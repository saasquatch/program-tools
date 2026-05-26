import { html } from 'lit';
import { DividedLayoutProps } from './DividedLayout';

export function DividedLayoutView(props: DividedLayoutProps) {
  const direction = props.direction || 'row';
  const gap = props.gap || 'var(--sl-spacing-medium)';
  const dividerColor = props.dividerColor || 'var(--sl-color-neutral-200)';
  const dividerWidth = props.dividerWidth || '1px';
  const dividerStyles =
    direction === 'row'
      ? `border-right: ${dividerWidth} solid ${dividerColor}; padding-right: ${gap};`
      : `border-bottom: ${dividerWidth} solid ${dividerColor}; padding-bottom: ${gap};`;

  return html`
    <style>
      :host {
        display: block;
      }

      .divided-layout {
        display: flex;
        flex-direction: ${direction};
        gap: ${gap};
      }

      ::slotted(*:not(:last-child)) {
        ${dividerStyles}
      }
    </style>
    <div class="divided-layout" part="sqm-base">
      <slot></slot>
    </div>
  `;
}
