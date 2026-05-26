import { html } from 'lit';
import { UI } from '../../ui';
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
        ${UI.Input({
          label: props.firstNameLabel,
          name: 'firstName',
          placeholder: props.firstNamePlaceholder || '',
          required: props.fieldRequired,
          disabled: props.fieldDisabled,
          size: props.fieldSize,
          value: props.firstName,
          onInput: props.onFirstNameInput,
          error: props.firstNameError,
        })}
      </div>
      <div class="field">
        ${UI.Input({
          label: props.lastNameLabel,
          name: 'lastName',
          placeholder: props.lastNamePlaceholder || '',
          required: props.fieldRequired,
          disabled: props.fieldDisabled,
          size: props.fieldSize,
          value: props.lastName,
          onInput: props.onLastNameInput,
          error: props.lastNameError,
        })}
      </div>
    </div>
  `;
}
