import { html } from 'lit';
import { UI } from '../../ui';
import type { ButtonVariant } from '../../ui/types';
import { ShareCodeProps } from './ShareCode';
import { useShareCode } from './useShareCode';

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
`;

const getDynamicStyles = (props: ShareCodeProps) => `
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

export function ShareCodeView(props: ShareCodeProps & ReturnType<typeof useShareCode>) {
  const dynamicStyles = getDynamicStyles(props);
  const buttonStyle = props.buttonStyle || 'icon';
  const disabled = props.loading || props.disabled;
  const tooltipPlacement =
    props.buttonStyle === 'button-below'
      ? 'bottom'
      : props.buttonStyle === 'button-outside'
        ? 'top'
        : 'top-end';

  const copyButton = html`
    ${UI.Tooltip({
      trigger: 'manual',
      content: props.tooltipText,
      placement: tooltipPlacement,
      disabled: props.disabled,
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
        })}
        ${buttonStyle === 'button-outside' || buttonStyle === 'button-below' ? copyButton : ''}
      </div>
    </div>
  `;
}
