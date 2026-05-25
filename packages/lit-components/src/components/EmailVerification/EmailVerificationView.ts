import { html } from 'lit';
import type { EmailVerificationProps } from './EmailVerification';
import { useEmailVerification } from './useEmailVerification';

export function EmailVerificationView(
  props: EmailVerificationProps & ReturnType<typeof useEmailVerification>
) {
  return html`
    <style>
      :host {
        display: block;
      }

      .email-verify {
        text-align: center;
        padding: var(--sl-spacing-large);
        max-width: 400px;
        margin: 0 auto;
      }

      .resend-link {
        cursor: pointer;
        color: var(--sl-color-primary-600);
        background: none;
        border: none;
        margin-top: var(--sl-spacing-medium);
      }
    </style>
    <div class="email-verify" part="sqm-base">
      <sl-icon
        name="envelope"
        style="font-size: 3rem; color: var(--sl-color-primary-600); margin-bottom: var(--sl-spacing-medium);"
      ></sl-icon>
      <h3>${props.headerText}</h3>
      <p style="color: var(--sl-color-neutral-600);">${props.descriptionText}</p>
      ${props.resent ? html`<sl-alert variant="success" open>Email resent!</sl-alert>` : ''}
      <button class="resend-link" @click="${props.onResend}" ?disabled="${props.loading}">
        ${props.resendLabel}
      </button>
    </div>
  `;
}
