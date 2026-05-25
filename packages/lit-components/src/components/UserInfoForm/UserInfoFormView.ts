import { html } from 'lit';
import { UserInfoFormProps } from './UserInfoForm';
import { useUserInfoForm } from './useUserInfoForm';

const getInputValue = (event: Event) => ((event.target as HTMLInputElement & { value: string })?.value ?? '');

export function UserInfoFormView(props: UserInfoFormProps & ReturnType<typeof useUserInfoForm>) {
  return html`
    <style>
      :host {
        display: block;
      }

      .user-info-form {
        display: flex;
        flex-direction: column;
        gap: var(--sl-spacing-medium);
        max-width: 480px;
      }

      .form-header {
        margin: 0;
        font-size: var(--sl-font-size-large);
        font-weight: var(--sl-font-weight-semibold);
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
    <div class="user-info-form" part="sqm-base">
      <h3 class="form-header">${props.headerText}</h3>
      ${props.error ? html`<sl-alert variant="danger" open>${props.error}</sl-alert>` : ''}
      <form @submit="${props.onSubmit}">
        <div class="name-row">
          <sl-input
            label="${props.firstNameLabel}"
            value="${props.firstName}"
            @sl-input="${(event: Event) => props.setFirstName(getInputValue(event))}"
            ?disabled="${props.loading}"
          ></sl-input>
          <sl-input
            label="${props.lastNameLabel}"
            value="${props.lastName}"
            @sl-input="${(event: Event) => props.setLastName(getInputValue(event))}"
            ?disabled="${props.loading}"
          ></sl-input>
        </div>
        <sl-input
          label="${props.emailLabel}"
          type="email"
          value="${props.email}"
          @sl-input="${(event: Event) => props.setEmail(getInputValue(event))}"
          ?disabled="${props.loading}"
        ></sl-input>
        <sl-input
          label="${props.phoneLabel}"
          value="${props.phone}"
          @sl-input="${(event: Event) => props.setPhone(getInputValue(event))}"
          ?disabled="${props.loading}"
        ></sl-input>
        <sl-input
          label="${props.countryLabel}"
          value="${props.country}"
          @sl-input="${(event: Event) => props.setCountry(getInputValue(event))}"
          ?disabled="${props.loading}"
        ></sl-input>
        <sl-button type="submit" variant="primary" ?loading="${props.loading}">${props.submitLabel}</sl-button>
      </form>
    </div>
  `;
}
