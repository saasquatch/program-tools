import { html } from 'lit';
import { UI } from '../../ui';
import { BankingInfoFormProps } from './BankingInfoForm';
import { useBankingInfoForm } from './useBankingInfoForm';

const getInputValue = (event: Event) => ((event.target as HTMLInputElement & { value: string })?.value ?? '');

export function BankingInfoFormView(props: BankingInfoFormProps & ReturnType<typeof useBankingInfoForm>) {
  return html`
    <style>
      :host {
        display: block;
      }

      .banking-form {
        display: flex;
        flex-direction: column;
        gap: var(--sl-spacing-medium);
        max-width: 480px;
      }

      .banking-header {
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
    <div class="banking-form" part="sqm-base">
      <h3 class="banking-header">${props.headerText}</h3>
      ${props.error ? html`${UI.Alert({ variant: 'danger', open: true, children: props.error })}` : ''}
      ${props.success ? html`${UI.Alert({ variant: 'success', open: true, children: 'Banking information saved.' })}` : ''}
      <form @submit="${props.onSubmit}">
        ${UI.Input({ label: props.accountNameLabel, value: props.accountName, onInput: (event: Event) => props.setAccountName(getInputValue(event)), disabled: props.loading })}
        ${UI.Input({ label: props.bankNameLabel, value: props.bankName, onInput: (event: Event) => props.setBankName(getInputValue(event)), disabled: props.loading })}
        ${UI.Input({ label: props.accountNumberLabel, value: props.accountNumber, onInput: (event: Event) => props.setAccountNumber(getInputValue(event)), disabled: props.loading })}
        ${UI.Input({ label: props.routingNumberLabel, value: props.routingNumber, onInput: (event: Event) => props.setRoutingNumber(getInputValue(event)), disabled: props.loading })}
        ${UI.Button({ type: 'submit', variant: 'primary', loading: props.loading, children: props.submitLabel })}
      </form>
    </div>
  `;
}
