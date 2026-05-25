import { html } from 'lit';
import { ProgramExplainerStepProps } from './ProgramExplainerStep';

export function ProgramExplainerStepView(props: ProgramExplainerStepProps) {
  return html`
    <style>
      :host {
        display: block;
        flex: 1;
        min-width: 200px;
        max-width: 300px;
      }

      .step {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        gap: var(--sl-spacing-small);
      }

      .step-icon {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: var(--sl-color-primary-50);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.5rem;
        color: ${props.iconColor};
      }

      .step-number {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background: var(--sl-color-primary-600);
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: var(--sl-font-weight-bold);
        font-size: var(--sl-font-size-small);
      }

      .step-title {
        font-weight: var(--sl-font-weight-semibold);
        font-size: var(--sl-font-size-medium);
      }

      .step-description {
        font-size: var(--sl-font-size-small);
        color: var(--sl-color-neutral-600);
      }
    </style>
    <div class="step" part="sqm-base">
      ${props.icon
        ? html`<div class="step-icon"><sl-icon name="${props.icon}"></sl-icon></div>`
        : props.stepNumber !== undefined
          ? html`<div class="step-number">${props.stepNumber}</div>`
          : null}
      <div class="step-title">${props.stepTitle}</div>
      ${props.stepDescription
        ? html`<div class="step-description">${props.stepDescription}</div>`
        : null}
      <slot></slot>
    </div>
  `;
}
