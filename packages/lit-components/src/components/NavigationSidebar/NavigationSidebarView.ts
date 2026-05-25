import { html } from 'lit';
import type { NavigationSidebarProps } from './NavigationSidebar';

export function NavigationSidebarView(props: NavigationSidebarProps) {
  return html`
    <style>
      :host {
        display: block;
      }

      .sidebar {
        display: flex;
        flex-direction: column;
        width: ${props.width || '250px'};
        background: ${props.backgroundColor || 'var(--sl-color-neutral-0)'};
        border-right: 1px solid ${props.borderColor || 'var(--sl-color-neutral-200)'};
        height: 100%;
        overflow-y: auto;
      }

      .sidebar-header {
        padding: var(--sl-spacing-medium) var(--sl-spacing-large);
        font-weight: var(--sl-font-weight-semibold);
        font-size: var(--sl-font-size-large);
        border-bottom: 1px solid ${props.borderColor || 'var(--sl-color-neutral-200)'};
      }

      .sidebar-content {
        padding: var(--sl-spacing-small) 0;
      }
    </style>
    <nav class="sidebar" part="sqm-base">
      ${props.header ? html`<div class="sidebar-header">${props.header}</div>` : ''}
      <div class="sidebar-content">
        <slot></slot>
      </div>
    </nav>
  `;
}
