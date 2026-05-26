import { html } from 'lit';
import { UI } from '../../ui';
import { PortalLoginProps } from './PortalLogin';
import { usePortalLogin } from './usePortalLogin';

const getInputValue = (event: Event) => ((event.target as HTMLInputElement & { value: string })?.value ?? '');

export function PortalLoginView(props: PortalLoginProps & ReturnType<typeof usePortalLogin>) {
  const errorMessage = props.error || props.errorMessage;

  return html`
    <style>
      :host {
        display: block;
      }

      .login-container {
        display: flex;
        flex-direction: column;
        gap: var(--sl-spacing-medium);
        max-width: 400px;
        margin: 0 auto;
      }

      .login-header {
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

      .login-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: var(--sl-spacing-small);
        flex-wrap: wrap;
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
    <div class="login-container" part="sqm-base">
      <h2 class="login-header">${props.headerText}</h2>
      ${errorMessage ? html`${UI.Alert({ variant: 'danger', open: true, children: errorMessage })}` : ''}
      <form @submit="${props.onSubmit}">
        ${UI.Input({
          label: props.emailLabel,
          type: 'email',
          value: props.email,
          onInput: (event: Event) => props.setEmail(getInputValue(event)),
          required: true,
        })}
        ${UI.Input({
          label: props.passwordLabel,
          type: 'password',
          value: props.password,
          onInput: (event: Event) => props.setPassword(getInputValue(event)),
          required: true,
          passwordToggle: true,
        })}
        ${UI.Button({ type: 'submit', variant: 'primary', loading: props.loading, style: 'width: 100%;', children: props.submitLabel })}
      </form>
      <div class="login-footer">
        ${!props.hideForgotPassword
          ? html`<button class="link-button" @click="${props.onForgotPassword}">${props.forgotPasswordLabel}</button>`
          : ''}
        ${!props.hideRegister
          ? html`<button class="link-button" @click="${props.onRegister}">${props.registerLabel}</button>`
          : ''}
      </div>
      <slot></slot>
    </div>
  `;
}
