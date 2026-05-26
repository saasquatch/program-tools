import { html } from 'lit';
import { UI } from '../../ui';
import { InputFieldProps } from './InputField';
import { useInputField } from './useInputField';

const styles = `
  :host {
    display: block;
  }

  sl-input {
    width: 100%;
  }
`;

export function InputFieldView(props: InputFieldProps & ReturnType<typeof useInputField>) {
  return html`
    <style>
      ${styles}
    </style>
    ${UI.Input({
      label: props.fieldLabel,
      name: props.fieldName,
      type: props.fieldType,
      placeholder: props.fieldPlaceholder || '',
      required: props.fieldRequired,
      disabled: props.fieldDisabled,
      size: props.fieldSize,
      minLength: props.fieldMinLength,
      maxLength: props.fieldMaxLength,
      pattern: props.fieldPattern || '',
      value: props.value,
      onInput: props.onInput,
      onBlur: props.onBlur,
      error: props.error,
      helpText: props.fieldHelpText,
    })}
  `;
}
