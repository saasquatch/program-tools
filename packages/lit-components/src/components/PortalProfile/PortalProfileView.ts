import { html } from 'lit';
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
      ${props.loading ? html`<sl-alert variant="primary" open>Loading profile...</sl-alert>` : ''}
      ${props.error ? html`<sl-alert variant="danger" open>${props.error}</sl-alert>` : ''}
      ${props.success ? html`<sl-alert variant="success" open>Profile updated successfully.</sl-alert>` : ''}
      <form @submit="${props.onSubmit}">
        <div class="name-row">
          <sl-input
            label="${props.firstNameLabel}"
            value="${props.firstName}"
            @sl-input="${(event: Event) => props.setFirstName(getInputValue(event))}"
            ?disabled="${props.loading || props.saving}"
          ></sl-input>
          <sl-input
            label="${props.lastNameLabel}"
            value="${props.lastName}"
            @sl-input="${(event: Event) => props.setLastName(getInputValue(event))}"
            ?disabled="${props.loading || props.saving}"
          ></sl-input>
        </div>
        <sl-input
          label="${props.emailLabel}"
          type="email"
          value="${props.email}"
          @sl-input="${(event: Event) => props.setEmail(getInputValue(event))}"
          ?disabled="${props.loading || props.saving}"
        ></sl-input>
        ${props.showCountry
          ? html`<sl-input
              label="${props.countryLabel}"
              value="${props.country}"
              @sl-input="${(event: Event) => props.setCountry(getInputValue(event))}"
              ?disabled="${props.loading || props.saving}"
            ></sl-input>`
          : ''}
        <sl-button type="submit" variant="primary" ?loading="${props.saving}" ?disabled="${props.loading}">
          ${props.submitLabel}
        </sl-button>
      </form>
    </div>
  `;
}
