import { html } from 'lit';
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
    <sl-button variant="primary" @click="${props.open}">${props.headerText}</sl-button>
    <sl-dialog
      label="${props.headerText}"
      ?open="${props.isOpen}"
      @sl-request-close="${props.close}"
      @sl-after-hide="${props.close}"
    >
      ${props.error ? html`<sl-alert variant="danger" open>${props.error}</sl-alert>` : ''}
      ${props.success ? html`<sl-alert variant="success" open>${props.successMessage}</sl-alert>` : ''}
      <form class="dialog-form" @submit="${props.onSubmit}" part="sqm-base">
        <sl-input
          label="${props.currentPasswordLabel}"
          type="password"
          value="${props.currentPassword}"
          @sl-input="${(event: Event) => props.setCurrentPassword(getInputValue(event))}"
          required
          password-toggle
        ></sl-input>
        <sl-input
          label="${props.newPasswordLabel}"
          type="password"
          value="${props.newPassword}"
          @sl-input="${(event: Event) => props.setNewPassword(getInputValue(event))}"
          required
          password-toggle
        ></sl-input>
        <sl-input
          label="${props.confirmPasswordLabel}"
          type="password"
          value="${props.confirmPassword}"
          @sl-input="${(event: Event) => props.setConfirmPassword(getInputValue(event))}"
          required
          password-toggle
        ></sl-input>
        <div class="dialog-actions">
          <sl-button type="button" variant="default" @click="${props.close}">Close</sl-button>
          <sl-button type="submit" variant="primary" ?loading="${props.loading}">${props.submitLabel}</sl-button>
        </div>
      </form>
    </sl-dialog>
  `;
}
