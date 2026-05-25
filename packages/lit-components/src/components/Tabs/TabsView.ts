import { html } from 'lit';
import { useTabs } from './useTabs';

export function TabsView(_props: ReturnType<typeof useTabs>) {
  return html`
    <style>
      :host {
        display: block;
      }
    </style>
    <sl-tab-group>
      <slot></slot>
    </sl-tab-group>
  `;
}
