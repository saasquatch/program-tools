import { html } from 'lit';
import type { PortalVerifyEmailProps } from './PortalVerifyEmail';
import { usePortalVerifyEmail } from './usePortalVerifyEmail';

export function PortalVerifyEmailView(
  props: PortalVerifyEmailProps & ReturnType<typeof usePortalVerifyEmail>
) {
  return html`
    <style>
      :host {
        display: block;
      }

      .verify-container {
        text-align: center;
        padding: var(--sl-spacing-x-large);
      }
    </style>
    <div class="verify-container" part="sqm-base">
      ${props.status === 'verifying'
        ? html`<sl-spinner style="font-size: 2rem;"></sl-spinner>
            <p>${props.verifyingText}</p>`
        : props.status === 'success'
          ? html`<sl-icon
                name="check-circle"
                style="font-size: 3rem; color: var(--sl-color-success-600);"
              ></sl-icon>
              <p>${props.successText}</p>`
          : html`<sl-icon
                name="exclamation-circle"
                style="font-size: 3rem; color: var(--sl-color-danger-600);"
              ></sl-icon>
              <p>${props.errorText}</p>`}
    </div>
  `;
}
