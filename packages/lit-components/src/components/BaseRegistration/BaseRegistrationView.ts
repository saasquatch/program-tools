import { html, nothing, type TemplateResult } from 'lit';
import { UI } from '../../ui';
import type { BaseRegistrationProps } from './BaseRegistration';
import type { BaseRegistrationHookResult } from './useBaseRegistration';

export interface BaseRegistrationViewProps
  extends BaseRegistrationProps,
    BaseRegistrationHookResult {
  formData?: TemplateResult;
  terms?: TemplateResult;
  googleButton?: TemplateResult;
  secondaryButton?: TemplateResult;
}

const getValue = (event: Event) =>
  String((event.target as HTMLInputElement & { value?: string })?.value ?? '');

export function BaseRegistrationView(props: BaseRegistrationViewProps) {
  const hasSecondaryActions =
    (props.showGoogleButton && Boolean(props.googleButton)) ||
    (props.showSecondaryButton && Boolean(props.secondaryButton));

  return html`
    <style>
      :host {
        display: block;
      }

      .wrapper {
        display: grid;
        gap: var(--sl-spacing-large);
        width: 100%;
        max-width: 32rem;
        margin: 0 auto;
      }

      h3,
      p {
        margin: 0;
      }

      .title {
        text-align: center;
      }

      .form {
        display: grid;
        gap: var(--sl-spacing-large);
      }

      .button-stack {
        display: grid;
        gap: var(--sl-spacing-medium);
      }

      .divider {
        display: flex;
        align-items: center;
        gap: var(--sl-spacing-small);
        color: var(--sl-color-neutral-500);
        font-size: var(--sl-font-size-small);
      }

      .divider::before,
      .divider::after {
        content: '';
        flex: 1;
        border-top: 1px solid var(--sl-color-neutral-200);
      }

      .error-text {
        color: var(--sl-color-danger-600);
        font-size: var(--sl-font-size-small);
      }
    </style>
    <div class="wrapper" part="sqm-base">
      <h3 class="title">${props.pageLabel}</h3>
      <form class="form" @submit="${props.onSubmit}" novalidate>
        ${props.formData ?? html`<slot name="formData"></slot>`}
        <div>
        ${UI.Input({
          type: 'email',
          name: 'email',
          label: props.emailLabel,
          value: props.email,
          disabled: props.loading,
          onInput: (event: Event) => props.setEmail(getValue(event)),
        })}
        ${props.validationErrors.email
          ? html`<p class="error-text">${props.validationErrors.email}</p>`
          : nothing}
        </div>
        ${props.terms ?? html`<slot name="terms"></slot>`}
        <div class="button-stack">
        ${UI.Button({ type: 'submit', variant: 'primary', loading: props.loading, children: props.submitLabel })}
          ${hasSecondaryActions
            ? html`<div class="divider">or</div>`
            : nothing}
          ${props.showGoogleButton
            ? props.googleButton ?? html`<slot name="googleButton"></slot>`
            : nothing}
          ${props.showSecondaryButton
            ? props.secondaryButton ?? html`<slot name="secondaryButton"></slot>`
            : nothing}
        </div>
      </form>
    </div>
  `;
}
