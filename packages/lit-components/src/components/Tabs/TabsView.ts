import { html } from 'lit';
import { UI } from '../../ui';
import { useTabs } from './useTabs';

export function TabsView(_props: ReturnType<typeof useTabs>) {
  return html`
    <style>
      :host {
        display: block;
      }
    </style>
    ${UI.TabGroup({ children: html`<slot></slot>` })}
  `;
}
