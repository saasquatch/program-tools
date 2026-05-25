import { html } from 'lit';
import { CouponCodeProps } from './CouponCode';
import { useCouponCode } from './useCouponCode';

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
`;

const getDynamicStyles = (props: CouponCodeProps) => `
  .container-div {
    text-align: ${props.textAlign || 'left'};
  }

  sl-input::part(input) {
    text-overflow: ellipsis;
    width: 100%;
    text-align: ${props.textAlign || 'left'};
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

export function CouponCodeView(props: CouponCodeProps & ReturnType<typeof useCouponCode>) {
  const dynamicStyles = getDynamicStyles(props);
  const buttonStyle = props.buttonStyle || 'icon';
  const disabled = props.loading || props.disabled || !!props.error;
  const tooltipPlacement =
    props.buttonStyle === 'button-below'
      ? 'bottom'
      : props.buttonStyle === 'button-outside'
        ? 'top'
        : 'top-end';
  const tooltipContent = props.open
    ? props.tooltipCopiedText || props.tooltipText
    : props.tooltipCopyText || props.copyButtonLabel;

  const copyButton = html`
    <sl-tooltip
      trigger="manual"
      content="${tooltipContent}"
      placement="${tooltipPlacement}"
      ?disabled="${disabled}"
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
              variant="${props.buttonType || 'primary'}"
            >
              ${props.copyButtonLabel || 'Copy Code'}
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
          value="${props.loading ? 'Loading...' : props.copyString}"
          readonly
          ?disabled="${disabled}"
        >
          ${buttonStyle === 'icon' ? copyButton : ''}
          ${props.error ? html`<p slot="help-text" class="error-text">${props.error}</p>` : ''}
        </sl-input>
        ${buttonStyle === 'button-outside' || buttonStyle === 'button-below' ? copyButton : ''}
      </div>
    </div>
  `;
}
