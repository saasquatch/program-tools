import { html } from 'lit';
import { TextSpanProps } from './TextSpan';

export function TextSpanView(props: TextSpanProps) {
  return html`
    <style>
      :host {
        display: inline;
      }

      .text-span {
        font-size: ${props.fontSize ? `${props.fontSize}px` : 'inherit'};
        color: ${props.textColor || 'inherit'};
        font-weight: ${props.fontWeight || 'inherit'};
      }
    </style>
    <span class="text-span" part="sqm-base"><slot></slot></span>
  `;
}
