import { html } from 'lit';
import { UI } from '../../ui';
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
      ${props.error ? html`${UI.Alert({ variant: 'danger', open: true, children: props.error })}` : ''}
      ${props.resent ? html`${UI.Alert({ variant: 'success', open: true, children: 'Code resent!' })}` : ''}
      <form @submit="${props.onSubmit}">
        ${UI.Input({
          placeholder: 'Enter code',
          value: props.code,
          onInput: (e: Event) => props.setCode((e.target as HTMLInputElement).value),
          maxLength: props.codeLength || 6,
        })}
        ${UI.Button({
          type: 'submit',
          variant: 'primary',
          loading: props.loading,
          style: 'width: 100%; margin-top: var(--sl-spacing-small);',
          children: props.submitLabel,
        })}
      </form>
      <button class="resend-link" @click="${props.onResend}">${props.resendLabel}</button>
    </div>
  `;
}
