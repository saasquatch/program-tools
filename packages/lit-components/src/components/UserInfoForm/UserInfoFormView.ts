import { html } from 'lit';
import { UI } from '../../ui';
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
      ${props.error ? html`${UI.Alert({ variant: 'danger', open: true, children: props.error })}` : ''}
      <form @submit="${props.onSubmit}">
        <div class="name-row">
          ${UI.Input({
            label: props.firstNameLabel,
            value: props.firstName,
            onInput: (event: Event) => props.setFirstName(getInputValue(event)),
            disabled: props.loading,
          })}
          ${UI.Input({
            label: props.lastNameLabel,
            value: props.lastName,
            onInput: (event: Event) => props.setLastName(getInputValue(event)),
            disabled: props.loading,
          })}
        </div>
        ${UI.Input({
          label: props.emailLabel,
          type: 'email',
          value: props.email,
          onInput: (event: Event) => props.setEmail(getInputValue(event)),
          disabled: props.loading,
        })}
        ${UI.Input({
          label: props.phoneLabel,
          value: props.phone,
          onInput: (event: Event) => props.setPhone(getInputValue(event)),
          disabled: props.loading,
        })}
        ${UI.Input({
          label: props.countryLabel,
          value: props.country,
          onInput: (event: Event) => props.setCountry(getInputValue(event)),
          disabled: props.loading,
        })}
        ${UI.Button({ type: 'submit', variant: 'primary', loading: props.loading, children: props.submitLabel })}
      </form>
    </div>
  `;
}
