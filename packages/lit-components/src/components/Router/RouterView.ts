import { html } from 'lit';
import { useRouter } from './useRouter';

export function RouterView(_props: ReturnType<typeof useRouter>) {
  return html`
    <style>
      :host {
        display: block;
      }
    </style>
    <slot></slot>
  `;
}
