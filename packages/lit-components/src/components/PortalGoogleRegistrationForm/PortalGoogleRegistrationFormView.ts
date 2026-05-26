import { html, nothing } from 'lit';
import { UI } from '../../ui';
import { BaseRegistrationView } from '../BaseRegistration/BaseRegistrationView';
import type { PortalGoogleRegistrationFormProps } from './PortalGoogleRegistrationForm';
import type { PortalGoogleRegistrationFormHookResult } from './usePortalGoogleRegistrationForm';

const getValue = (event: Event) =>
  String((event.target as HTMLInputElement & { value?: string })?.value ?? '');

export function PortalGoogleRegistrationFormView(
  props: PortalGoogleRegistrationFormProps & PortalGoogleRegistrationFormHookResult
) {
  if (props.mode === 'base') {
    return BaseRegistrationView({
      pageLabel: props.pageLabel,
      emailLabel: props.emailLabel,
      submitLabel: props.submitLabel,
      requiredFieldErrorMessage: props.requiredFieldErrorMessage,
      invalidEmailErrorMessage: props.invalidEmailErrorMessage,
      showGoogleButton: true,
      showSecondaryButton: true,
      email: props.baseEmail,
      setEmail: props.setBaseEmail,
      validationErrors: props.validationErrors,
      loading: props.loading,
      onSubmit: props.onBaseSubmit,
      formData: html`<slot name="formData"></slot>`,
      terms: html`<slot name="terms"></slot>`,
      googleButton: html`
        <sql-google-sign-in
          text="${props.googleButtonText}"
          @init-complete="${props.onGoogleInit}"
        ></sql-google-sign-in>
      `,
      secondaryButton: html`
        <div class="login-cta-inline">
          <span>${props.loginCTA}</span>
          ${UI.Button({ variant: 'text', onClick: props.onLogin, children: props.loginLabel })}
        </div>
      `,
    });
  }

  const showPasswordFields = props.mode !== 'google';
  const showDefaultInputs = !props.hideInputs;

  return html`
    <style>
      :host {
        display: block;
      }

      .wrapper {
        display: grid;
        gap: var(--sl-spacing-large);
        width: 100%;
        max-width: 32rem;
        margin: 0 auto;
      }

      .title,
      .supporting-copy,
      .login-cta {
        text-align: center;
      }

      h3,
      p {
        margin: 0;
      }

      .registration-form {
        display: grid;
        gap: var(--sl-spacing-medium);
      }

      .name-grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: var(--sl-spacing-small);
      }

      .error-text {
        color: var(--sl-color-danger-600);
        font-size: var(--sl-font-size-small);
      }

      .google-copy {
        color: var(--sl-color-neutral-500);
        font-size: var(--sl-font-size-small);
      }
    </style>
    <div class="wrapper" part="sqm-base">
      <div class="title">
        <h3>${props.pageLabel}</h3>
        ${props.mode === 'google'
          ? html`<p class="supporting-copy google-copy">
              Google pre-filled your registration details.
            </p>`
          : nothing}
      </div>
      <form class="registration-form" @submit="${props.onSubmit}">
        ${showDefaultInputs
          ? html`
              <div class="name-grid">
                ${UI.Input({
                  label: 'First Name',
                  value: props.firstName,
                  disabled: props.loading,
                  onInput: (event: Event) => props.setFirstName(getValue(event)),
                })}
                ${UI.Input({
                  label: 'Last Name',
                  value: props.lastName,
                  disabled: props.loading,
                  onInput: (event: Event) => props.setLastName(getValue(event)),
                })}
              </div>
              ${UI.Input({
                type: 'email',
                label: props.emailLabel,
                value: props.email,
                disabled: props.loading || props.mode === 'google',
                onInput: (event: Event) => props.setEmail(getValue(event)),
              })}
            `
          : nothing}
        <slot name="formData"></slot>
        ${showPasswordFields
          ? html`
              ${UI.Input({
                type: 'password',
                label: props.passwordLabel,
                value: props.password,
                disabled: props.loading,
                passwordToggle: true,
                onInput: (event: Event) => props.setPassword(getValue(event)),
                helpText: props.passwordHelpText,
              })}
              ${props.confirmPassword
                ? html`
                    ${UI.Input({
                      type: 'password',
                      label: props.confirmPasswordLabel,
                      value: props.confirmPasswordValue,
                      disabled: props.loading,
                      passwordToggle: true,
                      onInput: (event: Event) => props.setConfirmPasswordValue(getValue(event)),
                    })}
                  `
                : nothing}
            `
          : nothing}
        <slot name="terms"></slot>
        ${props.error ? html`<p class="error-text">${props.error}</p>` : nothing}
        ${UI.Button({ type: 'submit', variant: 'primary', loading: props.loading, children: props.submitLabel })}
      </form>
      <div class="login-cta">
        <span>${props.loginCTA}</span>
        ${UI.Button({ variant: 'text', onClick: props.onLogin, children: props.loginLabel })}
      </div>
    </div>
  `;
}
