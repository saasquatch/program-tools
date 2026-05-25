import { html } from 'lit';
import type { NavigationMenuProps } from './NavigationMenu';
import { useNavigationMenu } from './useNavigationMenu';

export function NavigationMenuView(
  props: NavigationMenuProps & ReturnType<typeof useNavigationMenu>
) {
  return html`
    <style>
      :host {
        display: block;
      }

      .nav-menu-tabs {
        display: flex;
        gap: var(--sl-spacing-small);
        border-bottom: 1px solid var(--sl-color-neutral-200);
        padding: 0 var(--sl-spacing-medium);
      }
    </style>
    ${props.menuStyle === 'dropdown'
      ? html`
          <sl-dropdown ?open="${props.isOpen}">
            <sl-button slot="trigger" caret @click="${props.toggleMenu}">Menu</sl-button>
            <sl-menu data-selected-index="${props.selectedIndex}">
              <slot></slot>
            </sl-menu>
          </sl-dropdown>
        `
      : html`
          <div class="nav-menu-tabs" data-selected-index="${props.selectedIndex}">
            <slot></slot>
          </div>
        `}
  `;
}
