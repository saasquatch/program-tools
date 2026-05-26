import { html } from 'lit';
import { UI } from '../../ui';
import type { InstantAccessRegistrationProps } from './InstantAccessRegistration';
import { useInstantAccessRegistration } from './useInstantAccessRegistration';

export function InstantAccessRegistrationView(
  props: InstantAccessRegistrationProps & ReturnType<typeof useInstantAccessRegistration>
) {
  return html`
    <style>
      :host {
        display: block;
      }

      .instant-access {
        display: flex;
        flex-direction: column;
        gap: var(--sl-spacing-medium);
        max-width: 400px;
        text-align: center;
        margin: 0 auto;
      }
    </style>
    <div class="instant-access" part="sqm-base">
      ${props.success
        ? html`
            ${UI.Icon({
              name: 'check-circle',
              style: 'font-size: 3rem; color: var(--sl-color-success-600);',
            })}
            <p>${props.successMessage}</p>
          `
        : html`
            <h3>${props.headerText}</h3>
            ${props.error ? html`${UI.Alert({ variant: 'danger', open: true, children: props.error })}` : ''}
            <form @submit="${props.onSubmit}">
              ${UI.Input({
                type: 'email',
                label: props.emailLabel,
                placeholder: props.emailPlaceholder,
                value: props.email,
                onInput: (e: Event) => props.setEmail((e.target as HTMLInputElement).value),
                required: true,
              })}
              <slot></slot>
              ${UI.Button({
                type: 'submit',
                variant: 'primary',
                loading: props.loading,
                style: 'width: 100%; margin-top: var(--sl-spacing-small);',
                children: props.submitLabel,
              })}
            </form>
          `}
    </div>
  `;
}
