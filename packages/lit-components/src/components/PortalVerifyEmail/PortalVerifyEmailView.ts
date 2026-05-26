import { html } from 'lit';
import { UI } from '../../ui';
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
        ? html`${UI.Spinner({ style: 'font-size: 2rem;' })}
            <p>${props.verifyingText}</p>`
        : props.status === 'success'
          ? html`${UI.Icon({ name: 'check-circle', style: 'font-size: 3rem; color: var(--sl-color-success-600);' })}
              <p>${props.successText}</p>`
          : html`${UI.Icon({ name: 'exclamation-circle', style: 'font-size: 3rem; color: var(--sl-color-danger-600);' })}
              <p>${props.errorText}</p>`}
    </div>
  `;
}
