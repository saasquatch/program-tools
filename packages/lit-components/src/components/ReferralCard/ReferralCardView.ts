import { html } from 'lit';
import { ReferralCardProps } from './ReferralCard';

export function ReferralCardView(props: ReferralCardProps) {
  const padding = props.padding === 'none' ? '0' : `var(--sl-spacing-${props.padding || 'medium'})`;
  const borderRadius = props.borderRadius
    ? `${props.borderRadius}px`
    : 'var(--sl-border-radius-large)';

  return html`
    <style>
      :host {
        display: block;
      }

      .referral-card {
        padding: ${padding};
        background: ${props.backgroundColor || 'var(--sl-color-neutral-0)'};
        border: 1px solid ${props.borderColor || 'var(--sl-color-neutral-200)'};
        border-radius: ${borderRadius};
        box-shadow: var(--sl-shadow-small);
      }
    </style>
    <div class="referral-card" part="sqm-base">
      <slot></slot>
    </div>
  `;
}
