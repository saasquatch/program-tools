import { html } from 'lit';
import { UI } from '../../ui';
import { CheckboxFieldProps } from './CheckboxField';
import { useCheckboxField } from './useCheckboxField';

const styles = `
  :host {
    display: block;
  }

  .checkbox-container {
    display: flex;
    flex-direction: column;
    gap: var(--sl-spacing-2x-small);
  }

  .error-text,
  .help-text {
    margin: 0;
    font-size: var(--sl-font-size-small);
  }

  .error-text {
    color: var(--sl-color-danger-600);
  }

  .help-text {
    color: var(--sl-color-neutral-600);
  }
`;

export function CheckboxFieldView(
  props: CheckboxFieldProps & ReturnType<typeof useCheckboxField>
) {
  return html`
    <style>
      ${styles}
    </style>
    <div class="checkbox-container">
      ${UI.Checkbox({
        name: props.fieldName,
        required: props.fieldRequired,
        disabled: props.fieldDisabled,
        checked: props.checked,
        size: props.fieldSize,
        onChange: props.onChange,
        children: props.fieldLabel,
      })}
      ${props.error ? html`<p class="error-text">${props.error}</p>` : ''}
      ${props.fieldHelpText ? html`<p class="help-text">${props.fieldHelpText}</p>` : ''}
    </div>
  `;
}
