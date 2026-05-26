import { html } from 'lit';
import { ProgramExplainerProps } from './ProgramExplainer';

export function ProgramExplainerView(props: ProgramExplainerProps) {
  return html`
    <style>
      :host {
        display: block;
      }

      .explainer {
        text-align: center;
        padding: var(--sl-spacing-large);
      }

      .explainer-header {
        font-size: var(--sl-font-size-x-large);
        font-weight: var(--sl-font-weight-semibold);
        margin-bottom: var(--sl-spacing-x-small);
      }

      .explainer-description {
        font-size: var(--sl-font-size-medium);
        color: var(--sl-color-neutral-600);
        margin-bottom: var(--sl-spacing-large);
      }

      .steps {
        display: flex;
        flex-direction: ${props.layout === 'vertical' ? 'column' : 'row'};
        gap: var(--sl-spacing-large);
        justify-content: center;
        align-items: flex-start;
        flex-wrap: wrap;
      }
    </style>
    <div class="explainer" part="sqm-base">
      ${props.header ? html`<h2 class="explainer-header">${props.header}</h2>` : null}
      ${props.description
        ? html`<p class="explainer-description">${props.description}</p>`
        : null}
      <div class="steps">
        <slot></slot>
      </div>
    </div>
  `;
}
