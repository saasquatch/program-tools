import { html } from 'lit';
import { UI } from '../../ui';
import type { ButtonVariant } from '../../ui';
import { LinkButtonProps } from './LinkButton';

export function LinkButtonView(props: LinkButtonProps) {
  return html`
    <style>
      :host {
        display: inline-block;
      }

      a {
        text-decoration: none;
      }
    </style>
    <a
      href="${props.href}"
      target="${props.target}"
      rel="${props.target === '_blank' ? 'noopener noreferrer' : ''}"
    >
      ${UI.Button({
        variant: props.buttonType as ButtonVariant,
        size: props.size,
        pill: props.pill,
        outline: props.outline,
        disabled: props.disabled,
        prefix: props.icon ? UI.Icon({ name: props.icon }) : undefined,
        children: props.buttonText,
      })}
    </a>
  `;
}
