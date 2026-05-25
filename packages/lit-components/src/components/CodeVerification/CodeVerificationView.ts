import { html } from 'lit';
import type { CodeVerificationProps } from './CodeVerification';
import { useCodeVerification } from './useCodeVerification';

export function CodeVerificationView(
  props: CodeVerificationProps & ReturnType<typeof useCodeVerification>
) {
  return html`
    <style>
      :host {
        display: block;
      }

      .code-container {
        display: flex;
        flex-direction: column;
        gap: var(--sl-spacing-medium);
        max-width: 400px;
        margin: 0 auto;
        text-align: center;
      }

      .resend-link {
        cursor: pointer;
        color: var(--sl-color-primary-600);
        background: none;
        border: none;
        font-size: var(--sl-font-size-small);
      }
    </style>
    <div class="code-container" part="sqm-base">
      <h3>${props.headerText}</h3>
      <p style="color: var(--sl-color-neutral-600); font-size: var(--sl-font-size-small);">
        ${props.descriptionText}
      </p>
      ${props.error ? html`<sl-alert variant="danger" open>${props.error}</sl-alert>` : ''}
      ${props.resent ? html`<sl-alert variant="success" open>Code resent!</sl-alert>` : ''}
      <form @submit="${props.onSubmit}">
        <sl-input
          placeholder="Enter code"
          value="${props.code}"
          @sl-input="${(e: Event) => props.setCode((e.target as HTMLInputElement).value)}"
          maxlength="${props.codeLength || 6}"
        ></sl-input>
        <sl-button
          type="submit"
          variant="primary"
          ?loading="${props.loading}"
          style="width: 100%; margin-top: var(--sl-spacing-small);"
        >
          ${props.submitLabel}
        </sl-button>
      </form>
      <button class="resend-link" @click="${props.onResend}">${props.resendLabel}</button>
    </div>
  `;
}
