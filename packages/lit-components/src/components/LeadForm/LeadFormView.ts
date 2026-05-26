import { html } from 'lit';
import { UI } from '../../ui';
import type { LeadFormProps } from './LeadForm';
import { useLeadForm } from './useLeadForm';

export function LeadFormView(props: LeadFormProps & ReturnType<typeof useLeadForm>) {
  return html`
    <style>
      :host { display: block; }
      .lead-form { display: flex; flex-direction: column; gap: var(--sl-spacing-medium); max-width: 500px; }
      .form-header { font-size: var(--sl-font-size-x-large); font-weight: var(--sl-font-weight-semibold); }
    </style>
    <div class="lead-form" part="sqm-base">
      ${props.success
        ? html`
            ${UI.Alert({
              variant: 'success',
              open: true,
              icon: UI.Icon({ name: 'check-circle' }),
              children: props.successMessage,
            })}
          `
        : html`
            ${props.headerText ? html`<h2 class="form-header">${props.headerText}</h2>` : ''}
            ${props.error ? html`${UI.Alert({ variant: 'danger', open: true, children: props.error })}` : ''}
            <form @submit="${props.onSubmit}">
              <slot></slot>
              ${UI.Button({
                type: 'submit',
                variant: 'primary',
                loading: props.loading,
                style: 'width: 100%; margin-top: var(--sl-spacing-small);',
                children: props.submitLabel,
              })}
            </form>
          `}
    </div>
  `;
}
