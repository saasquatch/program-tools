import { html, nothing } from 'lit';
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
          <sl-button variant="text" @click="${props.onLogin}">${props.loginLabel}</sl-button>
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
                <sl-input
                  label="First Name"
                  .value="${props.firstName}"
                  ?disabled="${props.loading}"
                  @sl-input="${(event: Event) => props.setFirstName(getValue(event))}"
                ></sl-input>
                <sl-input
                  label="Last Name"
                  .value="${props.lastName}"
                  ?disabled="${props.loading}"
                  @sl-input="${(event: Event) => props.setLastName(getValue(event))}"
                ></sl-input>
              </div>
              <sl-input
                type="email"
                label="${props.emailLabel}"
                .value="${props.email}"
                ?disabled="${props.loading || props.mode === 'google'}"
                @sl-input="${(event: Event) => props.setEmail(getValue(event))}"
              ></sl-input>
            `
          : nothing}
        <slot name="formData"></slot>
        ${showPasswordFields
          ? html`
              <sl-input
                type="password"
                label="${props.passwordLabel}"
                .value="${props.password}"
                ?disabled="${props.loading}"
                password-toggle
                @sl-input="${(event: Event) => props.setPassword(getValue(event))}"
                help-text="${props.passwordHelpText}"
              ></sl-input>
              ${props.confirmPassword
                ? html`
                    <sl-input
                      type="password"
                      label="${props.confirmPasswordLabel}"
                      .value="${props.confirmPasswordValue}"
                      ?disabled="${props.loading}"
                      password-toggle
                      @sl-input="${(event: Event) =>
                        props.setConfirmPasswordValue(getValue(event))}"
                    ></sl-input>
                  `
                : nothing}
            `
          : nothing}
        <slot name="terms"></slot>
        ${props.error ? html`<p class="error-text">${props.error}</p>` : nothing}
        <sl-button type="submit" variant="primary" ?loading="${props.loading}">
          ${props.submitLabel}
        </sl-button>
      </form>
      <div class="login-cta">
        <span>${props.loginCTA}</span>
        <sl-button variant="text" @click="${props.onLogin}">${props.loginLabel}</sl-button>
      </div>
    </div>
  `;
}
