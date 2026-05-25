import { html } from 'lit';
import type { TabProps } from './Tab';

export function TabView(props: TabProps) {
  return html`
    <style>
      :host {
        display: block;
      }
    </style>
    <sl-tab slot="nav" panel="${props.header}" ?disabled="${props.disabled}">${props.header}</sl-tab>
    <sl-tab-panel name="${props.header}">
      <slot></slot>
    </sl-tab-panel>
  `;
}
