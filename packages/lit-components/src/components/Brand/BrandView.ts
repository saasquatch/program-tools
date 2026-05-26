import { html } from 'lit';
import { BrandProps } from './Brand';
import { UseBrandResult } from './useBrand';

export function BrandView(props: BrandProps & UseBrandResult) {
  const font = props.font || 'Nunito Sans';

  return html`
    <style>
      :host {
        display: contents;
      }

      ::slotted(*) {
        --sl-font-sans: "${font}", arial;
        --sl-input-font-family: "${font}", arial;
        --sl-tooltip-font-family: "${font}", arial;
        font-family: "${font}", arial;
        ${props.brandColorCss}
        --sl-focus-ring-color-primary: var(--sl-color-primary-100);
        --sl-input-border-color-focus: var(--sl-color-primary-500);
      }
    </style>
    <slot></slot>
  `;
}
