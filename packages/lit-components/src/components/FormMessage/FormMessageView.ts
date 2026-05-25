import { html } from 'lit';
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
          <sl-alert
            variant="${props.type === 'error' ? 'danger' : props.type}"
            ?closable="${props.closable}"
            open
          >
            ${props.icon ? html`<sl-icon slot="icon" name="${props.icon}"></sl-icon>` : ''}
            ${props.message}
          </sl-alert>
        `
      : ''}
  `;
}
