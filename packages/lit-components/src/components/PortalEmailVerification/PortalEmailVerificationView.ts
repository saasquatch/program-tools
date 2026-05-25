import { html } from 'lit';
import type { PortalEmailVerificationProps } from './PortalEmailVerification';
import { usePortalEmailVerification } from './usePortalEmailVerification';

const styles = `
  :host {
    display: block;
  }

  .verification-container {
    display: flex;
    flex-direction: column;
    gap: var(--sl-spacing-medium);
    align-items: center;
    text-align: center;
    padding: var(--sl-spacing-x-large);
  }

  h2,
  p {
    margin: 0;
  }

  .success-icon {
    font-size: 3rem;
    color: var(--sl-color-success-600);
  }

  .notice {
    color: var(--sl-color-success-700);
  }
`;

export function PortalEmailVerificationView(
  props: PortalEmailVerificationProps & ReturnType<typeof usePortalEmailVerification>
) {
  const isVerified = props.verified || Boolean(props.token);

  return html`
    <style>
      ${styles}
    </style>
    <div class="verification-container" part="sqm-base">
      <h2>${props.headerText}</h2>
      ${isVerified
        ? html`
            <sl-icon class="success-icon" name="check-circle"></sl-icon>
            <p>${props.successText}</p>
          `
        : html`
            <p>${props.descriptionText}</p>
            ${props.resent ? html`<p class="notice">Verification email resent.</p>` : ''}
            <sl-button ?disabled="${props.loading}" @click="${() => props.onResend()}">
              ${props.loading
                ? html`<sl-spinner slot="prefix" style="font-size: 1rem;"></sl-spinner>`
                : ''}
              ${props.resendText}
            </sl-button>
          `}
    </div>
  `;
}
