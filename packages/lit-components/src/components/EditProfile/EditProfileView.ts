import { html } from 'lit';
import { UI } from '../../ui';
import type { EditProfileProps } from './EditProfile';
import { useEditProfile } from './useEditProfile';

export function EditProfileView(props: EditProfileProps & ReturnType<typeof useEditProfile>) {
  return html`
    <style>
      :host {
        display: block;
      }

      .edit-profile {
        display: flex;
        flex-direction: column;
        gap: var(--sl-spacing-medium);
        max-width: 500px;
      }

      .profile-header {
        font-size: var(--sl-font-size-x-large);
        font-weight: var(--sl-font-weight-semibold);
        margin: 0;
      }
    </style>
    <div class="edit-profile" part="sqm-base">
      <h2 class="profile-header">${props.headerText}</h2>
      ${props.success ? html`${UI.Alert({ variant: 'success', open: true, children: props.successMessage })}` : ''}
      ${props.error ? html`${UI.Alert({ variant: 'danger', open: true, children: props.error })}` : ''}
      ${props.loading
        ? html`${UI.Spinner({})}`
        : html`
            <form @submit="${props.onSubmit}">
              <div
                style="display: flex; gap: var(--sl-spacing-medium); margin-bottom: var(--sl-spacing-medium);"
              >
                ${UI.Input({
                  label: props.firstNameLabel,
                  value: props.firstName,
                  onInput: (e: Event) => props.setFirstName((e.target as HTMLInputElement).value),
                  style: 'flex: 1;',
                })}
                ${UI.Input({
                  label: props.lastNameLabel,
                  value: props.lastName,
                  onInput: (e: Event) => props.setLastName((e.target as HTMLInputElement).value),
                  style: 'flex: 1;',
                })}
              </div>
              ${UI.Input({ label: 'Email', value: props.email, disabled: true })}
              <slot></slot>
              ${UI.Button({
                type: 'submit',
                variant: 'primary',
                loading: props.saving,
                style: 'margin-top: var(--sl-spacing-medium);',
                children: props.submitLabel,
              })}
            </form>
          `}
    </div>
  `;
}
