import { html } from 'lit';
import { PortalRegisterProps } from './PortalRegister';
import { usePortalRegister } from './usePortalRegister';

const getInputValue = (event: Event) => ((event.target as HTMLInputElement & { value: string })?.value ?? '');

export function PortalRegisterView(props: PortalRegisterProps & ReturnType<typeof usePortalRegister>) {
  return html`
    <style>
      :host {
        display: block;
      }

      .register-container {
        display: flex;
        flex-direction: column;
        gap: var(--sl-spacing-medium);
        max-width: 400px;
        margin: 0 auto;
      }

      .register-header {
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

      .register-footer {
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
    <div class="register-container" part="sqm-base">
      <h2 class="register-header">${props.headerText}</h2>
      ${props.error ? html`<sl-alert variant="danger" open>${props.error}</sl-alert>` : ''}
      <form @submit="${props.onSubmit}">
        <sl-input
          label="${props.emailLabel}"
          type="email"
          value="${props.email}"
          @sl-input="${(event: Event) => props.setEmail(getInputValue(event))}"
          required
        ></sl-input>
        <sl-input
          label="${props.passwordLabel}"
          type="password"
          value="${props.password}"
          @sl-input="${(event: Event) => props.setPassword(getInputValue(event))}"
          required
          password-toggle
        ></sl-input>
        ${props.showConfirmPassword
          ? html`<sl-input
              label="${props.confirmPasswordLabel}"
              type="password"
              value="${props.confirmPassword}"
              @sl-input="${(event: Event) => props.setConfirmPassword(getInputValue(event))}"
              required
              password-toggle
            ></sl-input>`
          : ''}
        <sl-button type="submit" variant="primary" ?loading="${props.loading}" style="width: 100%;">
          ${props.submitLabel}
        </sl-button>
      </form>
      <div class="register-footer">
        <button class="link-button" @click="${props.onLogin}">${props.loginLabel}</button>
      </div>
      <slot></slot>
    </div>
  `;
}
