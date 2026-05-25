import { html } from 'lit';
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
      ${props.success ? html`<sl-alert variant="success" open>${props.successMessage}</sl-alert>` : ''}
      ${props.error ? html`<sl-alert variant="danger" open>${props.error}</sl-alert>` : ''}
      ${props.loading
        ? html`<sl-spinner></sl-spinner>`
        : html`
            <form @submit="${props.onSubmit}">
              <div
                style="display: flex; gap: var(--sl-spacing-medium); margin-bottom: var(--sl-spacing-medium);"
              >
                <sl-input
                  label="${props.firstNameLabel}"
                  value="${props.firstName}"
                  @sl-input="${(e: Event) =>
                    props.setFirstName((e.target as HTMLInputElement).value)}"
                  style="flex: 1;"
                ></sl-input>
                <sl-input
                  label="${props.lastNameLabel}"
                  value="${props.lastName}"
                  @sl-input="${(e: Event) =>
                    props.setLastName((e.target as HTMLInputElement).value)}"
                  style="flex: 1;"
                ></sl-input>
              </div>
              <sl-input label="Email" value="${props.email}" disabled></sl-input>
              <slot></slot>
              <sl-button
                type="submit"
                variant="primary"
                ?loading="${props.saving}"
                style="margin-top: var(--sl-spacing-medium);"
              >
                ${props.submitLabel}
              </sl-button>
            </form>
          `}
    </div>
  `;
}
