import { html } from 'lit';
import { UI } from '../../ui';
import { PortalResetPasswordProps } from './PortalResetPassword';
import { usePortalResetPassword } from './usePortalResetPassword';

const getInputValue = (event: Event) => ((event.target as HTMLInputElement & { value: string })?.value ?? '');

export function PortalResetPasswordView(props: PortalResetPasswordProps & ReturnType<typeof usePortalResetPassword>) {
  return html`
    <style>
      :host {
        display: block;
      }

      .reset-password-container {
        display: flex;
        flex-direction: column;
        gap: var(--sl-spacing-medium);
        max-width: 400px;
        margin: 0 auto;
      }

      .reset-password-header {
        font-size: var(--sl-font-size-x-large);
        font-weight: var(--sl-font-weight-semibold);
        text-align: center;
        margin: 0;
      }

      form {
        display: flex;
        flex-direction: column;
        gap: var(--sl-spacing-medium);
      }
    </style>
    <div class="reset-password-container" part="sqm-base">
      <h2 class="reset-password-header">${props.headerText}</h2>
      ${!props.resetCode && !props.success ? html`${UI.Alert({ variant: 'warning', open: true, children: 'Invalid or expired reset link.' })}` : ''}
      ${props.error ? html`${UI.Alert({ variant: 'danger', open: true, children: props.error })}` : ''}
      ${props.success
        ? html`${UI.Alert({ variant: 'success', open: true, children: props.successMessage })}`
        : html`
            <form @submit="${props.onSubmit}">
              ${UI.Input({ label: props.passwordLabel, type: 'password', value: props.password, onInput: (event: Event) => props.setPassword(getInputValue(event)), required: true, passwordToggle: true })}
              ${UI.Input({ label: props.confirmPasswordLabel, type: 'password', value: props.confirmPassword, onInput: (event: Event) => props.setConfirmPassword(getInputValue(event)), required: true, passwordToggle: true })}
              ${UI.Button({ type: 'submit', variant: 'primary', loading: props.loading, disabled: !props.resetCode, style: 'width: 100%;', children: props.submitLabel })}
            </form>
          `}
    </div>
  `;
}
