import { html } from 'lit';
import { UI } from '../../ui';
import type { ButtonVariant } from '../../ui/types';
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
    ${UI.Tooltip({
      trigger: 'manual',
      content: tooltipContent,
      placement: tooltipPlacement,
      disabled: disabled,
      open: props.open,
      skidding: props.buttonStyle === 'icon' ? -5 : 0,
      slot: 'suffix',
      children: buttonStyle === 'icon'
        ? UI.IconButton({
            exportparts: 'base: icon-button-base',
            onClick: () => props.onClick?.(),
            name: 'files',
            disabled: disabled,
          })
        : UI.Button({
            exportparts: `base: ${props.buttonType || 'primary'}button-base`,
            onClick: () => props.onClick?.(),
            size: 'medium',
            style: buttonStyle === 'button-below' ? 'width: 100%' : '',
            disabled: disabled,
            variant: (props.buttonType || 'primary') as ButtonVariant,
            children: props.copyButtonLabel || 'Copy Code',
          }),
    })}
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
        ${UI.Input({
          value: props.loading ? 'Loading...' : props.copyString,
          readonly: true,
          disabled: disabled,
          suffix: buttonStyle === 'icon' ? copyButton : undefined,
          error: props.error ? html`<p class="error-text">${props.error}</p>` : undefined,
        })}
        ${buttonStyle === 'button-outside' || buttonStyle === 'button-below' ? copyButton : ''}
      </div>
    </div>
  `;
}
