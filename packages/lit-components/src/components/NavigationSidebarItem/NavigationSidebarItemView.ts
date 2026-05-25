import { html } from 'lit';
import type { NavigationSidebarItemProps } from './NavigationSidebarItem';
import { useNavigationSidebarItem } from './useNavigationSidebarItem';

export function NavigationSidebarItemView(
  props: NavigationSidebarItemProps & ReturnType<typeof useNavigationSidebarItem>
) {
  return html`
    <style>
      :host {
        display: block;
      }

      .sidebar-item {
        display: flex;
        align-items: center;
        gap: var(--sl-spacing-small);
        padding: var(--sl-spacing-small) var(--sl-spacing-large);
        cursor: pointer;
        color: var(--sl-color-neutral-700);
        text-decoration: none;
        transition: background 0.15s, color 0.15s;
        font-size: var(--sl-font-size-medium);
      }

      .sidebar-item:hover {
        background: var(--sl-color-neutral-50);
        color: var(--sl-color-primary-600);
      }

      .sidebar-item.selected {
        background: var(--sl-color-primary-50);
        color: var(--sl-color-primary-700);
        font-weight: var(--sl-font-weight-semibold);
        border-left: 3px solid var(--sl-color-primary-600);
      }

      .sidebar-item.disabled {
        opacity: 0.5;
        pointer-events: none;
      }
    </style>
    <div
      class="sidebar-item ${props.selected ? 'selected' : ''} ${props.disabled ? 'disabled' : ''}"
      @click="${props.onClick}"
      part="sqm-base"
    >
      ${props.icon ? html`<sl-icon name="${props.icon}"></sl-icon>` : ''}
      <span>${props.label}</span>
    </div>
  `;
}
