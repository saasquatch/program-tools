import { html } from 'lit';
import { ReferralCodeProps } from './ReferralCode';
import { useReferralCode } from './useReferralCode';

/**
 * Base static styles that don't change
 */
const baseStyles = `
  :host {
    display: block;
  }

  sl-input {
    width: 100%;
  }

  .container-div {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    justify-content: center;
    gap: var(--sl-spacing-x-small);
    width: 100%;
  }

  .container-style {
    display: flex;
    align-items: center;
    gap: var(--sl-spacing-x-small);
    width: 100%;
  }

  .error-text {
    margin: 0;
    color: var(--sqm-danger-color-text);
  }

  .notification-text {
    margin: 0;
    color: inherit;
  }
`;

/**
 * Generate dynamic styles based on props
 */
const getDynamicStyles = (props: ReferralCodeProps) => `
  sl-input::part(input) {
    text-overflow: ellipsis;
    width: 100%;
    color: ${props.textColor || 'var(--sl-input-color)'};
  }

  sl-input::part(base) {
    --sl-input-border-radius: ${props.borderRadius ? `${props.borderRadius}px` : 'var(--sqm-border-radius-normal)'};
    --sl-input-border-color: var(--sqm-border-color);
    --sl-input-border-color-hover: #999999;
    --sl-input-border-color-focus: #999999;
    --sl-input-color-hover: var(--sqm-input-color-hover);
    --sl-input-color-focus: var(--sqm-input-color-focus);
    --sl-input-color-disabled: var(--sqm-input-disabled-color);
    --sl-input-background-color-focus: var(--sqm-input-background);
    --sl-input-background-color-hover: var(--sqm-input-background);
    cursor: pointer;
    overflow: visible;
    border-radius: ${props.borderRadius ? `${props.borderRadius}px` : 'var(--sqm-border-radius-normal)'};
    background: ${props.backgroundColor || 'var(--sqm-input-background)'};
    border: var(--sqm-border-thickness) solid ${props.borderColor || 'var(--sqm-input-border-color)'};
  }

  sl-icon::part(base) {
    color: ${props.textColor || 'var(--sqm-text)'};
  }

  sl-icon-button::part(base) {
    color: ${props.textColor || 'var(--sqm-text)'};
  }
`;

export function ReferralCodeView(props: ReferralCodeProps & ReturnType<typeof useReferralCode>) {
  const dynamicStyles = getDynamicStyles(props);

  const buttonStyle = props.buttonStyle || 'icon';
  const error = !props.loading && props.error;
  const inputText = error ? props.inputPlaceholderText : props.copyString;
  const disabled = error || props.loading || props.disabled;
  const tooltipPlacement =
    props.buttonStyle === 'button-below'
      ? 'bottom'
      : props.buttonStyle === 'button-outside'
        ? 'top'
        : 'top-end';

  const copyButton = html`
    <sl-tooltip
      trigger="manual"
      content="${props.tooltipText}"
      placement="${tooltipPlacement}"
      ?disabled="${props.disabled}"
      ?open="${props.open}"
      skidding="${props.buttonStyle === 'icon' ? -5 : 0}"
      slot="suffix"
    >
      ${buttonStyle === 'icon'
        ? html`
            <sl-icon-button
              exportparts="base: icon-button-base"
              @click="${() => props.onClick?.()}"
              name="files"
              ?disabled="${disabled}"
            ></sl-icon-button>
          `
        : html`
            <sl-button
              exportparts="base: ${props.buttonType || 'primary'}button-base"
              @click="${() => props.onClick?.()}"
              size="medium"
              style="${buttonStyle === 'button-below' ? 'width: 100%' : ''}"
              ?disabled="${disabled}"
              type="primary"
            >
              ${props.copyButtonLabel || 'Copy'}
            </sl-button>
          `}
    </sl-tooltip>
  `;

  return html`
    <style>
      ${baseStyles}
      ${dynamicStyles}
    </style>
    <div class="container-div">
      <div
        class="container-style"
        style="flex-direction: ${buttonStyle === 'button-below' ? 'column' : 'row'}"
      >
        <sl-input
          value="${props.loading ? 'Loading...' : inputText}"
          readonly
          ?disabled="${disabled}"
        >
          ${buttonStyle === 'icon' ? copyButton : ''}
          ${error ? html` <p slot="help-text" class="error-text">${props.errorText}</p> ` : ''}
        </sl-input>
        ${buttonStyle === 'button-outside' || buttonStyle === 'button-below' ? copyButton : ''}
      </div>
      ${props.isCopied && props.showNotificationText && props.notificationText
        ? html`
            <p part="sqm-notification-text" class="notification-text">${props.notificationText}</p>
          `
        : ''}
    </div>
  `;
}
