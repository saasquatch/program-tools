import { html } from 'lit';
import { UI } from '../../ui';
import { IndirectTaxFormProps } from './IndirectTaxForm';
import { useIndirectTaxForm } from './useIndirectTaxForm';

const getInputValue = (event: Event) => ((event.target as HTMLInputElement & { value: string })?.value ?? '');

export function IndirectTaxFormView(props: IndirectTaxFormProps & ReturnType<typeof useIndirectTaxForm>) {
  return html`
    <style>
      :host { display: block; }
      .tax-form { display: flex; flex-direction: column; gap: var(--sl-spacing-medium); max-width: 480px; }
      .tax-form-header { margin: 0; font-size: var(--sl-font-size-large); font-weight: var(--sl-font-weight-semibold); }
      form { display: flex; flex-direction: column; gap: var(--sl-spacing-medium); }
    </style>
    <div class="tax-form" part="sqm-base">
      <h3 class="tax-form-header">${props.headerText}</h3>
      ${props.error ? html`${UI.Alert({ variant: 'danger', open: true, children: props.error })}` : ''}
      ${props.success ? html`${UI.Alert({ variant: 'success', open: true, children: 'Tax information submitted.' })}` : ''}
      <form @submit="${props.onSubmit}">
        ${UI.Input({ label: props.taxIdLabel, value: props.taxId, onInput: (event: Event) => props.setTaxId(getInputValue(event)), disabled: props.loading })}
        ${UI.Input({ label: props.countryLabel, value: props.country, onInput: (event: Event) => props.setCountry(getInputValue(event)), disabled: props.loading })}
        ${UI.Button({ type: 'submit', variant: 'primary', loading: props.loading, children: props.submitLabel })}
      </form>
    </div>
  `;
}
