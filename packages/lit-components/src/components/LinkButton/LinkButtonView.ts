import { html } from 'lit';
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
      <sl-button
        variant="${props.buttonType}"
        size="${props.size}"
        ?pill="${props.pill}"
        ?outline="${props.outline}"
        ?disabled="${props.disabled}"
      >
        ${props.icon ? html`<sl-icon slot="prefix" name="${props.icon}"></sl-icon>` : ''}
        ${props.buttonText}
      </sl-button>
    </a>
  `;
}
