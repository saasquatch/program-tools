import { html } from 'lit';
import type { ContextRouterProps } from './ContextRouter';
import { useContextRouter } from './useContextRouter';

export function ContextRouterView(
  props: ContextRouterProps & ReturnType<typeof useContextRouter>
) {
  return html`
    <style>
      :host {
        display: block;
      }
    </style>
    <slot name="${props.engagementMedium?.toLowerCase() || 'embed'}"></slot>
    <slot></slot>
  `;
}
