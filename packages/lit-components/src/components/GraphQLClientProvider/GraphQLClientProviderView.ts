import { html } from 'lit';
import type { GraphQLClientProviderProps } from './GraphQLClientProvider';

export function GraphQLClientProviderView(_props: GraphQLClientProviderProps) {
  return html`
    <style>
      :host {
        display: contents;
      }
    </style>
    <slot></slot>
  `;
}
