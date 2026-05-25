import { html } from 'lit';
import { NameFieldsProps } from './NameFields';
import { useNameFields } from './useNameFields';

const styles = `
  :host {
    display: block;
  }

  .name-fields {
    display: flex;
    gap: var(--sl-spacing-medium);
  }

  .field {
    flex: 1;
  }

  sl-input {
    width: 100%;
  }
`;

export function NameFieldsView(props: NameFieldsProps & ReturnType<typeof useNameFields>) {
  return html`
    <style>
      ${styles}
    </style>
    <div
      class="name-fields"
      style="flex-direction: ${props.layout === 'vertical' ? 'column' : 'row'};"
    >
      <div class="field">
        <sl-input
          label="${props.firstNameLabel}"
          name="firstName"
          placeholder="${props.firstNamePlaceholder || ''}"
          ?required="${props.fieldRequired}"
          ?disabled="${props.fieldDisabled}"
          size="${props.fieldSize}"
          value="${props.firstName}"
          @sl-input="${props.onFirstNameInput}"
        >
          ${props.firstNameError
            ? html`<span slot="help-text" style="color: var(--sl-color-danger-600)">${props.firstNameError}</span>`
            : ''}
        </sl-input>
      </div>
      <div class="field">
        <sl-input
          label="${props.lastNameLabel}"
          name="lastName"
          placeholder="${props.lastNamePlaceholder || ''}"
          ?required="${props.fieldRequired}"
          ?disabled="${props.fieldDisabled}"
          size="${props.fieldSize}"
          value="${props.lastName}"
          @sl-input="${props.onLastNameInput}"
        >
          ${props.lastNameError
            ? html`<span slot="help-text" style="color: var(--sl-color-danger-600)">${props.lastNameError}</span>`
            : ''}
        </sl-input>
      </div>
    </div>
  `;
}
