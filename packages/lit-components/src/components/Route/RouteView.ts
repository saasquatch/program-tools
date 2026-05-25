import { html } from 'lit';
import type { RouteProps } from './Route';
import { useRoute } from './useRoute';

export function RouteView(_props: RouteProps & ReturnType<typeof useRoute>) {
  return html`
    <style>
      :host {
        display: block;
      }

      :host([hidden]) {
        display: none;
      }
    </style>
    <slot></slot>
  `;
}
