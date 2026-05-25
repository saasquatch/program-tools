import { html } from 'lit';
import { TitledSectionProps } from './TitledSection';

function getSpacingValue(spacing: TitledSectionProps['padding'] | TitledSectionProps['labelMargin']) {
  return spacing === 'none' ? '0' : `var(--sl-spacing-${spacing})`;
}

export function TitledSectionView(props: TitledSectionProps) {
  return html`
    <style>
      :host {
        display: block;
      }

      .section-container {
        text-align: ${props.textAlign || 'left'};
        padding: ${getSpacingValue(props.padding)};
      }

      .label-container {
        margin-bottom: ${getSpacingValue(props.labelMargin)};
      }
    </style>
    <div class="section-container" part="sqm-base">
      <div class="label-container" part="sqm-label">
        <slot name="label">${props.label || ''}</slot>
      </div>
      <slot name="content"></slot>
    </div>
  `;
}
