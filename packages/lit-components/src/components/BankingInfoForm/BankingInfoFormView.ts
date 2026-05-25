import { html } from 'lit';
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
      ${props.error ? html`<sl-alert variant="danger" open>${props.error}</sl-alert>` : ''}
      ${props.success ? html`<sl-alert variant="success" open>Banking information saved.</sl-alert>` : ''}
      <form @submit="${props.onSubmit}">
        <sl-input
          label="${props.accountNameLabel}"
          value="${props.accountName}"
          @sl-input="${(event: Event) => props.setAccountName(getInputValue(event))}"
          ?disabled="${props.loading}"
        ></sl-input>
        <sl-input
          label="${props.bankNameLabel}"
          value="${props.bankName}"
          @sl-input="${(event: Event) => props.setBankName(getInputValue(event))}"
          ?disabled="${props.loading}"
        ></sl-input>
        <sl-input
          label="${props.accountNumberLabel}"
          value="${props.accountNumber}"
          @sl-input="${(event: Event) => props.setAccountNumber(getInputValue(event))}"
          ?disabled="${props.loading}"
        ></sl-input>
        <sl-input
          label="${props.routingNumberLabel}"
          value="${props.routingNumber}"
          @sl-input="${(event: Event) => props.setRoutingNumber(getInputValue(event))}"
          ?disabled="${props.loading}"
        ></sl-input>
        <sl-button type="submit" variant="primary" ?loading="${props.loading}">${props.submitLabel}</sl-button>
      </form>
    </div>
  `;
}
