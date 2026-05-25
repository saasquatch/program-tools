import { html } from 'lit';
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
            <sl-icon
              name="check-circle"
              style="font-size: 3rem; color: var(--sl-color-success-600);"
            ></sl-icon>
            <p>${props.successMessage}</p>
          `
        : html`
            <h3>${props.headerText}</h3>
            ${props.error ? html`<sl-alert variant="danger" open>${props.error}</sl-alert>` : ''}
            <form @submit="${props.onSubmit}">
              <sl-input
                type="email"
                label="${props.emailLabel}"
                placeholder="${props.emailPlaceholder}"
                value="${props.email}"
                @sl-input="${(e: Event) => props.setEmail((e.target as HTMLInputElement).value)}"
                required
              ></sl-input>
              <slot></slot>
              <sl-button
                type="submit"
                variant="primary"
                ?loading="${props.loading}"
                style="width: 100%; margin-top: var(--sl-spacing-small);"
              >
                ${props.submitLabel}
              </sl-button>
            </form>
          `}
    </div>
  `;
}
