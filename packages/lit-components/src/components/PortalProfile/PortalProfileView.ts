import { html } from 'lit';
import { UI } from '../../ui';
import { PortalProfileProps } from './PortalProfile';
import { usePortalProfile } from './usePortalProfile';

const getInputValue = (event: Event) => ((event.target as HTMLInputElement & { value: string })?.value ?? '');

export function PortalProfileView(props: PortalProfileProps & ReturnType<typeof usePortalProfile>) {
  return html`
    <style>
      :host {
        display: block;
      }

      .profile-container {
        display: flex;
        flex-direction: column;
        gap: var(--sl-spacing-medium);
        max-width: 480px;
        margin: 0 auto;
      }

      .profile-header {
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

      .name-row {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: var(--sl-spacing-medium);
      }
    </style>
    <div class="profile-container" part="sqm-base">
      <h2 class="profile-header">${props.headerText}</h2>
      ${props.loading ? html`${UI.Alert({ variant: 'primary', open: true, children: 'Loading profile...' })}` : ''}
      ${props.error ? html`${UI.Alert({ variant: 'danger', open: true, children: props.error })}` : ''}
      ${props.success ? html`${UI.Alert({ variant: 'success', open: true, children: 'Profile updated successfully.' })}` : ''}
      <form @submit="${props.onSubmit}">
        <div class="name-row">
          ${UI.Input({ label: props.firstNameLabel, value: props.firstName, onInput: (event: Event) => props.setFirstName(getInputValue(event)), disabled: props.loading || props.saving })}
          ${UI.Input({ label: props.lastNameLabel, value: props.lastName, onInput: (event: Event) => props.setLastName(getInputValue(event)), disabled: props.loading || props.saving })}
        </div>
        ${UI.Input({ label: props.emailLabel, type: 'email', value: props.email, onInput: (event: Event) => props.setEmail(getInputValue(event)), disabled: props.loading || props.saving })}
        ${props.showCountry
          ? html`${UI.Input({ label: props.countryLabel, value: props.country, onInput: (event: Event) => props.setCountry(getInputValue(event)), disabled: props.loading || props.saving })}`
          : ''}
        ${UI.Button({ type: 'submit', variant: 'primary', loading: props.saving, disabled: props.loading, children: props.submitLabel })}
      </form>
    </div>
  `;
}
