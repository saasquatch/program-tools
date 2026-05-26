import { html } from 'lit';
import { UI } from '../../ui';
import { PasswordFieldProps } from './PasswordField';
import { usePasswordField } from './usePasswordField';

const styles = `
  :host {
    display: block;
  }

  sl-input {
    width: 100%;
  }
`;

export function PasswordFieldView(
  props: PasswordFieldProps & ReturnType<typeof usePasswordField>
) {
  return html`
    <style>
      ${styles}
    </style>
    ${UI.Input({
      label: props.fieldLabel,
      name: props.fieldName,
      type: 'password',
      placeholder: props.fieldPlaceholder || '',
      required: props.fieldRequired,
      disabled: props.fieldDisabled,
      passwordToggle: props.showToggle,
      size: props.fieldSize,
      minLength: props.fieldMinLength,
      maxLength: props.fieldMaxLength,
      value: props.value,
      onInput: props.onInput,
      onBlur: props.onBlur,
      error: props.error,
      helpText: props.fieldHelpText,
    })}
  `;
}
