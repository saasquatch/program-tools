import { html } from 'lit';
import type { LeadFormProps } from './LeadForm';
import { useLeadForm } from './useLeadForm';

export function LeadFormView(props: LeadFormProps & ReturnType<typeof useLeadForm>) {
  return html`
    <style>
      :host {
        display: block;
      }

      .lead-form {
        display: flex;
        flex-direction: column;
        gap: var(--sl-spacing-medium);
        max-width: 500px;
      }

      .form-header {
        font-size: var(--sl-font-size-x-large);
        font-weight: var(--sl-font-weight-semibold);
      }
    </style>
    <div class="lead-form" part="sqm-base">
      ${props.success
        ? html`
            <sl-alert variant="success" open>
              <sl-icon slot="icon" name="check-circle"></sl-icon>
              ${props.successMessage}
            </sl-alert>
          `
        : html`
            ${props.headerText ? html`<h2 class="form-header">${props.headerText}</h2>` : ''}
            ${props.error ? html`<sl-alert variant="danger" open>${props.error}</sl-alert>` : ''}
            <form @submit="${props.onSubmit}">
              <slot></slot>
              <sl-button
                type="submit"
                variant="primary"
                ?loading="${props.loading}"
                style="width: 100%; margin-top: var(--sl-spacing-small);"
              >
                ${props.submitLabel}
              </sl-button>
            </form>
          `}
    </div>
  `;
}
