import { html } from 'lit';
import { UI } from '../../ui';
import { PortalForgotPasswordProps } from './PortalForgotPassword';
import { usePortalForgotPassword } from './usePortalForgotPassword';

const getInputValue = (event: Event) => ((event.target as HTMLInputElement & { value: string })?.value ?? '');

export function PortalForgotPasswordView(props: PortalForgotPasswordProps & ReturnType<typeof usePortalForgotPassword>) {
  return html`
    <style>
      :host {
        display: block;
      }

      .forgot-password-container {
        display: flex;
        flex-direction: column;
        gap: var(--sl-spacing-medium);
        max-width: 400px;
        margin: 0 auto;
      }

      .forgot-password-header {
        font-size: var(--sl-font-size-x-large);
        font-weight: var(--sl-font-weight-semibold);
        text-align: center;
        margin: 0;
      }

      .forgot-password-description {
        margin: 0;
        text-align: center;
        color: var(--sl-color-neutral-600);
      }

      form {
        display: flex;
        flex-direction: column;
        gap: var(--sl-spacing-medium);
      }

      .footer {
        display: flex;
        justify-content: center;
      }

      .link-button {
        cursor: pointer;
        color: var(--sl-color-primary-600);
        background: none;
        border: none;
        font-size: var(--sl-font-size-small);
        padding: 0;
      }

      .link-button:hover {
        text-decoration: underline;
      }
    </style>
    <div class="forgot-password-container" part="sqm-base">
      <h2 class="forgot-password-header">${props.headerText}</h2>
      <p class="forgot-password-description">${props.descriptionText}</p>
      ${props.error ? html`${UI.Alert({ variant: 'danger', open: true, children: props.error })}` : ''}
      ${props.success
        ? html`${UI.Alert({ variant: 'success', open: true, children: props.successMessage })}`
        : html`
            <form @submit="${props.onSubmit}">
              ${UI.Input({
                label: props.emailLabel,
                type: 'email',
                value: props.email,
                onInput: (event: Event) => props.setEmail(getInputValue(event)),
                required: true,
              })}
              ${UI.Button({ type: 'submit', variant: 'primary', loading: props.loading, style: 'width: 100%;', children: props.submitLabel })}
            </form>
          `}
      <div class="footer">
        <button class="link-button" @click="${props.onBack}">${props.backLabel}</button>
      </div>
    </div>
  `;
}
