import { html } from 'lit';
import { CloseButtonProps } from './CloseButton';

export function CloseButtonView(props: CloseButtonProps) {
  return html`
    <style>
      :host {
        display: inline-block;
      }
    </style>
    <sl-icon-button
      name="x-lg"
      label="Close"
      style="font-size: ${props.size === 'large' ? '1.5rem' : props.size === 'small' ? '0.75rem' : '1rem'};"
    ></sl-icon-button>
  `;
}
