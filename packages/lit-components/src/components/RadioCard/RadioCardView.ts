import { html } from 'lit';
import { UI } from '../../ui';
import { RadioCardProps } from './RadioCard';
import { useRadioCard } from './useRadioCard';

const styles = `
  :host {
    display: block;
  }

  .radio-card {
    display: flex;
    align-items: center;
    gap: var(--sl-spacing-medium);
    padding: var(--sl-spacing-medium);
    border: 2px solid var(--sl-color-neutral-200);
    border-radius: var(--sl-border-radius-medium);
    cursor: pointer;
    transition: border-color 0.2s;
  }

  .radio-card:hover {
    border-color: var(--sl-color-primary-300);
  }

  .radio-card.selected {
    border-color: var(--sl-color-primary-600);
    background: var(--sl-color-primary-50);
  }

  .radio-card.disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .radio-card input[type='radio'] {
    display: none;
  }

  .radio-card-content {
    display: flex;
    flex-direction: column;
    gap: var(--sl-spacing-2x-small);
  }

  .radio-card-label {
    font-weight: var(--sl-font-weight-semibold);
  }

  .radio-card-description {
    font-size: var(--sl-font-size-small);
    color: var(--sl-color-neutral-500);
  }
`;

export function RadioCardView(props: RadioCardProps & ReturnType<typeof useRadioCard>) {
  return html`
    <style>
      ${styles}
    </style>
    <div
      class="radio-card ${props.fieldChecked ? 'selected' : ''} ${props.fieldDisabled ? 'disabled' : ''}"
      @click="${() => !props.fieldDisabled && props.onClick?.()}"
    >
      <input
        type="radio"
        name="${props.fieldName}"
        value="${props.fieldValue}"
        ?checked="${props.fieldChecked}"
        ?disabled="${props.fieldDisabled}"
      />
      ${props.icon ? html`${UI.Icon({ name: props.icon })}` : ''}
      <div class="radio-card-content">
        <span class="radio-card-label">${props.fieldLabel || ''}</span>
        ${props.fieldDescription
          ? html`<span class="radio-card-description">${props.fieldDescription}</span>`
          : ''}
      </div>
    </div>
  `;
}
