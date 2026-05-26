import { html } from 'lit';
import { UI } from '../../ui';
import type { TabProps } from './Tab';

export function TabView(props: TabProps) {
  return html`
    <style>
      :host {
        display: block;
      }
    </style>
    ${UI.Tab({ panel: props.header, disabled: props.disabled, children: props.header })}
    ${UI.TabPanel({ name: props.header, children: html`<slot></slot>` })}
  `;
}
