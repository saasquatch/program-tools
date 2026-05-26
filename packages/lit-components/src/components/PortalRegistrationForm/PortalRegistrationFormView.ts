import { html } from 'lit';
import { UI } from '../../ui';
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
              ${UI.Input({ name: 'firstName', label: props.firstNameLabel, value: props.firstName, disabled: props.loading, onInput: (event: Event) => props.setFirstName(getValue(event)) })}
              ${UI.Input({ name: 'lastName', label: props.lastNameLabel, value: props.lastName, disabled: props.loading, onInput: (event: Event) => props.setLastName(getValue(event)) })}
            </div>
          `
        : ''}
      ${UI.Input({ name: 'email', type: 'email', label: props.emailLabel, value: props.email, disabled: props.loading, onInput: (event: Event) => props.setEmail(getValue(event)) })}
      ${UI.Input({ name: 'password', type: 'password', label: props.passwordLabel, helpText: `Minimum ${props.passwordMinLength} characters`, value: props.password, disabled: props.loading, onInput: (event: Event) => props.setPassword(getValue(event)) })}
      ${props.showConfirmPassword
        ? html`
            ${UI.Input({ name: 'confirmPassword', type: 'password', label: props.confirmPasswordLabel, value: props.confirmPassword, disabled: props.loading, onInput: (event: Event) => props.setConfirmPassword(getValue(event)) })}
          `
        : ''}
      ${props.termsText
        ? html`
            ${UI.Checkbox({
              checked: props.termsAccepted,
              disabled: props.loading,
              onChange: (event: Event) => props.setTermsAccepted(getChecked(event)),
              children: html`<span class="terms-copy">
                <span>${props.termsText}</span>
                ${props.termsUrl
                  ? html`<a href="${props.termsUrl}" target="_blank" rel="noopener noreferrer">View terms</a>`
                  : ''}
              </span>`,
            })}
          `
        : ''}
      ${props.error ? html`<p class="error-text">${props.error}</p>` : ''}
      ${UI.Button({
        type: 'submit',
        variant: 'primary',
        disabled: props.loading,
        prefix: props.loading ? UI.Spinner({ style: 'font-size: 1rem;' }) : undefined,
        children: props.submitLabel,
      })}
    </form>
  `;
}
