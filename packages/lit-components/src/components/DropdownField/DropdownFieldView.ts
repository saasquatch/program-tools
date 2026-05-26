import { html } from 'lit';
import { UI } from '../../ui';
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
    ${UI.Select({
      label: props.fieldLabel,
      name: props.fieldName,
      placeholder: props.fieldPlaceholder,
      required: props.fieldRequired,
      disabled: props.fieldDisabled,
      size: props.fieldSize,
      value: props.value,
      onChange: props.onChange,
      error: props.error,
      helpText: props.fieldHelpText,
      children: html`${props.options.map(
        (opt) => html`${UI.Option({ value: opt.value, children: opt.label })}`
      )}`,
    })}
  `;
}
