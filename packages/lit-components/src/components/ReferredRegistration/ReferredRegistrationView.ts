import { html } from 'lit';
import type { ReferredRegistrationProps } from './ReferredRegistration';

export function ReferredRegistrationView(props: ReferredRegistrationProps) {
  return html`
    <style>
      :host {
        display: block;
      }

      .referred-reg {
        display: flex;
        flex-direction: column;
        gap: var(--sl-spacing-medium);
        max-width: 500px;
        margin: 0 auto;
      }

      .referred-header {
        text-align: center;
      }

      .referred-title {
        font-size: var(--sl-font-size-x-large);
        font-weight: var(--sl-font-weight-semibold);
        margin: 0;
      }

      .referred-description {
        color: var(--sl-color-neutral-600);
        margin-top: var(--sl-spacing-x-small);
      }
    </style>
    <div class="referred-reg" part="sqm-base">
      <div class="referred-header">
        <h2 class="referred-title">${props.headerText}</h2>
        ${props.descriptionText
          ? html`<p class="referred-description">${props.descriptionText}</p>`
          : ''}
      </div>
      <slot></slot>
    </div>
  `;
}
