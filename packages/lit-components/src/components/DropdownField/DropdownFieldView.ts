import { html } from 'lit';
import { DropdownFieldProps } from './DropdownField';
import { useDropdownField } from './useDropdownField';

const styles = `
  :host {
    display: block;
  }

  sl-select {
    width: 100%;
  }
`;

export function DropdownFieldView(
  props: DropdownFieldProps & ReturnType<typeof useDropdownField>
) {
  return html`
    <style>
      ${styles}
    </style>
    <sl-select
      label="${props.fieldLabel}"
      name="${props.fieldName}"
      placeholder="${props.fieldPlaceholder}"
      ?required="${props.fieldRequired}"
      ?disabled="${props.fieldDisabled}"
      size="${props.fieldSize}"
      value="${props.value}"
      @sl-change="${props.onChange}"
    >
      ${props.options.map(
        (opt) => html`<sl-option value="${opt.value}">${opt.label}</sl-option>`
      )}
      ${props.error
        ? html`<span slot="help-text" style="color: var(--sl-color-danger-600)">${props.error}</span>`
        : props.fieldHelpText
          ? html`<span slot="help-text">${props.fieldHelpText}</span>`
          : ''}
    </sl-select>
  `;
}
