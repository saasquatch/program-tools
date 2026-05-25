import { html } from 'lit';
import type { MarketingEmailsCheckboxProps } from './MarketingEmailsCheckbox';

export function MarketingEmailsCheckboxView(props: MarketingEmailsCheckboxProps) {
  return html`
    <style>
      :host {
        display: block;
      }
    </style>
    <sl-checkbox name="${props.fieldName}" ?checked="${props.defaultChecked}"
      >${props.label}</sl-checkbox
    >
  `;
}
