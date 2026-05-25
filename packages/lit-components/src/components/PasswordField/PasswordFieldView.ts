import { html } from 'lit';
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
    <sl-input
      label="${props.fieldLabel}"
      name="${props.fieldName}"
      type="password"
      placeholder="${props.fieldPlaceholder || ''}"
      ?required="${props.fieldRequired}"
      ?disabled="${props.fieldDisabled}"
      ?password-toggle="${props.showToggle}"
      size="${props.fieldSize}"
      minlength="${props.fieldMinLength}"
      maxlength="${props.fieldMaxLength ?? ''}"
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
