import { html } from 'lit';
import type { WidgetVerificationProps } from './WidgetVerification';
import { useWidgetVerification } from './useWidgetVerification';

export function WidgetVerificationView(
  props: WidgetVerificationProps & ReturnType<typeof useWidgetVerification>
) {
  return html`
    <style>
      :host {
        display: block;
      }

      .verification-container {
        text-align: center;
        padding: var(--sl-spacing-large);
        max-width: 400px;
        margin: 0 auto;
      }

      .verification-header {
        font-size: var(--sl-font-size-large);
        font-weight: var(--sl-font-weight-semibold);
        margin-bottom: var(--sl-spacing-small);
      }

      .verification-description {
        color: var(--sl-color-neutral-600);
        margin-bottom: var(--sl-spacing-large);
      }
    </style>
    <div class="verification-container" part="sqm-base">
      ${props.step === 'success'
        ? html`
            <sl-icon
              name="check-circle"
              style="font-size: 3rem; color: var(--sl-color-success-600);"
            ></sl-icon>
            <p>Verified successfully!</p>
            <slot></slot>
          `
        : props.step === 'verifying'
          ? html`
              <sl-spinner style="font-size: 2rem;"></sl-spinner>
              <p>Verifying...</p>
            `
          : html`
              <h3 class="verification-header">${props.headerText}</h3>
              ${props.descriptionText
                ? html`<p class="verification-description">${props.descriptionText}</p>`
                : ''}
              <slot name="verification-form"></slot>
            `}
    </div>
  `;
}
