import { html } from 'lit';
import { UI } from '../../ui';
import type { AlertVariant } from '../../ui/types';
import { FormMessageProps } from './FormMessage';

export function FormMessageView(props: FormMessageProps) {
  return html`
    <style>
      :host {
        display: block;
      }
    </style>
    ${props.message
      ? html`
          ${UI.Alert({
            variant: (props.type === 'error' ? 'danger' : props.type === 'info' ? 'neutral' : props.type) as AlertVariant,
            closable: props.closable,
            open: true,
            icon: props.icon ? UI.Icon({ name: props.icon }) : undefined,
            children: props.message,
          })}
        `
      : ''}
  `;
}
