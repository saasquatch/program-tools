import { html } from 'lit';
import { IndirectTaxFormProps } from './IndirectTaxForm';
import { useIndirectTaxForm } from './useIndirectTaxForm';

const getInputValue = (event: Event) => ((event.target as HTMLInputElement & { value: string })?.value ?? '');

export function IndirectTaxFormView(props: IndirectTaxFormProps & ReturnType<typeof useIndirectTaxForm>) {
  return html`
    <style>
      :host {
        display: block;
      }

      .tax-form {
        display: flex;
        flex-direction: column;
        gap: var(--sl-spacing-medium);
        max-width: 480px;
      }

      .tax-form-header {
        margin: 0;
        font-size: var(--sl-font-size-large);
        font-weight: var(--sl-font-weight-semibold);
      }

      form {
        display: flex;
        flex-direction: column;
        gap: var(--sl-spacing-medium);
      }
    </style>
    <div class="tax-form" part="sqm-base">
      <h3 class="tax-form-header">${props.headerText}</h3>
      ${props.error ? html`<sl-alert variant="danger" open>${props.error}</sl-alert>` : ''}
      ${props.success ? html`<sl-alert variant="success" open>Tax information submitted.</sl-alert>` : ''}
      <form @submit="${props.onSubmit}">
        <sl-input
          label="${props.taxIdLabel}"
          value="${props.taxId}"
          @sl-input="${(event: Event) => props.setTaxId(getInputValue(event))}"
          ?disabled="${props.loading}"
        ></sl-input>
        <sl-input
          label="${props.countryLabel}"
          value="${props.country}"
          @sl-input="${(event: Event) => props.setCountry(getInputValue(event))}"
          ?disabled="${props.loading}"
        ></sl-input>
        <sl-button type="submit" variant="primary" ?loading="${props.loading}">${props.submitLabel}</sl-button>
      </form>
    </div>
  `;
}
