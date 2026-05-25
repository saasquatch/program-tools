import { html } from 'lit';
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
    <sl-input
      label="${props.fieldLabel}"
      name="${props.fieldName}"
      type="${props.fieldType}"
      placeholder="${props.fieldPlaceholder || ''}"
      ?required="${props.fieldRequired}"
      ?disabled="${props.fieldDisabled}"
      size="${props.fieldSize}"
      minlength="${props.fieldMinLength ?? ''}"
      maxlength="${props.fieldMaxLength ?? ''}"
      pattern="${props.fieldPattern || ''}"
      value="${props.value}"
      @sl-input="${props.onInput}"
      @sl-blur="${props.onBlur}"
    >
      ${props.error
        ? html`<span slot="help-text" style="color: var(--sl-color-danger-600)">${props.error}</span>`
        : props.fieldHelpText
          ? html`<span slot="help-text">${props.fieldHelpText}</span>`
          : ''}
    </sl-input>
  `;
}
