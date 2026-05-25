import { html } from 'lit';
import type { PortalRegistrationFormProps } from './PortalRegistrationForm';
import { usePortalRegistrationForm } from './usePortalRegistrationForm';

type FormEventTarget = EventTarget & { value?: string; checked?: boolean };

const styles = `
  :host {
    display: block;
  }

  .registration-form {
    display: flex;
    flex-direction: column;
    gap: var(--sl-spacing-medium);
    max-width: 28rem;
    margin: 0 auto;
  }

  .name-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: var(--sl-spacing-small);
  }

  h2,
  p {
    margin: 0;
  }

  .error-text {
    color: var(--sl-color-danger-600);
  }

  .terms-copy {
    display: inline-flex;
    gap: 0.25rem;
    flex-wrap: wrap;
  }
`;

const getValue = (event: Event) => String((event.target as FormEventTarget).value ?? '');
const getChecked = (event: Event) => Boolean((event.target as FormEventTarget).checked);

export function PortalRegistrationFormView(
  props: PortalRegistrationFormProps & ReturnType<typeof usePortalRegistrationForm>
) {
  return html`
    <style>
      ${styles}
    </style>
    <form class="registration-form" @submit="${(event: Event) => props.onSubmit(event)}">
      <h2>${props.headerText}</h2>
      ${props.showNameFields
        ? html`
            <div class="name-grid">
              <sl-input
                name="firstName"
                label="${props.firstNameLabel}"
                .value="${props.firstName}"
                ?disabled="${props.loading}"
                @sl-input="${(event: Event) => props.setFirstName(getValue(event))}"
              ></sl-input>
              <sl-input
                name="lastName"
                label="${props.lastNameLabel}"
                .value="${props.lastName}"
                ?disabled="${props.loading}"
                @sl-input="${(event: Event) => props.setLastName(getValue(event))}"
              ></sl-input>
            </div>
          `
        : ''}
      <sl-input
        name="email"
        type="email"
        label="${props.emailLabel}"
        .value="${props.email}"
        ?disabled="${props.loading}"
        @sl-input="${(event: Event) => props.setEmail(getValue(event))}"
      ></sl-input>
      <sl-input
        name="password"
        type="password"
        label="${props.passwordLabel}"
        help-text="Minimum ${props.passwordMinLength} characters"
        .value="${props.password}"
        ?disabled="${props.loading}"
        @sl-input="${(event: Event) => props.setPassword(getValue(event))}"
      ></sl-input>
      ${props.showConfirmPassword
        ? html`
            <sl-input
              name="confirmPassword"
              type="password"
              label="${props.confirmPasswordLabel}"
              .value="${props.confirmPassword}"
              ?disabled="${props.loading}"
              @sl-input="${(event: Event) => props.setConfirmPassword(getValue(event))}"
            ></sl-input>
          `
        : ''}
      ${props.termsText
        ? html`
            <sl-checkbox
              ?checked="${props.termsAccepted}"
              ?disabled="${props.loading}"
              @sl-change="${(event: Event) => props.setTermsAccepted(getChecked(event))}"
            >
              <span class="terms-copy">
                <span>${props.termsText}</span>
                ${props.termsUrl
                  ? html`<a href="${props.termsUrl}" target="_blank" rel="noopener noreferrer"
                      >View terms</a
                    >`
                  : ''}
              </span>
            </sl-checkbox>
          `
        : ''}
      ${props.error ? html`<p class="error-text">${props.error}</p>` : ''}
      <sl-button type="submit" variant="primary" ?disabled="${props.loading}">
        ${props.loading
          ? html`<sl-spinner slot="prefix" style="font-size: 1rem;"></sl-spinner>`
          : ''}
        ${props.submitLabel}
      </sl-button>
    </form>
  `;
}
