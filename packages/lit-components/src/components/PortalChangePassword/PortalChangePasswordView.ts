import { html } from 'lit';
import { UI } from '../../ui';
import { PortalChangePasswordProps } from './PortalChangePassword';
import { usePortalChangePassword } from './usePortalChangePassword';

const getInputValue = (event: Event) => ((event.target as HTMLInputElement & { value: string })?.value ?? '');

export function PortalChangePasswordView(props: PortalChangePasswordProps & ReturnType<typeof usePortalChangePassword>) {
  return html`
    <style>
      :host {
        display: block;
      }

      .dialog-form {
        display: flex;
        flex-direction: column;
        gap: var(--sl-spacing-medium);
      }

      .dialog-actions {
        display: flex;
        justify-content: flex-end;
        gap: var(--sl-spacing-small);
      }
    </style>
    ${UI.Button({ variant: 'primary', onClick: props.open, children: props.headerText })}
    ${UI.Dialog({
      label: props.headerText,
      open: props.isOpen,
      onRequestClose: props.close,
      onAfterHide: props.close,
      children: html`
        ${props.error ? html`${UI.Alert({ variant: 'danger', open: true, children: props.error })}` : ''}
        ${props.success ? html`${UI.Alert({ variant: 'success', open: true, children: props.successMessage })}` : ''}
        <form class="dialog-form" @submit="${props.onSubmit}" part="sqm-base">
          ${UI.Input({
            label: props.currentPasswordLabel,
            type: 'password',
            value: props.currentPassword,
            onInput: (event: Event) => props.setCurrentPassword(getInputValue(event)),
            required: true,
            passwordToggle: true,
          })}
          ${UI.Input({
            label: props.newPasswordLabel,
            type: 'password',
            value: props.newPassword,
            onInput: (event: Event) => props.setNewPassword(getInputValue(event)),
            required: true,
            passwordToggle: true,
          })}
          ${UI.Input({
            label: props.confirmPasswordLabel,
            type: 'password',
            value: props.confirmPassword,
            onInput: (event: Event) => props.setConfirmPassword(getInputValue(event)),
            required: true,
            passwordToggle: true,
          })}
          <div class="dialog-actions">
            ${UI.Button({ type: 'button', variant: 'default', onClick: props.close, children: 'Close' })}
            ${UI.Button({ type: 'submit', variant: 'primary', loading: props.loading, children: props.submitLabel })}
          </div>
        </form>
      `,
    })}
  `;
}
