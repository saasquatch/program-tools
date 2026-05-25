import { html } from 'lit';
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
      ${!props.resetCode && !props.success ? html`<sl-alert variant="warning" open>Invalid or expired reset link.</sl-alert>` : ''}
      ${props.error ? html`<sl-alert variant="danger" open>${props.error}</sl-alert>` : ''}
      ${props.success
        ? html`<sl-alert variant="success" open>${props.successMessage}</sl-alert>`
        : html`
            <form @submit="${props.onSubmit}">
              <sl-input
                label="${props.passwordLabel}"
                type="password"
                value="${props.password}"
                @sl-input="${(event: Event) => props.setPassword(getInputValue(event))}"
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
              <sl-button
                type="submit"
                variant="primary"
                ?loading="${props.loading}"
                ?disabled="${!props.resetCode}"
                style="width: 100%;"
              >
                ${props.submitLabel}
              </sl-button>
            </form>
          `}
    </div>
  `;
}
