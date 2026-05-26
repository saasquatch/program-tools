import { html } from 'lit';
import { UI } from '../../ui';
import type { MarketingEmailsCheckboxProps } from './MarketingEmailsCheckbox';

export function MarketingEmailsCheckboxView(props: MarketingEmailsCheckboxProps) {
  return html`
    <style>
      :host {
        display: block;
      }
    </style>
    ${UI.Checkbox({ name: props.fieldName, checked: props.defaultChecked, children: props.label })}
  `;
}
